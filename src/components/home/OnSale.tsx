import ProductCard from "@/components/product/ProductCard";
import type { Product as ProductWithVariants } from "@/lib/catalog";

export default function OnSale({
  products,
}: {
  products: ProductWithVariants[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">On sale</h2>
        <span className="text-sm font-medium text-red-500">
          Limited time offers
        </span>
      </div>

      {/* Horizontal scroll */}
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => {
          const minPrice = Math.min(...product.variants.map((v) => v.price));
          const colors = [...new Set(product.variants.map((v) => v.color))];
          const discount = product.compareAtPrice
            ? `-${Math.round((1 - minPrice / product.compareAtPrice) * 100)}%`
            : undefined;
          return (
            <div
              key={product.slug}
              className="min-w-[160px] flex-shrink-0 md:min-w-[200px]"
            >
              <ProductCard
                name={product.name}
                price={minPrice}
                originalPrice={product.compareAtPrice ?? undefined}
                image={product.images[0] ?? undefined}
                slug={product.slug}
                colors={colors}
                badge={discount}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
