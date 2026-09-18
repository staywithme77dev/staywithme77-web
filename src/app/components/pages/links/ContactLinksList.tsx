"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { SocialLink } from "@/app/types/socialLink";
import type { AppLocale } from "@/i18n/routing";

type ContactLinksListProps = { links: SocialLink[]; lang: AppLocale; backHome: string };

export default function ContactLinksList({ links, lang, backHome }: ContactLinksListProps) {
  return <div className="grid grid-cols-1 gap-3">
    {links.map((link) => {
      const content = <><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-md sm:h-11 sm:w-11 ${link.isPrimary ? "border-white bg-white text-accent" : "border-white/30 bg-white/20 text-white"}`}>{link.icon}</div><div className="ml-3 min-w-0 flex-1"><div className={`truncate text-sm font-semibold tracking-tight sm:text-base ${link.isPrimary ? "text-white" : "text-white/95"}`}>{link.label[lang]}</div><div className={(link.multiline ? "min-h-[2.25rem] line-clamp-2" : "truncate") + " mt-0.5 text-xs leading-snug text-white/70"}>{typeof link.sublabel === "string" ? link.sublabel : link.sublabel[lang]}</div></div><div className="flex h-8 w-8 shrink-0 items-center justify-center text-white/50 transition-transform group-hover:translate-x-1"><ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /></div></>;
      if (link.id === "map") return <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-3.5">{content}</a>;
      return <a key={link.id} href={link.href} target={link.href?.startsWith("http") ? "_blank" : undefined} rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined} className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-3.5">{content}</a>;
    })}
    <Link href={`/${lang}`} className="group mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 p-3.5 text-white shadow-lg backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><span className="text-xs font-semibold tracking-wide sm:text-sm">{backHome}</span></Link>
  </div>;
}

