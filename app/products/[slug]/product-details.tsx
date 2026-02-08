"use client";

import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import type { Product, ProductVariant } from "lib/woocommerce/types";
import { AddToCartButton } from "./add-to-cart-button";

function Price({ amount, currencyCode }: { amount: string; currencyCode: string }) {
  const price = parseFloat(amount);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(price);

  return <span>{formatted}</span>;
}

function findVariant(
  product: Product,
  selectedOptions: Record<string, string>
): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every(
      (opt) => selectedOptions[opt.name.toLowerCase()] === opt.value
    )
  );
}

export function ProductDetails({ product }: { product: Product }) {
  // Initialize selected options from URL or first available values
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};

    // Check URL params first (for shared links)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      product.options.forEach((option) => {
        const paramValue = params.get(option.name.toLowerCase());
        if (paramValue && option.values.includes(paramValue)) {
          initial[option.name.toLowerCase()] = paramValue;
        }
      });
    }

    // Fill in missing options with first available value
    product.options.forEach((option) => {
      if (!initial[option.name.toLowerCase()]) {
        initial[option.name.toLowerCase()] = option.values[0] || "";
      }
    });

    return initial;
  });

  // Find the selected variant (memoized to avoid recalculating on every render)
  const selectedVariant = useMemo(
    () => findVariant(product, selectedOptions),
    [product, selectedOptions]
  );

  // Update URL when selection changes (without navigation)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      Object.entries(selectedOptions).forEach(([key, value]) => {
        params.set(key, value);
      });
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedOptions]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName.toLowerCase()]: value,
    }));
  };

  // Get current price from selected variant or fall back to product price range
  const currentPrice = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl text-stone-900">{product.title}</h1>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-medium text-stone-900">
            <Price
              amount={currentPrice.amount}
              currencyCode={currentPrice.currencyCode}
            />
          </span>
        </div>
      </div>

      {/* Variant Selector */}
      {product.options.length > 0 && (product.options[0]?.values.length ?? 0) > 1 && (
        <div className="flex flex-col gap-4">
          {product.options.map((option) => (
            <div key={option.id}>
              <h3 className="mb-2 text-sm font-medium text-stone-700">{option.name}</h3>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const optionNameLower = option.name.toLowerCase();
                  const isSelected = selectedOptions[optionNameLower] === value;

                  // Check if this option combination is available
                  const isAvailable = product.variants.some(
                    (variant) =>
                      variant.availableForSale &&
                      variant.selectedOptions.some(
                        (opt) =>
                          opt.name.toLowerCase() === optionNameLower &&
                          opt.value === value
                      )
                  );

                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      disabled={!isAvailable}
                      className={clsx(
                        "rounded-full border px-4 py-2 text-sm transition-all duration-150",
                        {
                          "border-stone-900 bg-stone-900 text-white": isSelected,
                          "border-stone-300 text-stone-700 hover:border-stone-400 active:scale-95":
                            !isSelected && isAvailable,
                          "cursor-not-allowed border-stone-200 text-stone-300":
                            !isAvailable,
                        }
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddToCartButton product={product} selectedVariant={selectedVariant} />

      {product.descriptionHtml && (
        <div className="border-t border-stone-200 pt-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            Description
          </h2>
          <div
            className="prose prose-stone prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>
      )}

      {!product.availableForSale && (
        <p className="text-sm text-red-600">Currently out of stock</p>
      )}
    </div>
  );
}
