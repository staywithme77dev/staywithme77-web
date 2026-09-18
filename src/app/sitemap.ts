import type { MetadataRoute } from "next";
import { mockRooms } from "@/app/lib/mockDb";
import { absoluteUrl, isProductionSite } from "@/app/lib/seo";
import {routing} from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite) return [];

  const languageAlternates = (path: string) => ({
    th: absoluteUrl(`/th${path === "/" ? "" : path}`),
    en: absoluteUrl(`/en${path === "/" ? "" : path}`),
    "x-default": absoluteUrl(`/en${path === "/" ? "" : path}`)
  });

  const pages = routing.locales.flatMap((locale) =>
    ["/", "/rooms", "/about", "/location", "/contact", "/reviews", "/privacy", "/terms"].map((path) => ({
      url: absoluteUrl(`/${locale}${path === "/" ? "" : path}`),
      changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : 0.6,
      alternates: {languages: languageAlternates(path)}
    }))
  );

  const rooms = routing.locales.flatMap((locale) =>
    mockRooms.map((room) => {
      const path = `/rooms/${room.slug}`;
      return {
        url: absoluteUrl(`/${locale}${path}`),
        changeFrequency: "weekly" as const,
        priority: room.featured ? 0.8 : 0.7,
        images: room.images.map((image) => absoluteUrl(image.url)),
        alternates: {languages: languageAlternates(path)}
      };
    })
  );
  return [...pages, ...rooms];
}


