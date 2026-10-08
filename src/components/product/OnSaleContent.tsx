"use client";

import ProductCard from "@/components/product/ProductCard";
import MotionDiv from "@/components/ui/MotionDiv";
import Link from "next/link";
import { useMemo, useState } from "react";

import { saleProducts } from "@/lib/catalog";

type SortOption = "price-asc" | "price-desc" | "biggest-discount";

export default function OnSaleContent() {
  const [sort, setSort] = useState<SortOption>("biggest-discount");

  const sorted = useMemo(() => {
    const items = [...saleProducts];
    switch (sort) {
      case "price-asc":
        return items.sort((a, b) => a.price - b.price);
      case "price-desc":
        return items.sort((a, b) => b.price - a.price);
      case "biggest-discount":
        return items.sort(
          (a, b) =>
            1 - b.price / b.compareAtPrice! - (1 - a.price / a.compareAtPrice!),
        );
    }
  }, [sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Sale banner */}
      <div className="mb-8 rounded-lg border border-red-100 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950">
        <p className="font-medium text-red-600">
          Selected favourites, reduced prices
        </p>
      </div>

      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-semibold">On Sale</h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Limited time offers on selected items
          </p>
        </div>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          {sorted.length} products
        </span>
      </div>

      {/* Sort */}
      <div className="mt-6 mb-6 flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Sort by
        </span>
        <select
          aria-label="Sort sale products"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:ring-white"
        >
          <option value="biggest-discount">Biggest discount</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {sorted.map((p, i) => (
            <MotionDiv key={p.slug} index={i}>
              <ProductCard
                name={p.name}
                price={p.price}
                originalPrice={p.compareAtPrice}
                image={p.image}
                slug={p.slug}
                colors={p.colorHexes}
                badge={`-${Math.round((1 - p.price / p.compareAtPrice!) * 100)}%`}
              />
            </MotionDiv>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            No items on sale right now
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-black underline underline-offset-4 dark:text-white"
          >
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
