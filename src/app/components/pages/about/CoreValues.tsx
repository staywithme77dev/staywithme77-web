import { useLocale, useTranslations } from "next-intl";
import { getWhatsAppLink } from "@/app/lib/contact";
import { WhatsAppIcon } from "@/app/components/icons/BrandIcons";

export default function CoreValues() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();

  const items = [0, 1, 2, 3].map((index) => ({
    title: t(`values.items.${index}.title`),
    description: t(`values.items.${index}.description`),
  }));

  return (
    <section className="bg-[#f7f4ee] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl border-l-2 border-accent pl-5 sm:pl-8">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {t("values.title")}
          </h2>
        </div>

        <div className="mt-12 border-y border-[#d8d1c5]">
          {items.map(({ title, description }, index) => (
            <article
              key={title}
              className="grid gap-5 border-b border-[#d8d1c5] py-7 last:border-b-0 sm:grid-cols-[72px_0.7fr_1.3fr] sm:items-start sm:gap-8 sm:py-9"
            >
              <div className="flex items-center gap-4 sm:block">
                <span className="text-2xl font-semibold tabular-nums text-accent">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-snug text-foreground sm:pt-1">
                {title}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:pt-1">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-3xl mt-16 grid gap-8 border-y border-foreground bg-foreground px-5 py-9 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-9 sm:py-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("cta.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {t("cta.text")}
            </p>
          </div>
          <a
            href={getWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full inline-flex min-h-12 items-center justify-center gap-3 border border-accent bg-accent px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-[#e8c97a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            <WhatsAppIcon aria-hidden="true" size={19} />
            {t("cta.button")}
          </a>
        </div>
      </div>
    </section>
  );
}

