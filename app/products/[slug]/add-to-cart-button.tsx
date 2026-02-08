"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useWooCart } from "lib/woocommerce/cart-context";
import type { Product, ProductVariant } from "lib/woocommerce/types";
import { useEffect, useState } from "react";

export function AddToCartButton({
  product,
  selectedVariant: propVariant,
}: {
  product: Product;
  selectedVariant?: ProductVariant;
}) {
  const { variants, availableForSale } = product;
  const { addItem } = useWooCart();
  const [isAdding, setIsAdding] = useState(false);
  const [stockMap, setStockMap] = useState<Record<string, boolean>>({});
  const [stockLoaded, setStockLoaded] = useState(false);

  // Use the passed variant prop, or default to first variant if only one exists
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariant = propVariant || (defaultVariantId ? variants[0] : undefined);

  // Batch fetch stock for all variants on mount (non-blocking)
  useEffect(() => {
    const idsToFetch = new Set<string>();
    idsToFetch.add(product.id);
    variants.forEach((v) => {
      if (v.id !== product.id) {
        idsToFetch.add(v.id);
      }
    });

    Promise.all(
      Array.from(idsToFetch).map((id) =>
        fetch(`/api/inventory/${id}`)
          .then((res) => res.json())
          .then((data) => ({ id, inStock: data.inStock as boolean }))
          .catch(() => ({ id, inStock: null })) // null = use build-time data
      )
    ).then((results) => {
      const map: Record<string, boolean> = {};
      results.forEach(({ id, inStock }) => {
        if (inStock !== null) {
          map[id] = inStock;
        }
      });
      setStockMap(map);
      setStockLoaded(true);
    });
  }, [product.id, variants]);

  // Determine availability: use fresh stock if loaded, otherwise fall back to build-time data
  const isAvailable = (() => {
    const variantId = selectedVariant?.id ?? product.id;
    if (stockLoaded && variantId in stockMap) {
      return stockMap[variantId];
    }
    // Fall back to build-time data
    return selectedVariant?.availableForSale ?? availableForSale;
  })();

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setIsAdding(true);
    try {
      addItem({
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        image: product.featuredImage,
        handle: product.handle,
        quantity: 1,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-[#C4A484] p-4 text-sm font-medium uppercase tracking-wider text-white transition-all duration-150 active:scale-[0.98]";
  const disabledClasses = "cursor-not-allowed opacity-60";

  if (!isAvailable) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariant && variants.length > 1) {
    return (
      <button
        disabled
        className={clsx(buttonClasses, disabledClasses)}
        aria-label="Please select an option"
      >
        <PlusIcon className="mr-2 h-5 w-5" />
        Select Options
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={clsx(buttonClasses, "hover:bg-[#B8997A]", {
        "opacity-70": isAdding,
      })}
      aria-label="Add to cart"
    >
      <PlusIcon className="mr-2 h-5 w-5" />
      {isAdding ? "Adding..." : "Add To Cart"}
    </button>
  );
}
