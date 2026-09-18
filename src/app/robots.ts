import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionSite } from "@/app/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: isProductionSite ? "/" : undefined,
      disallow: isProductionSite ? ["/api/", "/*/login"] : "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
