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
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">All products</h1>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {filtered.length} products
        </span>
      </div>

      <ProductFilters filters={filters} onChange={setFilters} />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
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
        <div className="py-20 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
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
            className="mt-4 cursor-pointer text-sm font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
