import Grid from "components/grid";
import { Footer } from "components/landing/footer";
import ProductGridItems from "components/layout/product-grid-items";
import { getCategories, getCategory, getProductsByCategory } from "lib/woocommerce";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = await getCategory(params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.title} | Genesis Peptides`,
    description: category.description || `Browse our ${category.title} collection.`,
  };
}

async function CategoryNav({ currentSlug }: { currentSlug: string }) {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <nav className="mb-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/products"
            className="inline-block rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.handle}>
            <Link
              href={category.path}
              className={
                category.handle === currentSlug
                  ? "inline-block rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-medium text-white"
                  : "inline-block rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
              }
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [category, products] = await Promise.all([
    getCategory(params.slug),
    getProductsByCategory(params.slug),
  ]);

  if (!category) return notFound();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-stone-500">
            <li>
              <Link href="/products" className="hover:text-stone-900">
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="text-stone-900">{category.title}</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="font-serif text-4xl text-stone-900">{category.title}</h1>
          {category.description && (
            <p className="mt-2 text-stone-600">{category.description}</p>
          )}
        </div>

        <Suspense fallback={<div className="h-10" />}>
          <CategoryNav currentSlug={params.slug} />
        </Suspense>

        {products.length > 0 ? (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductGridItems products={products} />
          </Grid>
        ) : (
          <div className="py-12 text-center">
            <p className="text-stone-600">No products found in this category.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
