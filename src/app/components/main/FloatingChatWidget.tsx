"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MapPin, MessageCircle, X } from "lucide-react";
import { useLocale } from "next-intl";

import {
  FacebookIcon,
  LineIcon,
  WhatsAppIcon,
} from "@/app/components/icons/BrandIcons";
import { getWhatsAppLink } from "@/app/lib/contact";
import { siteConfig } from "@/app/lib/siteConfig";

type SocialLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  tone: string;
  external?: boolean;
};

function SocialLink({
  href,
  label,
  icon,
  tone,
  external = false,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-end gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={label}
    >
      <span className="inline-flex h-10 w-[7rem] items-center justify-center whitespace-nowrap rounded-full bg-white px-2 text-xs font-semibold text-foreground shadow-[0_7px_18px_rgba(26,26,46,0.16)] transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-11 sm:w-[7.5rem] sm:px-3 sm:text-sm">
        {label}
      </span>
      <span
        className={
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-[0_9px_22px_rgba(26,26,46,0.24)] transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12 " +
          tone
        }
      >
        {icon}
      </span>
    </a>
  );
}

export default function FloatingChatWidget() {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const [isOpen, setIsOpen] = useState(false);
  const [hasBackToTop, setHasBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasBackToTop(window.scrollY > 420);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const contactPosition = hasBackToTop
    ? "bottom-[5.5rem] sm:bottom-24"
    : "bottom-4 sm:bottom-5";
  const labels = {
    facebook: "Facebook",
    line: "LINE",
    whatsapp: "WhatsApp",
    map: isEnglish ? "Google Maps" : "แผนที่",
    open: isEnglish ? "Open contact channels" : "เปิดช่องทางติดต่อ",
    close: isEnglish ? "Close contact channels" : "ปิดช่องทางติดต่อ",
  };

  return (
    <div
      className={
        "fixed right-4 z-[80] transition-[bottom] duration-500 ease-out sm:right-6 " +
        contactPosition
      }
    >
      <div
        id="floating-contact-panel"
        className={
          "absolute bottom-[calc(100%+0.8rem)] right-0 flex flex-col gap-2.5 origin-bottom-right transition-all duration-300 sm:gap-3 " +
          (isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0")
        }
        aria-hidden={!isOpen}
      >
        <SocialLink
          href={siteConfig.location.googleMapsUrl}
          label={labels.map}
          icon={<MapPin size={20} strokeWidth={2.2} />}
          tone="bg-[#c9a84c] text-foreground"
          external
        />
        <SocialLink
          href={siteConfig.contact.facebook.href}
          label={labels.facebook}
          icon={<FacebookIcon size={21} />}
          tone="bg-[#1877f2]"
          external
        />
        <SocialLink
          href={siteConfig.contact.line.href}
          label={labels.line}
          icon={<LineIcon size={21} />}
          tone="bg-[#06c755]"
          external
        />
        <SocialLink
          href={getWhatsAppLink(locale)}
          label={labels.whatsapp}
          icon={<WhatsAppIcon size={21} />}
          tone="bg-[#25d366]"
          external
        />
      </div>

      <button
        type="button"
        aria-label={isOpen ? labels.close : labels.open}
        aria-expanded={isOpen}
        aria-controls="floating-contact-panel"
        onClick={() => setIsOpen((open) => !open)}
        className={
          "group flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_14px_32px_rgba(26,26,46,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(26,26,46,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95 sm:h-16 sm:w-16 " +
          (isOpen ? "bg-[#ff4d5d]" : "border-2 border-accent bg-foreground")
        }
      >
        <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-current bg-[#35d07f]" />
        <span className="transition-transform duration-300 group-hover:scale-105">
          {isOpen ? <X size={25} strokeWidth={2.2} /> : <MessageCircle size={24} strokeWidth={2.2} />}
        </span>
      </button>
    </div>
  );
}
