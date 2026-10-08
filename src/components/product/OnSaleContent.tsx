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
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
      {/* Sale banner */}
      <div className="mb-10 rounded-lg border border-border bg-muted/60 px-5 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
          Selected favourites, reduced prices
        </p>
      </div>

      {/* Header */}
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            On Sale
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            A few good finds, at a little less.
          </p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {sorted.length} products
        </span>
      </div>

      {/* Sort */}
      <div className="my-8 flex items-center gap-3 border-y border-border py-5">
        <span className="text-sm font-medium text-foreground">Sort by</span>
        <select
          aria-label="Sort sale products"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="min-h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="biggest-discount">Biggest discount</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
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
          <p className="text-muted-foreground">No items on sale right now</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4"
          >
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
