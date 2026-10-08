import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { storeConfig } from "@/lib/store-config";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/on-sale",
    "/about",
    ...products.map((p) => `/products/${p.slug}`),
  ].map((path) => ({ url: new URL(path, storeConfig.siteUrl).href }));
}
