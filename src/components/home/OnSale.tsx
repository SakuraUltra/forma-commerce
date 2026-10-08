import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function OnSale({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-9 px-6 py-16 sm:px-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12 lg:px-14 lg:py-24 xl:px-20">
      <div className="flex flex-col justify-center">
        <p className="eyebrow text-muted-foreground">Another good find</p>
        <h2 className="mt-4 font-display text-5xl leading-[1.06] tracking-[-0.04em] lg:text-6xl">
          The sale edit.
        </h2>
        <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
          A few familiar favourites, at a little less. Find a finishing touch
          for your everyday collection.
        </p>
        <Link
          href="/on-sale"
          className="collection-link mt-7 w-fit border-b border-foreground/40 pb-2 text-sm"
        >
          Explore the edit <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            name={product.name}
            price={product.price}
            originalPrice={product.compareAtPrice}
            image={product.images[0]}
            slug={product.slug}
            colors={product.colorHexes}
            badge={
              product.compareAtPrice
                ? `−${Math.round((1 - product.price / product.compareAtPrice) * 100)}%`
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
