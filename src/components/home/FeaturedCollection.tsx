import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedCollection({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
        <div>
          <p className="eyebrow text-muted-foreground">A few favourites</p>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.035em] sm:text-5xl">
            Good things, on repeat.
          </h2>
        </div>
        <Link
          href="/products"
          className="collection-link border-b border-foreground/40 pb-1.5 text-xs"
        >
          Shop all pieces <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 md:gap-x-6">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            name={product.name}
            price={product.price}
            originalPrice={product.compareAtPrice}
            image={product.images[0]}
            slug={product.slug}
            colors={product.colorHexes}
            badge={product.compareAtPrice ? "The sale edit" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
