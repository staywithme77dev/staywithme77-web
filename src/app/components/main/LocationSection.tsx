import {
  BusFront,
  Building2,
  CarFront,
  Clock3,
  GraduationCap,
  Mail,  Plane,
  Phone,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";

import { getReviews } from "@/app/lib/reviews";
import LocationMap from "@/app/components/shared/LocationMap";

type Metric = [string, string, "airport" | "downtown" | "university"];
type TransportItem = [string, string, "airport" | "van" | "local"];

const metricIcons = {
  airport: Plane,
  downtown: Building2,
  university: GraduationCap,
};

const transportIcons = {
  airport: Plane,
  van: BusFront,
  local: CarFront,
};

export default async function LocationSection() {
  const t = await getTranslations("LocationSection");
  const locale = await getLocale();
  const metrics = t.raw("metrics") as Metric[];
  const transportItems = t.raw("transportItems") as TransportItem[];

  const reviewData = await getReviews(locale);

  const googleRating = reviewData.rating;

  const googleReviewCount = reviewData.reviewCount;

  return (
    <section
      id="location"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.04em] text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {t("subtitle")}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:gap-10">
          <LocationMap
            address={t("address") || getSiteText(siteConfig.location.name, locale)}
            mapTitle={t("mapTitle")}
            openMapsLabel={t("openMaps")}
            rating={googleRating}
            reviewCount={googleReviewCount}
            className="min-h-[360px] lg:min-h-[520px]"
          />

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-3">
              {metrics.map(([label, value, iconKey]) => {
                const Icon = metricIcons[iconKey];
                return (
                  <div
                    key={label}
                    className="flex min-h-[116px] flex-col items-center justify-center bg-[#fafafa] px-2 py-4 text-center"
                  >
                    <Icon
                      size={21}
                      className="text-[#7b5d2a]"
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#fafafa] p-6 sm:p-7">
              <h3 className="border-l-4 border-accent pl-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                {t("contact")}
              </h3>
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <a
                  href={siteConfig.contact.phone.href}
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Phone
                    size={17}
                    className="text-[#7b5d2a]"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.contact.phone.display}</span>
                </a>
                <a
                  href={siteConfig.contact.email.href}
                  className="flex items-center gap-3 transition-colors hover:text-foreground"
                >
                  <Mail
                    size={17}
                    className="text-[#7b5d2a]"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.contact.email.display}</span>
                </a>
                <div className="flex items-center gap-3">
                  <Clock3
                    size={17}
                    className="text-[#7b5d2a]"
                    aria-hidden="true"
                  />
                  <span>
                    {t("hours")}: {siteConfig.business.serviceHours}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] p-6 sm:p-7">
              <h3 className="border-l-4 border-accent pl-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                {t("transport")}
              </h3>
              <div className="mt-3 divide-y divide-[#e7e2d9]">
                {transportItems.map(([label, value, iconKey]) => {
                  const Icon = transportIcons[iconKey];
                  return (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 py-3 text-sm"
                    >
                      <span className="flex items-center gap-3 text-slate-600">
                        <Icon
                          size={16}
                          className="text-[#7b5d2a]"
                          aria-hidden="true"
                        />
                        {label}
                      </span>
                      <strong className="shrink-0 text-foreground">
                        {value}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




