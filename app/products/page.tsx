import { getProducts } from "lib/woocommerce";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsContent } from "./products-content";

// Static page with ISR - revalidate every hour
// This works because we removed searchParams from the server component
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products | Genesis Peptides",
  description:
    "Browse our complete collection of premium peptides and research compounds.",
};

// Loading skeleton for the products content
function ProductsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded bg-stone-200" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-stone-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  // Fetch all products once - this gets cached with ISR
  const products = await getProducts();

  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
