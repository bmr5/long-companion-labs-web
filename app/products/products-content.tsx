"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Grid from "components/grid";
import { Footer } from "components/landing/footer";
import ProductGridItems from "components/layout/product-grid-items";
import { CategorySection, FeaturedCarousel, ShopHero } from "components/shop";
import { Product } from "lib/woocommerce/types";
import Link from "next/link";

// Check if a product is an accessory/supply (water, bacteriostatic, etc.)
function isAccessory(product: Product): boolean {
  const accessoryTerms = ["water", "bacteriostatic", "accessories", "supplies"];
  const title = product.title.toLowerCase();
  const tags = product.tags.map((t) => t.toLowerCase());

  return (
    accessoryTerms.some((term) => title.includes(term)) ||
    accessoryTerms.some((term) => tags.includes(term))
  );
}

// Priority featured products (by slug/handle)
const PRIORITY_FEATURED = ["bpc-157", "retatrutide", "ghk-cu"];

// Local image overrides for featured products
const IMAGE_OVERRIDES: Record<string, string> = {
  "bpc-157": "/products/BPC-157.png",
  "retatrutide": "/products/Retatrutide.png",
  "ghk-cu": "/products/GHK-CU.png",
};

// Apply image overrides to products
function applyImageOverrides(products: Product[]): Product[] {
  return products.map((product) => {
    const slug = product.handle.toLowerCase();
    const overrideKey = Object.keys(IMAGE_OVERRIDES).find(
      (key) => slug === key || slug.includes(key.replace("-", ""))
    );

    if (overrideKey) {
      return {
        ...product,
        featuredImage: {
          ...product.featuredImage,
          url: IMAGE_OVERRIDES[overrideKey]!,
        },
      };
    }
    return product;
  });
}

// Group products into categories
function groupProducts(products: Product[]) {
  // Split into peptides and supplies
  const peptides = products.filter((p) => !isAccessory(p));
  const supplies = products.filter((p) => isAccessory(p));

  // Get priority featured products first (in order)
  const priorityFeatured = PRIORITY_FEATURED.map((slug) =>
    products.find(
      (p) =>
        p.handle.toLowerCase() === slug ||
        p.handle.toLowerCase().includes(slug.replace("-", ""))
    )
  ).filter((p): p is Product => p !== undefined);

  // Then get any WooCommerce-marked featured products
  const wcFeatured = products.filter(
    (p) => p.featured && !priorityFeatured.some((pf) => pf.id === p.id)
  );

  // Combine: priority first, then WooCommerce featured, then newest peptides
  let featuredDisplay = [...priorityFeatured, ...wcFeatured];

  // If we still need more, add newest peptides
  if (featuredDisplay.length < 6) {
    const existingIds = new Set(featuredDisplay.map((p) => p.id));
    const newestPeptides = [...peptides]
      .filter((p) => !existingIds.has(p.id))
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
      .slice(0, 6 - featuredDisplay.length);
    featuredDisplay = [...featuredDisplay, ...newestPeptides];
  }

  featuredDisplay = featuredDisplay.slice(0, 6);

  // Remove featured products from peptides list to avoid duplication
  const featuredIds = new Set(featuredDisplay.map((p) => p.id));
  const remainingPeptides = peptides.filter((p) => !featuredIds.has(p.id));

  return {
    featured: featuredDisplay,
    peptides: remainingPeptides,
    supplies,
  };
}

// Client-side search filtering
function filterProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;

  const lowerQuery = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

interface ProductsContentProps {
  products: Product[];
}

export function ProductsContent({ products }: ProductsContentProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Filter products client-side based on search query
  const filteredProducts = useMemo(
    () => filterProducts(products, query),
    [products, query]
  );

  // Search results mode
  if (query) {
    return (
      <>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="/products"
                className="text-sm text-stone-500 hover:text-stone-700"
              >
                &larr; All Products
              </Link>
            </div>
            <h1 className="font-serif text-4xl text-stone-900">
              Search Results
            </h1>
            <p className="mt-2 text-stone-600">
              {filteredProducts.length === 0
                ? `No results found for "${query}"`
                : `${filteredProducts.length} result${filteredProducts.length === 1 ? "" : "s"} for "${query}"`}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <ProductGridItems products={filteredProducts} />
            </Grid>
          ) : (
            <div className="py-12 text-center">
              <p className="text-stone-600">
                Try a different search term or{" "}
                <Link
                  href="/products"
                  className="text-[#C4A484] hover:underline"
                >
                  browse all products
                </Link>
              </p>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }

  // Editorial layout mode
  const { featured, peptides, supplies } = groupProducts(products);

  // Apply custom images to featured products
  const featuredWithOverrides = applyImageOverrides(featured);

  return (
    <>
      <ShopHero />

      <div className="mx-auto max-w-7xl px-4">
        {featuredWithOverrides.length >= 3 && (
          <FeaturedCarousel products={featuredWithOverrides} />
        )}

        <CategorySection
          title="Peptides"
          description="Research-grade compounds for your studies."
          products={peptides}
        />

        {supplies.length > 0 && (
          <CategorySection
            title="Supplies"
            description="Essential accessories for your research."
            products={supplies}
            variant="subtle"
          />
        )}
      </div>

      <Footer />
    </>
  );
}
