"use client";

import { ExternalLink, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Review, ReviewSource } from "@/app/lib/reviews";

type Copy = {
  all: string;
  google: string;
  airbnb: string;
  facebook: string;
  manual: string;
  live: string;
  mock: string;
  noReviews: string;
  readOnGoogle: string;
  writeReview: string;
  reviewsCount: string;
  ratingLabel: string;
  previous: string;
  next: string;
};

const sources: Array<"google" | "airbnb" | "facebook" | "manual" | "all"> = ["all", "google", "airbnb", "facebook", "manual"];
const pageSize = 12;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#c9a84c]" aria-label={String(rating) + " out of 5"}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={15} fill={index < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

function SourceBadge({ source, label }: { source: ReviewSource; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#e9dfca] bg-[#fbf8f1] px-3 py-1 text-[11px] font-semibold text-[#625a4c]">
      {source === "google" ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
          <Image src="/logo/icon_Google.webp" alt="" width={13} height={13} className="h-3.5 w-3.5 object-contain" />
        </span>
      ) : (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1b2f] text-[9px] font-bold text-white">
          {source === "airbnb" ? "A" : source === "facebook" ? "f" : "S"}
        </span>
      )}
      {label}
    </span>
  );
}

function ReviewCard({ review, label }: { review: Review; label: string }) {
  const initials = review.name
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article className="flex h-fit min-h-0 self-start flex-col rounded-2xl border border-[#e8e0d2] bg-white p-3 shadow-[0_10px_28px_rgba(43,36,24,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(43,36,24,0.1)] sm:min-h-[250px] sm:rounded-[1.5rem] sm:p-6">
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#25253d] to-[#c9a84c] text-[10px] font-bold text-white sm:h-11 sm:w-11 sm:text-xs">{initials || "G"}</span>
          <div>
            <p className="text-sm font-bold text-[#1b1b2f]">{review.name}</p>
            <p className="mt-1 text-xs text-slate-500">{review.date}</p>
          </div>
        </div>
        <Quote size={18} className="shrink-0 text-[#d8c38b] sm:hidden" aria-hidden="true" />
        <Quote size={22} className="hidden text-[#d8c38b] sm:block" aria-hidden="true" />
      </div>
      <div className="mt-3 sm:mt-5"><Stars rating={review.rating} /></div>
      <p className="mt-3 flex-1 text-[11px] leading-6 text-slate-600 sm:mt-4 sm:text-sm sm:leading-7">{review.text}</p>
      <div className="mt-4 border-t border-[#f0eadf] pt-3 sm:mt-5 sm:pt-4"><SourceBadge source={review.source} label={label} /></div>
    </article>
  );
}

