import type { Metadata } from "next";
import {
  ArrowUpRight,
  Car,
  Clock3,
  MapPin,
  Phone,
  Plane,
  TrainFront,
  Utensils,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import AboutPhotoGrid from "@/app/components/pages/about/AboutPhotoGrid";
import LocationContactPanel from "@/app/components/shared/LocationContactPanel";
import { localizedPageMetadata } from "@/app/lib/seo";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";
import type { NearbyCategory } from "@/app/types/location";
import { Link } from "@/i18n/navigation";

const categoryIcons = [MapPin, TrainFront, Utensils];
const travelIcons = [Plane, TrainFront, Car];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocationPage" });

  return localizedPageMetadata({
    locale,
    path: "/location",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LocationPage() {
  const t = await getTranslations("LocationPage");
  const locale = await getLocale();
  const nearbyPlaces = t.raw("categories") as NearbyCategory[];
  const travelMethods = t.raw("travel") as Array<[string, string]>;
  const address = getSiteText(siteConfig.location.name, locale);

  return (
    <div className="min-h-screen bg-[#f5f1ea] pb-20 text-foreground">
      <header className="border-b border-[#d8d1c5] bg-[#f5f1ea] px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: t("breadcrumb") }]} />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:gap-16">
            <div className="border-l-2 border-accent pl-5 sm:pl-8">
              <h1 className="max-w-4xl text-[clamp(2.25rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-balance">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {t("subtitle")}
              </p>
            </div>

            <div className="border-t border-[#cfc7b9] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {t("mapBadge")}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {t("mapIntro")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section
        className="border-b border-[#d8d1c5] bg-white px-4 py-10 sm:px-6 sm:py-14 lg:py-20"
        aria-labelledby="location-map-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h2 id="location-map-heading" className="sr-only">
            {t("mapTitle")}
          </h2>
          <figure className="mx-auto aspect-square w-full max-w-[1080px] overflow-hidden border border-[#d8c69d] bg-[#f6f0e5] shadow-[0_30px_80px_rgba(69,51,15,0.16)]">
            <AboutPhotoGrid
              images={["/images/location/hatyai-location-map.png"]}
              name={t("mapTitle")}
              aspect="square"
            />
          </figure>
          <div className="mt-8 sm:mt-10">
            <LocationContactPanel
              address={address}
              addressLabel={t("addressLabel")}
              mapTitle={t("mapTitle")}
              openMapsLabel={t("openMaps")}
              rating={siteConfig.reviews.rating}
              reviewCount={siteConfig.reviews.reviewCount}
              mapClassName="min-h-[380px] lg:min-h-[560px]"
              details={[
                {
                  label: t("checkIn"),
                  value: siteConfig.business.checkIn,
                  icon: <Clock3 size={19} />,
                },
                {
                  label: t("checkOut"),
                  value: siteConfig.business.checkOut,
                  icon: <Clock3 size={19} />,
                },
                {
                  label: t("serviceHours"),
                  value: siteConfig.business.serviceHours,
                  icon: <Clock3 size={19} />,
                },
              ]}
              secondaryAction={{
                href: siteConfig.contact.phone.href,
                label: t("callUs"),
                icon: <Phone size={16} />,
              }}
            />
          </div>
        </div>
      </section>
      <section className="border-b border-[#d8d1c5] bg-[#f5f1ea] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-[#d8d1c5] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("nearby")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-right">
              {t("nearbySubtitle")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {nearbyPlaces.map((category, index) => {
              const Icon = categoryIcons[index] ?? MapPin;

              return (
                <article
                  key={category.category}
                  className="border border-[#cfc7b9] bg-white p-5 sm:p-7"
                >
                  <div className="flex items-center gap-3 border-b border-[#e5dfd5] pb-5">
                    <Icon
                      size={20}
                      className="text-accent"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold">{category.category}</h3>
                  </div>
                  <ul className="mt-2">
                    {category.places.map(([name, distance, note]) => (
                      <li
                        key={name}
                        className="border-b border-[#eee9e1] py-4 last:border-b-0"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-sm font-semibold leading-6">
                            {name}
                          </span>
                          <span className="shrink-0 text-xs font-bold tabular-nums text-accent">
                            {distance}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-6 text-slate-500">
                          {note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8d1c5] bg-foreground px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("directions")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60">
              {t("directionsSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {travelMethods.map(([title, detail], index) => {
              const Icon = travelIcons[index] ?? Car;

              return (
                <article key={title} className="border-t border-white/20 pt-6">
                  <div className="flex items-center justify-between">
                    <Icon
                      size={28}
                      className="text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold tabular-nums text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1ea] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-y border-[#cfc7b9] py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {t("ctaText")}
            </p>
          </div>
          <Link
            href="/rooms"
            id="location-page-cta"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-foreground bg-accent px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-[#e8c97a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <MapPin size={19} aria-hidden="true" />
            {t("ctaButton")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

