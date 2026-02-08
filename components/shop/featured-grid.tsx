import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/woocommerce/types";
import Link from "next/link";

interface FeaturedGridProps {
  products: Product[];
}

function FeaturedGridItem({
  product,
  size,
  priority,
}: {
  product: Product;
  size: "large" | "small";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "large"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/products/${product.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={product.featuredImage?.url}
          fill
          sizes={
            size === "large"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={product.title}
          label={{
            position: size === "large" ? "center" : "bottom",
            title: product.title,
            amount: product.priceRange.maxVariantPrice.amount,
            currencyCode: product.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export function FeaturedGrid({ products }: FeaturedGridProps) {
  if (products.length < 3) {
    return null;
  }

  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <section className="pt-8">
      <div className="mb-6">
        <h2 className="font-serif text-3xl tracking-tight text-stone-900">
          Featured
        </h2>
        <p className="mt-1 text-stone-600">Our most sought-after compounds.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2">
        <FeaturedGridItem
          size="large"
          product={firstProduct!}
          priority={true}
        />
        <FeaturedGridItem
          size="small"
          product={secondProduct!}
          priority={true}
        />
        <FeaturedGridItem size="small" product={thirdProduct!} />
      </div>
    </section>
  );
}
