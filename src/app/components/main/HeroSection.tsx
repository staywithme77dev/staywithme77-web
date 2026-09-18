"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  MapPin,
  Users,
  ChevronDown,
  Search,
  CircleCheck,
  Check,
} from "lucide-react";
import DateRangePicker from "@/app/components/ui/DateRangePicker";
import { trackEvent } from "@/app/components/analytics/events";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { getSiteText, siteConfig } from "@/app/lib/siteConfig";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const common = useTranslations("Common");
  const locale = useLocale();
  const features = t.raw("features") as string[];
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    const titles = t.raw("titles") as string[];
    let titleIndex = 0;
    let characterIndex = 0;
    let timeout: number;

    const typeNext = () => {
      const title = titles[titleIndex];
      characterIndex += 1;
      setTypedTitle(title.slice(0, characterIndex));
      if (characterIndex < title.length) {
        timeout = window.setTimeout(typeNext, 95);
      } else {
        timeout = window.setTimeout(() => {
          titleIndex = (titleIndex + 1) % titles.length;
          characterIndex = 0;
          typeNext();
        }, 5000);
      }
    };

    typeNext();
    return () => window.clearTimeout(timeout);
  }, [t]);

  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      setDateError(true);
      return;
    }

    setDateError(false);
    trackEvent("search_rooms", { guests });
    setIsSearching(true);
    const params = new URLSearchParams({ guests: String(guests) });
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    window.setTimeout(() => router.push(`/rooms?${params.toString()}`), 1800);
  };

  return (
    <section id="hero" className="relative min-h-[100svh] w-full">
      {/* Background */}
      <Image
        src={siteConfig.assets.heroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,20,0.62)_0%,rgba(8,8,20,0.72)_55%,rgba(8,8,20,0.55)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 pb-20 pt-[170px] md:pb-20 md:pt-[250px]">
        <div className="flex w-full max-w-[460px] flex-col items-center gap-5 md:max-w-[1180px] md:gap-7">
          {/* Headline */}
          <h1 className="w-full text-center text-[clamp(2.6rem,6vw,4rem)] font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-[clamp(4rem,6vw,6.5rem)]">
            {typedTitle}
            <span className="cursor-blink text-accent">|</span>
          </h1>

          {/* Feature Bullets */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/[0.11] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-4 md:max-w-[800px] xl:max-w-none xl:flex xl:items-center xl:justify-center xl:gap-7 xl:rounded-full xl:px-8 xl:py-3">
            <span
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              aria-hidden="true"
            />
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CircleCheck
                  aria-hidden="true"
                  size={17}
                  className="shrink-0 text-accent"
                />
                <p className="text-sm leading-snug text-white/90">{f}</p>
              </div>
            ))}
          </div>

          {/* Booking Card */}
          <div className="w-full overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.35),0_4px_16px_rgba(0,0,0,0.15)] md:grid md:grid-cols-2 md:max-w-[800px] xl:max-w-[1180px] xl:grid-cols-[220px_minmax(430px,1fr)_280px_190px] md:items-stretch">
            {/* Location row */}
            <div className="flex items-center gap-2.5 border-b border-gray-200 bg-[#f7f8fa] px-4 py-3 md:border-r xl:border-b-0">
              <MapPin aria-hidden="true" size={15} className="text-accent" />
              <span className="text-[#1a1a2e] flex-1 text-sm font-semibold">
                {getSiteText(siteConfig.brand.name, locale)}
              </span>
              <ChevronDown
                aria-hidden="true"
                size={14}
                className="text-[#b0b7c3]"
              />
            </div>

            <div className="p-3">
              <DateRangePicker
                embedded
                checkIn={checkIn}
                checkOut={checkOut}
                minDate={today}
                error={dateError}
                onChange={({ checkIn: nextIn, checkOut: nextOut }) => {
                  setCheckIn(nextIn);
                  setCheckOut(nextOut);
                  if (nextIn) trackEvent("select_checkin");
                  if (nextOut) trackEvent("select_checkout");
                  if (nextIn && nextOut) setDateError(false);
                }}
              />
              {dateError && (
                <p className="mt-1.5 px-1 text-xs font-medium text-red-600">
                  {t("dateError")}
                </p>
              )}
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 md:col-span-2 xl:col-span-1 xl:border-b-0 xl:border-l xl:border-r">
              <Users
                aria-hidden="true"
                size={19}
                className="shrink-0 text-accent"
              />
              <div className="flex-1">
                <p className="text-[11px] font-medium text-gray-400">
                  {t("guestCount")}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {common("guestCount", { count: guests })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-lg font-bold leading-none text-gray-700"
                  aria-label={t("decrease")}
                >
                  −
                </button>
                <span className="w-4 text-center text-sm font-bold text-foreground">
                  {guests}
                </span>
                <button
                  onClick={() => setGuests(Math.min(8, guests + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-lg font-bold leading-none text-gray-700"
                  aria-label={t("increase")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center p-3 md:col-span-2 xl:col-span-1">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                id="hero-search-btn"
                className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
              >
                <Search aria-hidden="true" size={15} className="text-accent" />
                {isSearching ? t("searching") : t("search")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isSearching && <SearchLoadingOverlay />}
    </section>
  );
}

function SearchLoadingOverlay() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const [activeStep, setActiveStep] = useState(0);
  const steps = t.raw("loadingSteps") as string[];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, steps.length - 1));
    }, 420);
    return () => window.clearInterval(timer);
  }, [steps.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-y-auto bg-[#fffdfa] px-5 py-10 text-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,760px)] w-[min(90vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(64vw,540px)] w-[min(64vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.1]"
      />

      <div className="relative w-full max-w-[430px] text-center">
        <div className="mb-8 flex justify-center sm:mb-10">
          <Image
            src={siteConfig.assets.logoGold}
            alt={getSiteText(siteConfig.brand.name, locale)}
            width={190}
            height={80}
            className="h-auto w-[170px] object-contain sm:w-[190px]"
          />
        </div>

        <div className="relative mx-auto mb-8 flex h-[78px] w-[78px] items-center justify-center sm:mb-9">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-[3px] border-[#f1e4bd] border-t-[#c9a84c] animate-spin"
          />
          <span
            aria-hidden="true"
            className="h-[58px] w-[58px] rounded-full bg-[#fbf4df] shadow-[inset_0_0_0_1px_rgba(201,168,76,0.04)]"
          />
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight text-[#1a1a2e] sm:text-[28px]">
          {t("loadingTitle")}
        </h2>
        <p className="mt-2 font-sarabun text-base text-slate-400 sm:text-lg">
          {t("loadingSubtitle")}
        </p>

        <div className="mx-auto mt-8 max-w-[360px] text-left sm:mt-9">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-3 py-2.5 font-display text-sm transition-all duration-300 sm:text-[15px] ${
                index === activeStep
                  ? "font-semibold text-slate-700"
                  : index < activeStep
                    ? "text-slate-500"
                    : "text-slate-300"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  index < activeStep
                    ? "border-[#c9a84c] bg-[#c9a84c] text-white"
                    : index === activeStep
                      ? "border-[#c9a84c] bg-[#c9a84c] text-white"
                      : "border-slate-300 bg-white"
                }`}
              >
                {index <= activeStep && (
                  <Check aria-hidden="true" size={13} strokeWidth={3} />
                )}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-7 h-1 max-w-[360px] overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#c9a84c] transition-all duration-500"
            style={{
              width: `${Math.max(18, ((activeStep + 1) / steps.length) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
