"use client";

import { useState } from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { ChevronDown } from "lucide-react";
import JsonLd from "@/app/components/seo/JsonLd";
import { useTranslations } from "next-intl";

type FaqItem = { question: string; answer: string };

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const localizedFaqs = t.raw("items") as FaqItem[];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#f9f5f0] px-4 py-16 sm:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: localizedFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:pt-2">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            align="left"
          />
        </div>

        <div className="grid gap-3">
          {localizedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = "faq-answer-" + index;

            return (
              <div
                key={faq.question}
                className={
                  "group overflow-hidden rounded-xl border border-[#e6ddcf] bg-white transition-shadow duration-300 " +
                  (isOpen
                    ? "shadow-[0_10px_30px_rgba(26,26,46,0.08)]"
                    : "shadow-none")
                }
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="font-display flex w-full cursor-pointer items-center justify-between gap-4 bg-white px-5 py-5 text-left text-base font-semibold text-foreground transition-colors duration-200 hover:bg-white/90"
                >
                  {faq.question}
                  <span
                    className={
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f9f5f0] text-accent transition-transform duration-300 " +
                      (isOpen ? "rotate-180" : "rotate-0")
                    }
                  >
                    <ChevronDown size={20} strokeWidth={2.25} />
                  </span>
                </button>
                <div
                  id={answerId}
                  className={
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out " +
                    (isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="font-sarabun border-t border-[#b99435]/35 bg-gradient-to-br from-[#c9a84c] to-[#e5c875] px-5 pb-5 pt-4 text-sm leading-relaxed text-[#2d2514] font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
