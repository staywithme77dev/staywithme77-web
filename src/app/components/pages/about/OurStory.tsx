import { useLocale, useTranslations } from "next-intl";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";

export default function OurStory() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  const details = t.raw("story.details") as string[];

  return (
    <section className="border-b border-[#ddd7cc] bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {t("story.title")}
          </h2>
          <div className="mt-7 h-px w-16 bg-accent" />
        </div>

        <div className="max-w-3xl">
          <p className="text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
            {t("story.description")}
          </p>
          <div className="mt-7 space-y-5 border-t border-[#e5e0d7] pt-7 text-base leading-8 text-slate-600">
            {details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>

          <dl className="mt-10 grid border-y border-[#d8d1c5] sm:grid-cols-3">
            <div className="border-b border-[#e5e0d7] py-4 sm:border-b-0 sm:border-r sm:pr-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t("story.facts.location")}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {getSiteText(siteConfig.location.name, locale)}
              </dd>
            </div>
            <div className="border-b border-[#e5e0d7] py-4 sm:border-b-0 sm:border-r sm:px-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t("story.facts.stay")}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {t("story.facts.stayType")}
              </dd>
            </div>
            <div className="py-4 sm:pl-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t("story.facts.hours")}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {siteConfig.business.serviceHours}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
