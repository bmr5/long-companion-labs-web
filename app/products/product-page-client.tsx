"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

const sizes = [
  { label: "30 Chews", subtitle: "1 month supply", price: 49.99, original: 64.99 },
  { label: "60 Chews", subtitle: "2 month supply", price: 89.99, original: 129.98, badge: "Best Value" },
  { label: "90 Chews", subtitle: "3 month supply", price: 124.99, original: 194.97, badge: "Most Popular" },
];

export function ProductPageClient() {
  const [selected, setSelected] = useState(1); // Default to 60 chews
  const router = useRouter();

  const handleAddToCart = () => {
    const item = sizes[selected]!;
    posthog.capture("add_to_cart", { size: item.label, price: item.price });
    sessionStorage.setItem(
      "puptides_cart",
      JSON.stringify({
        size: item.label,
        subtitle: item.subtitle,
        price: item.price,
        quantity: 1,
      })
    );
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Size selector */}
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-900">
          Choose your size
        </h3>
        <div className="space-y-2">
          {sizes.map((size, i) => (
            <button
              key={size.label}
              onClick={() => setSelected(i)}
              className={`relative flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all ${
                selected === i
                  ? "border-[#C4A484] bg-[#C4A484]/5"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              {size.badge && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-[#C4A484] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {size.badge}
                </span>
              )}
              <div>
                <span className="text-sm font-semibold text-stone-900">{size.label}</span>
                <span className="ml-2 text-xs text-stone-400">{size.subtitle}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-stone-900">
                  ${size.price.toFixed(2)}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  ${size.original.toFixed(2)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="w-full rounded-full bg-[#C4A484] py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B8997A] active:scale-[0.98]"
      >
        Add to Cart — ${sizes[selected]!.price.toFixed(2)}
      </button>
    </div>
  );
}
