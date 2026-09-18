import { CircleCheck } from "lucide-react";
import { WhatsAppIcon } from "@/app/components/icons/BrandIcons";
import { getWhatsAppLink } from "@/app/lib/contact";
import { useLocale, useTranslations } from "next-intl";

export default function FinalCTASection() {
  const t = useTranslations("FinalCTA");
  const locale = useLocale();
  const perks = t.raw("perks") as string[];
  return (
    <section id="cta" className="bg-foreground px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white">
          {t("title")}
          <br />
          <span className="text-accent">{t("titleAccent")}</span>
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-white/55">
          {t("description")
            .split("\n")
            .map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
        </p>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {perks.map((p) => (
            <div
              key={p}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-sm text-white/80"
            >
              <CircleCheck size={14} className="text-accent" />
              {p}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={getWhatsAppLink(locale)}
          target="_blank"
          rel="noopener noreferrer"
          id="final-whatsapp-cta"
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-accent to-[#e8c97a] px-8 py-4 text-base font-bold text-foreground shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-200"
        >
          <WhatsAppIcon size={22} />
          {t("button")}
        </a>

        <p className="mt-4 text-xs text-white/30">{t("hours")}</p>
      </div>
    </section>
  );
}
