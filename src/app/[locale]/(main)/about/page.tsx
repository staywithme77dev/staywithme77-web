import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { absoluteUrl, localizedPageMetadata, localizedPath } from "@/app/lib/seo";
import JsonLd from "@/app/components/seo/JsonLd";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";

import AboutHero from "@/app/components/pages/about/AboutHero";
import OurStory from "@/app/components/pages/about/OurStory";
import AboutRooms from "@/app/components/pages/about/AboutRooms";
import CoreValues from "@/app/components/pages/about/CoreValues";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return localizedPageMetadata({ locale, path: "/about", title: t("metaTitle"), description: t("metaDescription") });
}

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");
  const locale = await getLocale();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              "@id": absoluteUrl(localizedPath(locale, "/about")) + "#webpage",
              url: absoluteUrl(localizedPath(locale, "/about")),
              name: t("metaTitle"),
              description: t("metaDescription"),
            },
            {
              "@type": "LocalBusiness",
              "@id":
                absoluteUrl(localizedPath(locale, "/about")) + "#organization",
              name: siteConfig.brand.displayName,
              description: t("metaDescription"),
              url: absoluteUrl(localizedPath(locale)),
              telephone: siteConfig.contact.phone.display,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.location.streetAddress,
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
            },
          ],
        }}
      />
      <div className="w-full">
        <AboutHero />
        <OurStory />
        <AboutRooms />
        <CoreValues />
      </div>
    </>
  );
}


