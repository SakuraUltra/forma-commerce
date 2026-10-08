"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductFilters, {
  type Filters,
} from "@/components/product/ProductFilters";
import MotionDiv from "@/components/ui/MotionDiv";
import { useRouter, useSearchParams } from "next/navigation";
import {
  defaultFilters,
  filterProducts,
  parseFilters,
} from "@/lib/product-filters";

export default function ProductListingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const filters = parseFilters(params);
  const filtered = filterProducts(filters);
  const setFilters = (next: Filters) => {
    const query = new URLSearchParams();
    for (const key of Object.keys(next) as (keyof Filters)[]) {
      if (next[key] !== defaultFilters[key]) query.set(key, next[key]);
    }
    router.replace(`/products${query.size ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
      {/* Header */}
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        The everyday collection
      </p>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          All products
        </h1>
        <span
          className="shrink-0 text-xs text-muted-foreground"
          aria-live="polite"
        >
          {filtered.length} products
        </span>
      </div>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
        Simple shapes, easy layers and the finishing touches. Find your everyday
        favourites.
      </p>

      <ProductFilters filters={filters} onChange={setFilters} />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <MotionDiv key={p.slug} index={i}>
              <ProductCard
                name={p.name}
                price={p.price}
                originalPrice={p.compareAtPrice}
                image={p.image}
                slug={p.slug}
                colors={p.colorHexes}
                badge={
                  p.compareAtPrice
                    ? `-${Math.round((1 - p.price / p.compareAtPrice) * 100)}%`
                    : undefined
                }
              />
            </MotionDiv>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-20 text-center">
          <p className="font-display text-2xl text-foreground">
            No products found
          </p>
          <button
            onClick={() =>
              setFilters({
                category: "All",
                color: "All",
                price: "All",
                sort: filters.sort,
              })
            }
            className="mt-4 cursor-pointer text-sm font-medium text-primary underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
