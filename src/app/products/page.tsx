import ProductListingContent from "@/components/product/ProductListingContent";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our full collection of minimal fashion and accessories.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="p-12">Loading products…</p>}>
      <ProductListingContent />
    </Suspense>
  );
}
