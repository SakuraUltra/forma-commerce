import ProductCard from "@/components/product/ProductCard";
import MotionDiv from "@/components/ui/MotionDiv";
import type { Product as ProductWithVariants } from "@/lib/catalog";
import Link from "next/link";

export default function FeaturedCollection({
  products,
}: {
  products: ProductWithVariants[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">Featured collection</h2>
        <Link
          href="/products"
          className="text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        >
          View all →
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product, idx) => {
          const minPrice = Math.min(...product.variants.map((v) => v.price));
          const colors = [...new Set(product.variants.map((v) => v.color))];
          return (
            <MotionDiv key={product.slug} index={idx}>
              <ProductCard
                name={product.name}
                price={minPrice}
                originalPrice={product.compareAtPrice ?? undefined}
                image={product.images[0] ?? undefined}
                slug={product.slug}
                colors={colors}
                badge={
                  product.compareAtPrice
                    ? `-${Math.round((1 - minPrice / product.compareAtPrice) * 100)}%`
                    : "New"
                }
              />
            </MotionDiv>
          );
        })}
      </div>
    </section>
  );
}
