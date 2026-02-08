"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useWooCart } from "lib/woocommerce/cart-context";

export function CartButton() {
  const { cart, toggleCart } = useWooCart();

  return (
    <button
      onClick={toggleCart}
      className="relative flex cursor-pointer items-center justify-center text-stone-600 transition-colors hover:text-stone-900"
      aria-label={`Open cart (${cart.totalQuantity} items)`}
    >
      <ShoppingBagIcon className="h-6 w-6" />
      {cart.totalQuantity > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C4A484] text-xs font-medium text-white">
          {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
        </span>
      )}
    </button>
  );
}
