"use client";

import { Settings } from "lucide-react";
import { openCookieSettings } from "@/app/components/privacy/CookieConsent";
import { useTranslations } from "next-intl";

export default function CookieSettingsButton() {
  const t = useTranslations("Cookie");
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="inline-flex items-baseline transition-colors hover:text-accent"
    >
      <Settings size={14} className="mr-1.5 self-center" />
      <span>{t("manage")}</span>
    </button>
  );
}
