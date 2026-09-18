import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ContactForm from "@/app/components/pages/contact/ContactForm";
import LocationContactPanel from "@/app/components/shared/LocationContactPanel";
import { LineIcon, WhatsAppIcon } from "@/app/components/icons/BrandIcons";
import { getWhatsAppLink } from "@/app/lib/contact";
import { localizedPageMetadata } from "@/app/lib/seo";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return localizedPageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const locale = await getLocale();
  const address = getSiteText(siteConfig.location.name, locale);

  const contactItems = [
    {
      label: t("whatsapp"),
      description: t("whatsappDesc"),
      value: siteConfig.contact.whatsapp.display,
      href: getWhatsAppLink(locale),
      icon: <WhatsAppIcon size={19} />,
      iconClass: "bg-[#25D366] text-white",
      external: true,
    },
    {
      label: t("phone"),
      description: t("phoneDesc"),
      value: siteConfig.contact.phone.display,
      href: siteConfig.contact.phone.href,
      icon: <Phone size={19} />,
      iconClass: "bg-foreground text-accent",
      external: false,
    },
    {
      label: t("line"),
      description: t("lineDesc"),
      value: siteConfig.contact.line.display,
      href: siteConfig.contact.line.href,
      icon: <LineIcon size={19} />,
      iconClass: "bg-[#06c755] text-white",
      external: true,
    },
    {
      label: t("email"),
      description: t("emailDesc"),
      value: siteConfig.contact.email.display,
      href: siteConfig.contact.email.href,
      icon: <Mail size={19} />,
      iconClass: "bg-[#e9e3d8] text-foreground",
      external: false,
    },
  ];

  return (
    <div className="w-full bg-[#f7f4ee] text-foreground">
      <section className="border-b border-[#ddd7cc] bg-[#f7f4ee] px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: t("breadcrumb") }]} />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1fr_0.78fr] lg:gap-20">
            <div className="border-l-2 border-accent pl-5 sm:pl-8">
              <h1 className="max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-balance">
                {t("title")}
              </h1>
              <p className="font-sarabun mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {t("subtitle")}
              </p>
            </div>

            <div className="relative h-[260px] overflow-hidden border border-[#cfc7b9] bg-[#eae4da] sm:h-[340px] lg:h-[390px]">
              <Image
                src="/hero-bg.jpg"
                alt={`${siteConfig.brand.displayName} — ${address}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 border-r border-t border-[#cfc7b9] bg-[#f7f4ee] px-4 py-3 text-xs font-semibold tracking-wide text-foreground sm:px-5">
                {siteConfig.brand.shortName} · Hat Yai
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ddd7cc] bg-white px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <h2 className="max-w-md text-2xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
              {t("contactTitle")}
            </h2>
            <div className="mt-5 h-px w-12 bg-accent sm:mt-7 sm:w-16" />
            <p className="font-sarabun mt-5 max-w-sm text-sm leading-7 text-slate-600 sm:mt-7 sm:text-base sm:leading-8">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 border-y border-[#d8d1c5] lg:block">
            {contactItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[44px_minmax(0,1fr)_20px] items-start gap-x-3 border-b border-[#e5e0d7] bg-white py-4 transition-colors last:border-b-0 hover:bg-[#faf8f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:grid-cols-[48px_minmax(0,1fr)_20px] sm:gap-x-4 sm:py-5 lg:min-h-0 lg:grid-cols-[52px_0.8fr_1.2fr_auto] lg:items-center lg:gap-6 lg:bg-transparent lg:py-7 lg:hover:bg-transparent"
              >
                <span
                  className={
                    "row-span-2 flex h-10 w-10 items-center justify-center rounded-xl sm:h-11 sm:w-11 lg:row-auto " +
                    item.iconClass
                  }
                >
                  {item.icon}
                </span>
                <div className="min-w-0 self-center lg:self-auto">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                    0{index + 1}
                  </p>
                  <h3 className="mt-0.5 truncate text-base font-bold sm:text-lg lg:mt-1 lg:text-xl">{item.label}</h3>
                </div>
                <div className="col-start-2 mt-2 min-w-0 lg:col-auto lg:mt-0">
                  <p className="font-sarabun text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                  <p className="mt-1 break-words text-sm font-semibold leading-5 text-foreground">
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="col-start-3 row-span-2 row-start-1 self-center text-slate-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent lg:col-auto lg:row-auto"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
      <ContactForm />

      <section
        className="border-b border-[#ddd7cc] bg-[#f7f4ee] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
        aria-labelledby="contact-location-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl border-l-2 border-accent pl-5 sm:pl-8">
            <h2
              id="contact-location-heading"
              className="text-pretty text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              {t("locationTitle")}
            </h2>
          </div>
          <div className="mt-12">
            <LocationContactPanel
              address={address}
              addressLabel={t("addressLabel")}
              mapTitle={t("locationTitle")}
              openMapsLabel={t("openMaps")}
              {...(siteConfig.features.reviewsEnabled
                ? {
                    rating: siteConfig.reviews.rating,
                    reviewCount: siteConfig.reviews.reviewCount,
                  }
                : {})}
              mapClassName="min-h-[330px] border-[#cfc7b9] shadow-none sm:min-h-[460px]"
              details={[
                {
                  label: t("hoursLabel"),
                  value: t("hours"),
                  icon: <Clock3 size={19} />,
                },
                {
                  label: t("checkInLabel"),
                  value: t("checkIn"),
                  icon: <MessageCircle size={19} />,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ee] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border-y border-foreground bg-foreground px-5 py-9 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-9 sm:py-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="font-sarabun mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {t("ctaText")}
            </p>
          </div>
          <a
            href={getWhatsAppLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 border border-accent bg-accent px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-[#e8c97a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {t("ctaButton")}
          </a>
        </div>
      </section>
    </div>
  );
}



