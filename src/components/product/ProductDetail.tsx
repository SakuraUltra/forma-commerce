"use client";

import { formatMoney } from "@/lib/store-config";
import ImageGallery from "@/components/product/ImageGallery";
import { useCartStore } from "@/store/cart";
import type { Product as ProductWithVariants } from "@/lib/catalog";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left — Image gallery */}
        <div className="md:w-1/2">
          <ImageGallery images={product.images} name={product.name} />
        </div>

        {/* Right — Product info */}
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-semibold md:text-3xl">{product.name}</h1>

          {/* Price */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xl font-semibold">
              {formatMoney(displayPrice)}
            </span>
            {product.compareAtPrice &&
              product.compareAtPrice > displayPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    {formatMoney(product.compareAtPrice)}
                  </span>
                  <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                    -{discountPercent}%
                  </span>
                </>
              )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {product.description}
            </p>
          )}

          {/* Color selector */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Color
              {selectedColor && (
                <span className="ml-2 font-normal text-neutral-500 dark:text-neutral-400">
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
                  className={`h-8 w-8 cursor-pointer rounded-full border-2 border-neutral-200 dark:border-neutral-600 ${
                    selectedColor === color
                      ? "ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-neutral-950"
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
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Size
            </h3>
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
                    className={`cursor-pointer rounded border px-4 py-2 text-sm ${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : outOfStock
                          ? "cursor-not-allowed border-neutral-200 text-neutral-300 line-through opacity-50 dark:border-neutral-700 dark:text-neutral-600"
                          : "border-neutral-300 hover:border-black dark:border-neutral-600 dark:hover:border-white"
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
                  ? "text-amber-600"
                  : "text-neutral-500"
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
            className="mt-6 w-full cursor-pointer rounded-lg bg-black py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </div>
  );
}
