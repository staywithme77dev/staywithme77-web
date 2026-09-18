"use client";

import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { SocialLink } from "@/app/types/socialLink";
import type { AppLocale } from "@/i18n/routing";

type BookingPlatformLinksProps = { links: SocialLink[]; lang: AppLocale; heading: ReactNode; description: string };

export default function BookingPlatformLinks({ links, lang, heading, description }: BookingPlatformLinksProps) {
  return <section className="mt-4 w-full" aria-labelledby="booking-platforms-heading">
    <div className="mb-3 border-b border-white/15 pb-2 text-left">
      <h2 id="booking-platforms-heading" className="flex items-center gap-2 text-base font-bold text-white sm:text-lg">{heading}</h2>
      <p className="mt-1 text-[11px] text-white/60">{description}</p>
    </div>
    <div className="flex flex-wrap justify-center gap-4">
      {links.map((link) => {
        const content = <><div className="flex h-20 w-20 shrink-0 items-center justify-center text-accent">{link.icon}</div><div className="mt-3 min-w-0 text-center"><p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{link.label[lang]}</p></div><ChevronRight className="absolute right-2 top-2 h-4 w-4 text-white/45" aria-hidden="true" /></>;
        const className = "relative flex aspect-square w-[calc(33.333%-0.667rem)] max-w-[180px] flex-col items-center justify-center rounded-2xl border p-3 text-center " + (link.href ? "border-white/20 bg-white/5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1b2f]" : "cursor-not-allowed border-white/15 bg-white/5 opacity-45");
        return link.href ? <a key={link.id} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className={className}>{content}</a> : <div key={link.id} aria-disabled="true" className={className}>{content}</div>;
      })}
    </div>
  </section>;
}


