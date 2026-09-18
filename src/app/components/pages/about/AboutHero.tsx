import Image from "next/image";
import { useTranslations } from "next-intl";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { siteConfig } from "@/app/lib/siteConfig";

export default function AboutHero() {
  const t = useTranslations("AboutPage");

  return (
    <section className="border-b border-[#ddd7cc] bg-[#f7f4ee] px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: t("hero.title") }]} />

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1fr_0.78fr] lg:gap-20">
          <div className="border-l-2 border-accent pl-5 sm:pl-8">
            <h1 className="max-w-3xl text-[clamp(2.5rem,7vw,5.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground text-balance">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {t("hero.subtitle").split(" — ")[1] || t("hero.subtitle")}
            </p>
          </div>

          <div className="relative h-[260px] overflow-hidden border border-[#cfc7b9] bg-[#eae4da] sm:h-[340px] lg:h-[390px]">
            <Image
              src={siteConfig.assets.heroBackground}
              alt={t("hero.imageAlt")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 border-t border-r border-[#cfc7b9] bg-[#f7f4ee] px-4 py-3 text-xs font-semibold tracking-wide text-foreground sm:px-5">
              StayWithMe77 · Hat Yai
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
