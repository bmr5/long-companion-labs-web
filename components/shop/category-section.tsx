import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { Product } from "lib/woocommerce/types";

interface CategorySectionProps {
  title: string;
  description?: string;
  products: Product[];
  variant?: "default" | "subtle";
}

export function CategorySection({
  title,
  description,
  products,
  variant = "default",
}: CategorySectionProps) {
  if (products.length === 0) {
    return null;
  }

  const isSubtle = variant === "subtle";

  return (
    <section className={isSubtle ? "py-10" : "pt-12 pb-8"}>
      <div className="mb-6">
        <h2
          className={`font-serif italic ${
            isSubtle
              ? "text-2xl text-stone-600"
              : "text-3xl tracking-tight text-stone-900"
          }`}
        >
          {title.toLowerCase()}
        </h2>
        {description && (
          <p
            className={`mt-1 ${
              isSubtle ? "text-sm text-stone-500" : "text-stone-600"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <Grid
        className={
          isSubtle
            ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        <ProductGridItems products={products} />
      </Grid>
    </section>
  );
}
