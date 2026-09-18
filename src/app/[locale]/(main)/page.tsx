import type { Metadata } from "next";

import HeroSection from "@/app/components/main/HeroSection";

import LogoMarquee from "@/app/components/main/LogoMarquee";

import RoomsSection from "@/app/components/main/RoomsSection";

import PropertyGallerySection from "@/app/components/main/PropertyGallerySection";

import AmenitiesSection from "@/app/components/main/AmenitiesSection";

import FAQSection from "@/app/components/main/FAQSection";

import LocationSection from "@/app/components/main/LocationSection";

import ReviewsSection from "@/app/components/main/ReviewsSection";

import FinalCTASection from "@/app/components/main/FinalCTASection";

import BackToTopButton from "@/app/components/main/BackToTopButton";

import FloatingChatWidget from "@/app/components/main/FloatingChatWidget";

import JsonLd from "@/app/components/seo/JsonLd";

import {
  absoluteUrl,
  localizedPageMetadata,
  localizedPath,
  siteDescription,
} from "@/app/lib/seo";

import { getLocale, getTranslations } from "next-intl/server";

import { getSiteText, siteConfig } from "@/app/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "HomeMeta" });

  return localizedPageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage() {
  const t = await getTranslations("HomeMeta");

  const locale = await getLocale();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",

          "@type": "LodgingBusiness",

          name: getSiteText(siteConfig.brand.name, locale),

          description:
            t("businessDescription") ||
            getSiteText(siteConfig.brand.tagline, locale) ||
            siteDescription,

          url: absoluteUrl(localizedPath(locale)),

          image: absoluteUrl(siteConfig.assets.heroBackground),

          address: {
            "@type": "PostalAddress",

            addressLocality: getSiteText(siteConfig.location.locality, locale),

            addressRegion: getSiteText(siteConfig.location.region, locale),

            postalCode: siteConfig.location.postalCode,

            addressCountry: siteConfig.location.countryCode,
          },

          geo: {
            "@type": "GeoCoordinates",

            latitude: siteConfig.location.latitude,

            longitude: siteConfig.location.longitude,
          },

          telephone: siteConfig.contact.phone.display,

          sameAs: [
            siteConfig.contact.facebook.href,

            siteConfig.contact.line.href,

            siteConfig.location.googleMapsUrl,
          ],

          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",

            dayOfWeek: [
              "Monday",

              "Tuesday",

              "Wednesday",

              "Thursday",

              "Friday",

              "Saturday",

              "Sunday",
            ],

            opens: siteConfig.business.serviceHours.split("–")[0],

            closes: siteConfig.business.serviceHours.split("–")[1],
          },

          priceRange: siteConfig.business.priceRange,
        }}
      />

      <HeroSection />

      {/* <StatsBar /> */}

      <LogoMarquee />

      <RoomsSection />

      <PropertyGallerySection />

      <AmenitiesSection />

      <FAQSection />
      <div
        className="pointer-events-none relative z-20 -mb-px h-8 overflow-hidden bg-[#f9f5f0] leading-[0] sm:h-12"
        aria-hidden="true"
      >
        <svg
          className="block h-full w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M0 42C180 86 360 88 540 47C730 4 900 5 1088 48C1240 83 1340 84 1440 42V100H0V42Z"
          />
        </svg>
      </div>
      <LocationSection />

      <ReviewsSection />

      <FinalCTASection />

      <BackToTopButton />

      <FloatingChatWidget />
    </>
  );
}


