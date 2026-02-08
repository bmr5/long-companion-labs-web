"use client";

import clsx from "clsx";
import type { ProductOption, ProductVariant } from "lib/woocommerce/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <div key={option.id}>
          <h3 className="mb-2 text-sm font-medium text-stone-700">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const optionNameLower = option.name.toLowerCase();
              const isSelected = searchParams.get(optionNameLower) === value;

              // Check if this option combination is available
              const isAvailable = variants.some(
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
                  onClick={() => {
                    router.push(
                      `?${createQueryString(optionNameLower, value)}`,
                      { scroll: false }
                    );
                  }}
                  disabled={!isAvailable}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    {
                      "border-stone-900 bg-stone-900 text-white": isSelected,
                      "border-stone-300 text-stone-700 hover:border-stone-400":
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
  );
}