export default function ReviewsDirectory({
  reviews,
  copy,
  googleProfileUrl,
  googleRating,
  googleReviewCount,
  isGoogleLive,
}: {
  reviews: Review[];
  copy: Copy;
  googleProfileUrl: string;
  googleRating: number;
  googleReviewCount: number;
  isGoogleLive: boolean;
}) {
  const [activeSource, setActiveSource] = useState<(typeof sources)[number]>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const labels = { google: copy.google, airbnb: copy.airbnb, facebook: copy.facebook, manual: copy.manual };
  const counts = useMemo(
    () => Object.fromEntries(sources.map((source) => [source, source === "all" ? reviews.length : reviews.filter((review) => review.source === source).length])),
    [reviews],
  );
  const visibleReviews = activeSource === "all" ? reviews : reviews.filter((review) => review.source === activeSource);
  const pageCount = Math.max(1, Math.ceil(visibleReviews.length / pageSize));
  const pagedReviews = visibleReviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <section className="border-y border-[#e5dccb] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div className="flex items-center gap-5">
            <div>
              <p className="text-5xl font-bold tracking-tight text-[#1b1b2f]">{googleRating ? googleRating.toFixed(1) : "—"}</p>
              <Stars rating={googleRating} />
            </div>
            <div className="border-l border-[#e7dfd2] pl-5">
              <p className="text-sm font-semibold text-[#1b1b2f]">{copy.ratingLabel}</p>
              <p className="mt-1 text-xs text-slate-500">{copy.reviewsCount.replace("{count}", String(googleReviewCount || counts.google))}</p>
              <span className="mt-3 inline-flex rounded-full bg-[#f5ead0] px-2.5 py-1 text-[10px] font-bold text-[#806821]">{isGoogleLive ? copy.live : copy.mock}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#1b1b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 px-5 py-3 text-sm font-semibold text-[#1b1b2f] transition-colors hover:bg-[#1b1b2f] hover:text-white">{copy.readOnGoogle} <ExternalLink size={15} aria-hidden="true" /></a>
            <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c9a84c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1b2f] focus-visible:ring-offset-2 px-5 py-3 text-sm font-bold text-[#1b1b2f] transition-colors hover:bg-[#e8c97a]">{copy.writeReview}</a>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div role="tablist" aria-label="Review sources" className="flex gap-2 overflow-x-auto border-b border-[#ded5c5] pb-3">
            {sources.map((source, index) => {
              const label = source === "all" ? copy.all : labels[source];
              const active = activeSource === source;

              const activateTab = () => {
                setActiveSource(source);
                setCurrentPage(1);
              };

              return (
                <button
                  key={source}
                  id={`review-tab-${source}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="reviews-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={activateTab}
                  onKeyDown={(event) => {
                    let nextIndex = index;
                    if (event.key === "ArrowRight") nextIndex = (index + 1) % sources.length;
                    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + sources.length) % sources.length;
                    else if (event.key === "Home") nextIndex = 0;
                    else if (event.key === "End") nextIndex = sources.length - 1;
                    else return;

                    event.preventDefault();
                    const nextSource = sources[nextIndex];
                    setActiveSource(nextSource);
                    setCurrentPage(1);
                    event.currentTarget.parentElement
                      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                      [nextIndex]?.focus();
                  }}
                  className={
                    (active
                      ? "bg-[#1b1b2f] text-white shadow-md"
                      : "text-slate-500 hover:bg-[#f4eee3] hover:text-[#1b1b2f]") +
                    " shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2"
                  }
                >
                  {label} <span className="ml-1 opacity-60">{counts[source]}</span>
                </button>
              );
            })}
          </div>
          {pagedReviews.length ? <div id="reviews-panel" role="tabpanel" aria-labelledby={`review-tab-${activeSource}`} tabIndex={0} className="mt-8 grid grid-cols-2 items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] sm:gap-4 lg:grid-cols-3">{pagedReviews.map((review) => <ReviewCard key={review.id} review={review} label={labels[review.source]} />)}</div> : <div id="reviews-panel" role="tabpanel" aria-labelledby={`review-tab-${activeSource}`} tabIndex={0} className="mt-8 rounded-3xl border border-dashed border-[#d9ccb5] bg-[#fbf8f1] px-6 py-16 text-center text-sm text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]">{copy.noReviews}</div>}
          {pageCount > 1 ? (
            <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Review pages">
              <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="rounded-full border border-[#d9ccb5] px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] text-sm font-semibold text-[#625a4c] transition-colors hover:bg-[#f4eee3] disabled:cursor-not-allowed disabled:opacity-40">{copy.previous}</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <button key={page} type="button" onClick={() => setCurrentPage(page)} aria-current={currentPage === page ? "page" : undefined} className={currentPage === page ? "h-10 w-10 rounded-full bg-[#c9a84c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b1b2f] text-sm font-bold text-[#1b1b2f]" : "h-10 w-10 rounded-full border border-[#d9ccb5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] text-sm font-semibold text-[#625a4c] transition-colors hover:bg-[#f4eee3]"}>{page}</button>
              ))}
              <button type="button" onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} disabled={currentPage === pageCount} className="rounded-full border border-[#d9ccb5] px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] text-sm font-semibold text-[#625a4c] transition-colors hover:bg-[#f4eee3] disabled:cursor-not-allowed disabled:opacity-40">{copy.next}</button>
            </nav>
          ) : null}
        </div>
      </section>
    </div>
  );
}

