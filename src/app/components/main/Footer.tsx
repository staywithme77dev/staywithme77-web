import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  FileText,
  Link as Links,
} from "lucide-react";
import {
  WhatsAppIcon,
  LineIcon,
  FacebookIcon,
} from "@/app/components/icons/BrandIcons";
import CookieSettingsButton from "@/app/components/privacy/CookieSettingsButton";
import { getWhatsAppLink } from "@/app/lib/contact";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";
import { mockRooms } from "@/app/lib/mockDb";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const common = useTranslations("Common");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const socials = [
    {
      href: siteConfig.contact.facebook.href,
      label: siteConfig.contact.facebook.display,
      icon: <FacebookIcon size={18} />,
    },
    {
      href: siteConfig.contact.line.href,
      label: siteConfig.contact.line.display,
      icon: <LineIcon size={18} />,
    },
    {
      href: getWhatsAppLink(locale),
      label: "WhatsApp",
      icon: <WhatsAppIcon size={18} />,
    },
  ];
  const roomLinks = mockRooms
    .filter(
      (room, index, rooms) =>
        rooms.findIndex((item) => item.nameEn === room.nameEn) === index,
    )
    .slice(0, 4)
    .map((room) => ({
      label: `${locale === "en" ? room.nameEn : room.name} — ฿${room.price.toLocaleString()}/${common("night")}`,
      href: `/rooms/${room.slug}`,
    }));
  const quickLinks = [
    { label: common("home"), href: "/" },
    { label: common("allRooms"), href: "/rooms" },
    { label: common("location"), href: "/location" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gray-900 bg-[#0a0a0a] px-4 pb-8 pt-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-full max-w-2xl -translate-x-1/2 bg-accent/[0.07] blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-3">
              <Image
                src={siteConfig.assets.logoGold}
                alt={`${siteConfig.brand.displayName} Logo`}
                width={200}
                height={100}
                className="mx-auto md:mx-0 mb-2 h-auto w-auto max-h-[100px] object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <p className="-mt-4 font-display text-lg font-bold text-white">
              {siteConfig.brand.displayName}
            </p>
            <div className="mx-auto mb-3 h-[2px] w-8 rounded-full bg-accent md:mx-0" />
            <p className="mb-5 text-sm leading-relaxed text-gray-400">
              {t("tagline")
                .split("\n")
                .map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-400 transition-all duration-200 hover:border-accent hover:bg-black hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Room links */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-base font-bold text-white">
              {t("roomsTitle")}
            </h3>
            <ul className="space-y-2.5">
              {roomLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-base font-bold text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              {t("contact")}
            </h3>
            <ul className="space-y-4">
              <li className="text-center md:text-left">
                <address className="not-italic text-sm font-medium leading-relaxed text-gray-400">
                  <a
                    href={siteConfig.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors duration-200 hover:text-accent"
                    aria-label={getSiteText(siteConfig.location.name, locale)}
                  >
                    <MapPin
                      size={16}
                      className="mr-1.5 inline-block -translate-y-[1.5px] text-accent"
                    />
                    {getSiteText(siteConfig.location.name, locale)}
                  </a>
                </address>
              </li>
              <li className="text-center md:text-left">
                <a
                  href={siteConfig.contact.phone.href}
                  className="inline-block text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-accent"
                >
                  <Phone
                    size={16}
                    className="inline-block mr-1.5 text-accent -translate-y-[1px]"
                  />
                  {siteConfig.contact.phone.display}
                </a>
              </li>
              <li className="text-center md:text-left">
                <a
                  href={siteConfig.contact.email.href}
                  className="inline-block text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-accent"
                >
                  <Mail
                    size={16}
                    className="inline-block mr-1.5 text-accent -translate-y-[1px]"
                  />
                  {siteConfig.contact.email.display}
                </a>
              </li>
              <li className="text-center md:text-left">
                <Link
                  href={siteConfig.contact.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={siteConfig.contact.facebook.display}
                  className="inline-block text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-accent"
                >
                  <FacebookIcon
                    size={16}
                    className="inline-block mr-1.5 text-accent -translate-y-[1px]"
                  />
                  {siteConfig.contact.facebook.display}
                </Link>
              </li>
              <li className="text-center md:text-left">
                <NextLink
                  href="/links"
                  aria-label="Links"
                  className="inline-block text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-accent"
                >
                  <Links
                    size={16}
                    className="inline-block mr-1.5 text-accent -translate-y-[1px]"
                  />
                  All Links
                </NextLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-900 pt-6 pb-2 md:flex-row md:gap-3 md:pt-8 md:pb-0">
          <p className="text-center text-xs font-medium leading-relaxed text-gray-400 md:text-left md:text-sm">
            &copy; {year}{" "}
            <span className="font-semibold text-accent">
              {siteConfig.brand.displayName}
            </span>
            <br className="md:hidden" />
            <span className="md:hidden"> </span>
            {t("copyright")}.
          </p>
          <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-400 md:text-sm">
            <CookieSettingsButton />
            <span aria-hidden className="hidden opacity-50 sm:inline">
              ·
            </span>
            <Link
              href="/privacy"
              className="inline-flex items-baseline transition-colors duration-200 hover:text-[#c9a84c]"
            >
              <ShieldCheck size={14} className="mr-1.5 self-center" />
              <span>{t("privacy")}</span>
            </Link>
            <span aria-hidden className="hidden opacity-50 sm:inline">
              ·
            </span>
            <Link
              href="/terms"
              className="inline-flex items-baseline transition-colors duration-200 hover:text-[#c9a84c]"
            >
              <FileText size={14} className="mr-1.5 self-center" />
              <span>{t("terms")}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
