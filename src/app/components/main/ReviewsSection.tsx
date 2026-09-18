import SectionHeader from "@/app/components/ui/SectionHeader";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/app/lib/siteConfig";
import { getReviews } from "@/app/lib/reviews";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < count ? "currentColor" : "none"}
          className={`text-amber-500 ${i < count ? "" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm ring-1 ring-slate-200 ${className}`}
    >
      <Image
        src="/logo/icon_Google.webp"
        alt="Google"
        width={18}
        height={18}
        className="h-4 w-4 object-contain sm:h-5 sm:w-5"
      />
    </span>
  );
}

function SourceMark({
  source,
  className = "",
}: {
  source: string;
  className?: string;
}) {
  if (source.toLowerCase() === "google")
    return <GoogleMark className={className} />;
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 shadow-sm ring-1 ring-slate-200 ${className}`}
    >
      {source.charAt(0).toUpperCase()}
    </span>
  );
}

function ReviewAvatar({ name }: { name: string }) {
  const initials = name
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#26324b] to-[#c9a84c] text-[10px] font-bold text-white ring-2 ring-white sm:h-11 sm:w-11 sm:text-xs">
      {initials || "G"}
    </span>
  );
}

export default async function ReviewsSection() {
  const t = await getTranslations("Reviews");
  const locale = await getLocale();
  const reviewData = await getReviews(locale);
  const localizedReviews = reviewData.reviews.slice(0, 6);
  const rating = reviewData.rating;
  const reviewCount = reviewData.reviewCount;
  return (
    <section
      id="reviews"
      className="bg-white px-3 py-14 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            title={t("title")}
            align="center"
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[#faf9f6] p-4 sm:mt-10 sm:rounded-none sm:border-x-0 sm:border-y sm:bg-transparent sm:p-0 sm:py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {rating ? rating.toFixed(1) : "—"}
            </p>
            <div>
              <StarRow count={rating} />
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {t("reviewCount", { count: reviewCount })}
              </p>
            </div>
            <span className="hidden h-8 w-px bg-slate-200 sm:block" />
            <span className="hidden text-sm text-slate-500 sm:block">
              {t("verified")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
            <Link
              href="/reviews"
              className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-2.5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-foreground hover:bg-slate-50 sm:gap-2 sm:rounded-lg sm:px-4 sm:text-sm"
            >
              <GoogleMark className="h-6 w-6 text-xs sm:h-8 sm:w-8 sm:text-sm" />
              {t("viewAll")}
              <ExternalLink
                className="hidden sm:block"
                size={14}
                aria-hidden="true"
              />
            </Link>
            <a
              href={siteConfig.reviews.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-2.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#292941] sm:rounded-lg sm:px-4 sm:text-sm"
            >
              {t("writeReview")}
            </a>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4 lg:grid-cols-3">
          {localizedReviews.map((r) => (
            <div
              key={r.id}
              className="flex min-h-[292px] flex-col rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-[0_3px_14px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:min-h-[235px] sm:rounded-xl sm:p-5 sm:shadow-none"
            >
              <div className="flex items-start gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <ReviewAvatar name={r.name} />
                  <div className="min-w-0">
                    <p className="break-words text-[12px] font-semibold leading-snug text-foreground sm:text-sm">
                      {r.name}
                    </p>
                    <p className="mt-1 break-words text-[10px] leading-snug text-slate-500 sm:block sm:text-xs">
                      {t("reviewedAt", { date: r.date })}
                    </p>
                  </div>
                </div>
                <SourceMark source={r.source} className="hidden sm:flex" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 sm:mt-5 sm:justify-start sm:gap-x-3">
                <StarRow count={r.rating} />
              </div>
              <p className="mt-3 line-clamp-7 flex-1 text-[12px] leading-[1.7] text-slate-600 sm:line-clamp-6 sm:text-sm sm:leading-relaxed">
                {r.text}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 sm:mt-4">
                <span className="flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-slate-400 sm:text-xs">
                  <SourceMark
                    source={r.source}
                    className="!h-5 !w-5 text-[10px] sm:!h-6 sm:!w-6 sm:text-xs"
                  />
                  <span className="truncate">
                    {t("reviewedFrom", { source: r.source })}
                  </span>
                </span>
                <span
                  className="text-xs tracking-[0.2em] text-slate-300"
                  aria-hidden="true"
                >
                  •••
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

