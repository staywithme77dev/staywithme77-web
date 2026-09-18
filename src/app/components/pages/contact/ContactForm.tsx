"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/app/lib/siteConfig";

export default function ContactForm() {
  const t = useTranslations("ContactPage");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent("Contact from " + name);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);

    setSubmitted(true);
    window.location.href = "mailto:" + siteConfig.contact.email.display + "?subject=" + subject + "&body=" + body;
  };

  return (
    <section className="border-b border-[#ddd7cc] bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{t("formTitle")}</h2>
          <div className="mt-7 h-px w-16 bg-accent" />
          <p className="font-sarabun mt-7 max-w-sm text-base leading-8 text-slate-600">{t("formSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="border-y border-[#d8d1c5] py-6 sm:py-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              {t("nameLabel")}
              <input name="name" required placeholder={t("namePlaceholder")} className="min-h-12 rounded-xl border border-[#d8d1c5] bg-[#f9f7f2] px-4 text-sm font-normal outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              {t("emailLabel")}
              <input name="email" type="email" required placeholder={t("emailPlaceholder")} className="min-h-12 rounded-xl border border-[#d8d1c5] bg-[#f9f7f2] px-4 text-sm font-normal outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-semibold">
            {t("messageLabel")}
            <textarea name="message" required rows={5} placeholder={t("messagePlaceholder")} className="resize-y rounded-xl border border-[#d8d1c5] bg-[#f9f7f2] px-4 py-3 text-sm font-normal leading-6 outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20" />
          </label>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sarabun text-xs leading-5 text-slate-500">{t("formNote")}</p>
            <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2b2b42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <Send size={16} />
              {submitted ? t("sent") : t("submit")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

