import type { MetadataRoute } from "next";
import { storeConfig } from "@/lib/store-config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/orders", "/auth", "/api"],
    },
    sitemap: new URL("/sitemap.xml", storeConfig.siteUrl).href,
  };
}
