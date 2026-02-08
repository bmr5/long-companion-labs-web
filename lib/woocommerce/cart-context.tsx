"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Image, Money } from "./types";

const CART_STORAGE_KEY = "genesis-peptides-cart";

export type WooCartItem = {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: Money;
  image: Image;
  handle: string;
  quantity: number;
};

export type Coupon = {
  code: string;
  discountType: "percent" | "fixed_cart" | "fixed_product";
  amount: string;
  description: string;
  freeShipping: boolean;
};

export type WooCart = {
  items: WooCartItem[];
  totalQuantity: number;
  totalAmount: Money;
  coupon: Coupon | null;
  discountAmount: Money;
  finalAmount: Money;
};

type WooCartContextType = {
  cart: WooCart;
  addItem: (item: Omit<WooCartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  checkout: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; error?: string }>;
  removeCoupon: () => void;
  isApplyingCoupon: boolean;
};

const WooCartContext = createContext<WooCartContextType | undefined>(undefined);

function createEmptyCart(): WooCart {
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: {
      amount: "0",
      currencyCode: "USD",
    },
    coupon: null,
    discountAmount: {
      amount: "0",
      currencyCode: "USD",
    },
    finalAmount: {
      amount: "0",
      currencyCode: "USD",
    },
  };
}

function calculateTotals(
  items: WooCartItem[],
  coupon: Coupon | null = null
): Pick<WooCart, "totalQuantity" | "totalAmount" | "discountAmount" | "finalAmount"> {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0
  );
  const currencyCode = items[0]?.price.currencyCode || "USD";

  // Calculate discount
  let discountAmount = 0;
  if (coupon) {
    const couponAmount = parseFloat(coupon.amount);
    if (coupon.discountType === "percent") {
      discountAmount = (totalAmount * couponAmount) / 100;
    } else if (coupon.discountType === "fixed_cart") {
      discountAmount = Math.min(couponAmount, totalAmount);
    }
    // fixed_product would need per-item calculation, simplified here
  }

  const finalAmount = Math.max(0, totalAmount - discountAmount);

  return {
    totalQuantity,
    totalAmount: {
      amount: totalAmount.toFixed(2),
      currencyCode,
    },
    discountAmount: {
      amount: discountAmount.toFixed(2),
      currencyCode,
    },
    finalAmount: {
      amount: finalAmount.toFixed(2),
      currencyCode,
    },
  };
}

function loadCartFromStorage(): WooCart {
  if (typeof window === "undefined") {
    return createEmptyCart();
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate structure
      if (parsed.items && Array.isArray(parsed.items)) {
        const coupon = parsed.coupon || null;
        return {
          items: parsed.items,
          coupon,
          ...calculateTotals(parsed.items, coupon),
        };
      }
    }
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
  }

  return createEmptyCart();
}

function saveCartToStorage(cart: WooCart): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
}

export function WooCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<WooCart>(createEmptyCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = loadCartFromStorage();
    setCart(storedCart);
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage when it changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cart);
    }
  }, [cart, isInitialized]);

  const addItem = useCallback(
    (newItem: Omit<WooCartItem, "quantity"> & { quantity?: number }) => {
      setCart((prevCart) => {
        const existingIndex = prevCart.items.findIndex(
          (item) => item.variantId === newItem.variantId
        );

        let newItems: WooCartItem[];

        if (existingIndex >= 0) {
          // Update existing item quantity
          newItems = prevCart.items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
              : item
          );
        } else {
          // Add new item
          newItems = [
            ...prevCart.items,
            { ...newItem, quantity: newItem.quantity || 1 },
          ];
        }

        return {
          items: newItems,
          coupon: prevCart.coupon,
          ...calculateTotals(newItems, prevCart.coupon),
        };
      });

      // Open cart when item is added
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.variantId !== variantId);
      return {
        items: newItems,
        coupon: prevCart.coupon,
        ...calculateTotals(newItems, prevCart.coupon),
      };
    });
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        coupon: prevCart.coupon,
        ...calculateTotals(newItems, prevCart.coupon),
      };
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart(createEmptyCart());
  }, []);

  const applyCoupon = useCallback(async (code: string): Promise<{ success: boolean; error?: string }> => {
    setIsApplyingCoupon(true);
    try {
      const response = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          cartTotal: parseFloat(cart.totalAmount.amount),
        }),
      });

      const data = await response.json();

      if (!data.valid) {
        return { success: false, error: data.error || "Invalid coupon" };
      }

      const newCoupon: Coupon = data.coupon;

      setCart((prevCart) => ({
        items: prevCart.items,
        coupon: newCoupon,
        ...calculateTotals(prevCart.items, newCoupon),
      }));

      return { success: true };
    } catch {
      return { success: false, error: "Failed to validate coupon" };
    } finally {
      setIsApplyingCoupon(false);
    }
  }, [cart.totalAmount.amount]);

  const removeCoupon = useCallback(() => {
    setCart((prevCart) => ({
      items: prevCart.items,
      coupon: null,
      ...calculateTotals(prevCart.items, null),
    }));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const checkout = useCallback(() => {
    if (cart.items.length === 0) return;

    // Redirect to our checkout page
    window.location.href = "/checkout";
  }, [cart.items]);

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      checkout,
      applyCoupon,
      removeCoupon,
      isApplyingCoupon,
    }),
    [
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      checkout,
      applyCoupon,
      removeCoupon,
      isApplyingCoupon,
    ]
  );

  return (
    <WooCartContext.Provider value={value}>{children}</WooCartContext.Provider>
  );
}

export function useWooCart() {
  const context = useContext(WooCartContext);
  if (context === undefined) {
    throw new Error("useWooCart must be used within a WooCartProvider");
  }
  return context;
}
