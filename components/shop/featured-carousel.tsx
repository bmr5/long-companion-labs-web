"use client";

import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/woocommerce/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface FeaturedCarouselProps {
  products: Product[];
}

function useVisibleItems() {
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisibleItems, 150);
    };

    updateVisibleItems();
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return visibleItems;
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const visibleItems = useVisibleItems();

  const totalPages = Math.ceil(products.length / visibleItems);

  const goToPage = useCallback((index: number) => {
    setCurrentPage(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || totalPages <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext, totalPages]);

  // Reset page if it exceeds total pages after resize
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [currentPage, totalPages]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (products.length === 0) {
    return null;
  }

  // Calculate the percentage to translate based on page and visible items
  const itemWidthPercent = 100 / visibleItems;
  const translatePercent = currentPage * visibleItems * itemWidthPercent;

  return (
    <section className="py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-3xl italic tracking-tight text-stone-900">
            featured
          </h2>
          <p className="mt-1 text-stone-600">our most sought-after compounds.</p>
        </div>

        {/* Navigation arrows - only show if more than one page */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-stone-900 hover:text-stone-900"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${itemWidthPercent}%` }}
            >
              <Link
                href={`/products/${product.handle}`}
                className="relative block aspect-square"
                prefetch={true}
              >
                <GridTileImage
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                    position: "bottom",
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots - only show if more than one page */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "w-6 bg-stone-900"
                  : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
