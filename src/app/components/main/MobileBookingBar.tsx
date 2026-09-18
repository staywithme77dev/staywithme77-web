"use client";

import { CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type MobileBookingBarProps = {
  available: boolean;
};

export default function MobileBookingBar({
  available,
}: MobileBookingBarProps) {
  const t = useTranslations("Common");

  if (!available) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-[#eadfca] bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(26,26,46,0.1)] backdrop-blur-md md:hidden">
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-accent/35 px-5 py-3.5 text-sm font-bold text-foreground/60 shadow-[0_12px_30px_rgba(26,26,46,0.12)]"
      >
        <CalendarCheck size={18} />
        {t("bookingSoon")}
      </button>
    </div>
  );
}
