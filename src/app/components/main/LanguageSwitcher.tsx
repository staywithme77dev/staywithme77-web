"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Check, ChevronDown, Languages, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export default function LanguageSwitcher({
  compact = false,
  iconOnly = false,
}: {
  compact?: boolean;
  iconOnly?: boolean;
}) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Language");
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<AppLocale | null>(null);
  const [isPending, startTransition] = useTransition();
  const selectedLocale = isPending && pendingLocale ? pendingLocale : locale;

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node))
        setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const changeLocale = (nextLocale: AppLocale) => {
    if (nextLocale === selectedLocale || isPending) return;
    setIsOpen(false);
    setPendingLocale(nextLocale);
    startTransition(() => {
      const suffix = `${window.location.search}${window.location.hash}`;
      router.replace(`${pathname}${suffix}`, {
        locale: nextLocale,
        scroll: false,
      });
    });
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        disabled={isPending}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={
          iconOnly
            ? "flex h-10 w-10 items-center justify-center rounded-full border border-current/15 bg-current/[0.06] text-xs font-bold shadow-sm backdrop-blur-md transition-all hover:border-current/25 hover:bg-current/[0.1] focus-visible:outline-none uppercase"
            : `inline-flex items-center justify-between gap-2 rounded-full border border-current/15 bg-current/[0.06] px-3 text-xs font-bold shadow-sm backdrop-blur-md transition-all hover:border-current/25 hover:bg-current/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-wait ${compact ? "h-9 min-w-15" : "h-10 min-w-20"}`
        }
      >
        {iconOnly ? (
          isPending ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <span>{selectedLocale}</span>
          )
        ) : (
          <>
            <span className="flex min-w-0 items-center gap-2">
              {isPending ? (
                <LoaderCircle size={15} className="shrink-0 animate-spin" />
              ) : (
                <Languages size={15} className="shrink-0 opacity-75" />
              )}
              <span className="truncate">{t(`names.${selectedLocale}`)}</span>
            </span>
            <ChevronDown
              size={14}
              className={`shrink-0 opacity-55 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t("label")}
          className="absolute left-0 lg:left-auto lg:right-0 top-full z-[100] mt-2 min-w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.2)]"
        >
          {routing.locales.map((item) => {
            const isSelected = item === selectedLocale;
            return (
              <button
                key={item}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => changeLocale(item)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${isSelected ? "bg-amber-50 font-bold text-slate-950" : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
              >
                <span
                  className={`flex h-7 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${isSelected ? "bg-accent text-slate-950" : "bg-slate-100 text-slate-500"}`}
                >
                  {item}
                </span>
                <span className="flex-1">{t(`names.${item}`)}</span>
                {isSelected && (
                  <Check
                    size={15}
                    className="shrink-0 text-amber-600"
                    strokeWidth={3}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// STANDALONE VERSION (For pages outside of next-intl context like /links)
// -----------------------------------------------------------------------------

export const STANDALONE_LANGUAGES = [
  { code: "th", name: "ภาษาไทย" },
  { code: "en", name: "English" },
] as const;

export type StandaloneLangCode = typeof STANDALONE_LANGUAGES[number]["code"];

interface StandaloneLanguageSwitcherProps {
  lang: StandaloneLangCode;
  onChange: (lang: StandaloneLangCode) => void;
}

export function StandaloneLanguageSwitcher({
  lang,
  onChange,
}: StandaloneLanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/20 text-white hover:bg-white/20 transition-colors text-xs font-bold uppercase tracking-wider"
        aria-expanded={isOpen}
      >
        <Languages className="w-4 h-4" />
        {lang}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-44 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 backdrop-blur-2xl p-1.5 text-white shadow-2xl z-50">
          {STANDALONE_LANGUAGES.map((item) => {
            const isSelected = item.code === lang;
            return (
              <button
                key={item.code}
                onClick={() => {
                  onChange(item.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  isSelected 
                    ? "bg-white/10 font-bold text-white" 
                    : "font-medium text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`flex h-7 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                  isSelected ? "bg-accent text-white" : "bg-white/10 text-white/50"
                }`}>
                  {item.code}
                </span>
                <span className="flex-1">{item.name}</span>
                {isSelected && <Check size={15} className="shrink-0 text-accent" strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
