import type { Metadata } from "next";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import JsonLd from "@/app/components/seo/JsonLd";
import ReviewsDirectory from "@/app/components/pages/reviews/ReviewsDirectory";
import { getReviews } from "@/app/lib/reviews";
import { absoluteUrl, localizedPageMetadata, localizedPath } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ReviewsPage" });
  return localizedPageMetadata({ locale, path: "/reviews", title: t("metaTitle"), description: t("metaDescription") });
}

export default async function ReviewsPage() {
  if (!siteConfig.features.reviewsEnabled) notFound();

  const locale = await getLocale();
  const t = await getTranslations("ReviewsPage");
  const data = await getReviews(locale);

  return (
    <div className="min-h-screen bg-[#f7f3eb] pb-16 text-[#1b1b2f] sm:pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": absoluteUrl(localizedPath(locale, "/reviews")) + "#webpage",
          url: absoluteUrl(localizedPath(locale, "/reviews")),
          name: t("metaTitle"),
          description: t("metaDescription"),
          isPartOf: { "@type": "WebSite", url: absoluteUrl(localizedPath(locale)) },
        }}
      />
      <header className="border-b border-[#e3d9c9] bg-[#1b1b2f] px-4 pb-12 pt-28 text-white sm:px-6 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: t("title") }]} />
          <div className="mt-10 max-w-3xl">
            <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.04em]">{t("title")}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{t("subtitle")}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/60">
            <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-white"><ArrowLeft size={16} aria-hidden="true" />{t("backHome")}</Link>
            <span className="text-white/20">/</span>
            <span>{siteConfig.brand.displayName}</span>
          </div>
        </div>
      </header>
      <ReviewsDirectory
        reviews={data.reviews}
        googleProfileUrl={siteConfig.reviews.profileUrl}
        googleRating={data.rating}
        googleReviewCount={data.reviewCount}
        isGoogleLive={data.isGoogleLive}
        copy={{
          all: t("all"),
          google: t("google"),
          airbnb: t("airbnb"),
          facebook: t("facebook"),
          manual: t("manual"),
          live: t("live"),
          mock: t("mock"),
          noReviews: t("noReviews"),
          readOnGoogle: t("readOnGoogle"),
          writeReview: t("writeReview"),
          reviewsCount: t("reviewsCount"),
          ratingLabel: t("ratingLabel"),
          previous: t("previous"),
          next: t("next"),
        }}
      />
      <div className="mx-auto mt-8 flex max-w-7xl justify-center px-4 sm:px-6">
        <a href={siteConfig.contact.email.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f5d2b] hover:text-[#1b1b2f]">
          <MessageCircle size={16} aria-hidden="true" /> {siteConfig.contact.email.display}
        </a>
      </div>
    </div>
  );
}



