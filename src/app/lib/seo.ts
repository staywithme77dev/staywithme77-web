import type { Metadata } from "next";
import type {AppLocale} from "@/i18n/routing";
import { siteConfig } from "@/app/lib/siteConfig";

export const siteUrl = siteConfig.runtime.siteUrl;
export const isProductionSite = !/localhost|127\.0\.0\.1/i.test(siteUrl);

export const siteName = siteConfig.brand.displayName;
export const siteDescription = `${siteConfig.brand.tagline.th} | ${siteConfig.brand.tagline.en}`;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brand.displayName} | ที่พักหาดใหญ่`,
    template: `%s | ${siteConfig.brand.displayName}`,
  },
  description: siteDescription,
  keywords: [...siteConfig.seo.keywords],
  alternates: { canonical: "/" },
  robots: isProductionSite
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    url: "/",
    siteName,
    title: `${siteConfig.brand.displayName} | ที่พักหาดใหญ่`,
    description: siteDescription,
    images: [{
      url: siteConfig.seo.socialImage.path,
      width: siteConfig.seo.socialImage.width,
      height: siteConfig.seo.socialImage.height,
      alt: siteConfig.seo.socialImage.alt,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.displayName} | ที่พักหาดใหญ่`,
    description: siteDescription,
    images: [siteConfig.seo.socialImage.path],
  },
  verification: siteConfig.runtime.googleSiteVerification
    ? { google: siteConfig.runtime.googleSiteVerification }
    : undefined,
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function localizedPath(locale: AppLocale | string, path = "/") {
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

export function localizedAlternates(locale: AppLocale | string, path = "/") {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      th: localizedPath("th", path),
      en: localizedPath("en", path),
      "x-default": localizedPath("en", path)
    }
  };
}

export function localizedPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: AppLocale | string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const pagePath = path ?? "/";
  const url = localizedPath(locale, pagePath);
  return {
    title,
    description,
    alternates: localizedAlternates(locale, pagePath),
    openGraph: {
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: [locale === "th" ? "en_US" : "th_TH"],
      url,
      siteName,
      title,
      description,
      images: [{
        url: siteConfig.seo.socialImage.path,
        width: siteConfig.seo.socialImage.width,
        height: siteConfig.seo.socialImage.height,
        alt: siteConfig.seo.socialImage.alt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.seo.socialImage.path],
    },
  };
}
