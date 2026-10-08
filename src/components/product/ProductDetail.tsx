"use client";

import { formatMoney } from "@/lib/store-config";
import ImageGallery from "@/components/product/ImageGallery";
import { useCartStore } from "@/store/cart";
import type { Product as ProductWithVariants } from "@/lib/catalog";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductDetail({
  product,
}: {
  product: ProductWithVariants;
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors.length === 1 ? product.colors[0] : null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    new Set(product.variants.map((variant) => variant.size)).size === 1
      ? product.variants[0].size
      : null,
  );
  const addItem = useCartStore((s) => s.addItem);

  // Derive unique colors and sizes
  const colors = useMemo(
    () => [...new Set(product.variants.map((v) => v.color))],
    [product.variants],
  );
  const sizes = useMemo(
    () => [...new Set(product.variants.map((v) => v.size))],
    [product.variants],
  );

  // Find matching variant
  const selectedVariant = useMemo(
    () =>
      selectedColor && selectedSize
        ? (product.variants.find(
            (v) => v.color === selectedColor && v.size === selectedSize,
          ) ?? null)
        : null,
    [product.variants, selectedColor, selectedSize],
  );

  // Price to display: selected variant price, or min price across all variants
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : Math.min(...product.variants.map((v) => v.price));

  // Discount percentage
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > displayPrice
      ? Math.round((1 - displayPrice / product.compareAtPrice) * 100)
      : null;

  // Stock for each size when a color is picked
  const stockForSize = (size: string) => {
    if (!selectedColor) return null;
    const v = product.variants.find(
      (v) => v.color === selectedColor && v.size === size,
    );
    return v ? v.stock : 0;
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-12">
      <Link
        href="/products"
        className="mb-8 inline-flex py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to the collection
      </Link>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        {/* Left — Image gallery */}
        <div className="md:w-1/2">
          <ImageGallery images={product.images} name={product.name} />
        </div>

        {/* Right — Product info */}
        <div className="md:w-1/2 md:py-4 lg:pl-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight lg:text-5xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xl font-medium">
              {formatMoney(displayPrice)}
            </span>
            {product.compareAtPrice &&
              product.compareAtPrice > displayPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    {formatMoney(product.compareAtPrice)}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    -{discountPercent}%
                  </span>
                </>
              )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Color selector */}
          <div className="mt-8 border-t border-border pt-7">
            <h3 className="text-sm font-medium text-foreground">
              Color
              {selectedColor && (
                <span className="ml-2 font-normal text-muted-foreground">
                  — {selectedColor}
                </span>
              )}
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize(sizes.length === 1 ? sizes[0] : null);
                  }}
                  className={`h-10 w-10 cursor-pointer rounded-full border-2 border-border transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                    selectedColor === color
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      product.colorHexes[product.colors.indexOf(color)] ??
                      color.toLowerCase(),
                  }}
                  title={color}
                  aria-label={`Color ${color}`}
                  aria-pressed={selectedColor === color}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground">Size</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => {
                const stock = stockForSize(size);
                const outOfStock = selectedColor != null && stock === 0;
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    onClick={() => !outOfStock && setSelectedSize(size)}
                    disabled={outOfStock}
                    aria-pressed={isSelected}
                    className={`min-h-11 min-w-12 cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : outOfStock
                          ? "cursor-not-allowed border-border text-muted-foreground line-through opacity-50"
                          : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock indicator */}
          {selectedVariant && (
            <p
              className={`mt-4 text-sm ${
                selectedVariant.stock <= 5
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-muted-foreground"
              }`}
            >
              {selectedVariant.stock} in stock
            </p>
          )}

          {/* Add to cart */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            onClick={() => {
              if (!selectedVariant || !selectedColor || !selectedSize) return;
              try {
                addItem({ variantId: selectedVariant.id });
                toast.success("Added to cart");
              } catch (error) {
                toast.error(
                  error instanceof Error ? error.message : "Could not add item",
                );
              }
            }}
            className="mt-7 min-h-12 w-full cursor-pointer rounded-md bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to cart
          </motion.button>
          <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">
            Try a demo order. No account or payment needed.
          </p>
        </div>
      </div>
    </div>
  );
}
