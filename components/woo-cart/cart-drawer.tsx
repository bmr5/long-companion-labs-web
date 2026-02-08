"use client";

import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TruckIcon, TagIcon } from "@heroicons/react/24/solid";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Price from "components/price";
import { useWooCart, type WooCartItem, type Coupon } from "lib/woocommerce/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FREE_SHIPPING_THRESHOLD = 99;

function FreeShippingProgress({ currentAmount }: { currentAmount: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - currentAmount;
  const progress = Math.min((currentAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const qualifies = remaining <= 0;

  return (
    <div className="rounded-lg bg-stone-50 p-3">
      <div className="flex items-center gap-2 text-sm">
        <TruckIcon className={`h-5 w-5 ${qualifies ? "text-green-600" : "text-stone-400"}`} />
        {qualifies ? (
          <span className="font-medium text-green-600">
            You qualify for free shipping!
          </span>
        ) : (
          <span className="text-stone-600">
            <span className="font-medium">${remaining.toFixed(2)}</span> away from free shipping
          </span>
        )}
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            qualifies ? "bg-green-500" : "bg-[#C4A484]"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function PromoCodeInput() {
  const { cart, applyCoupon, removeCoupon, isApplyingCoupon } = useWooCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;
    setError("");
    const result = await applyCoupon(code.trim());
    if (!result.success) {
      setError(result.error || "Invalid coupon");
    } else {
      setCode("");
    }
  };

  if (cart.coupon) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TagIcon className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {cart.coupon.code.toUpperCase()}
            </span>
            <span className="text-sm text-green-600">
              {cart.coupon.discountType === "percent"
                ? `${cart.coupon.amount}% off`
                : `-$${parseFloat(cart.coupon.amount).toFixed(2)}`}
            </span>
          </div>
          <button
            onClick={removeCoupon}
            className="text-green-600 hover:text-green-800"
            aria-label="Remove coupon"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 rounded-lg border border-stone-200 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
        />
        <button
          onClick={handleApply}
          disabled={isApplyingCoupon || !code.trim()}
          className="rounded-lg bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isApplyingCoupon ? "..." : "Apply"}
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function CartItem({ item }: { item: WooCartItem }) {
  const { removeItem, updateQuantity, closeCart } = useWooCart();

  const lineTotal = (parseFloat(item.price.amount) * item.quantity).toFixed(2);

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.image.altText || item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.handle}`}
              onClick={closeCart}
              className="font-medium text-stone-900 hover:text-stone-600"
            >
              {item.title}
            </Link>
            {item.variantTitle && item.variantTitle !== "Default" && (
              <p className="text-sm text-stone-500">{item.variantTitle}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.variantId)}
            className="text-stone-400 hover:text-stone-600"
            aria-label={`Remove ${item.title} from cart`}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:border-stone-400"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:border-stone-400"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <Price
            amount={lineTotal}
            currencyCode={item.price.currencyCode}
            className="font-medium text-stone-900"
          />
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { cart, isOpen, closeCart, checkout } = useWooCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col px-6 sm:max-w-md"
      >
        <SheetHeader className="border-b border-stone-200 pb-4 pt-2">
          <SheetTitle className="text-left font-serif text-2xl text-stone-900">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-stone-500">Your cart is empty</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="mt-4 text-sm font-medium text-[#C4A484] hover:text-[#B8997A]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="space-y-3 py-3">
              <FreeShippingProgress currentAmount={parseFloat(cart.totalAmount.amount)} />
              <PromoCodeInput />
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-stone-100">
                {cart.items.map((item) => (
                  <CartItem key={item.variantId} item={item} />
                ))}
              </div>
            </div>

            <div className="border-t border-stone-200 pb-6 pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">Subtotal</span>
                  <Price
                    amount={cart.totalAmount.amount}
                    currencyCode={cart.totalAmount.currencyCode}
                    className="text-stone-900"
                  />
                </div>
                {cart.coupon && parseFloat(cart.discountAmount.amount) > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">
                      Discount ({cart.coupon.code.toUpperCase()})
                    </span>
                    <span className="text-green-600">
                      -${parseFloat(cart.discountAmount.amount).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="font-medium text-stone-900">Total</span>
                  <Price
                    amount={cart.finalAmount.amount}
                    currencyCode={cart.finalAmount.currencyCode}
                    className="text-lg font-medium text-stone-900"
                  />
                </div>
              </div>
              <p className="mb-4 text-xs text-stone-500">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={checkout}
                className="w-full rounded-full bg-[#C4A484] py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A]"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                onClick={closeCart}
                className="mt-3 block text-center text-sm text-stone-600 hover:text-stone-900"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
