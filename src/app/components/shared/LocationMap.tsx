import Image from "next/image";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/app/lib/siteConfig";

type LocationMapProps = {
  address: string;
  mapTitle: string;
  openMapsLabel: string;
  rating?: number;
  reviewCount?: number;
  className?: string;
};

export default function LocationMap({ address, mapTitle, openMapsLabel, rating = 0, reviewCount = 0, className = "" }: LocationMapProps) {
  return (
    <div className={`group relative min-h-[360px] overflow-hidden border border-[#e8e3da] bg-[#f5f3ee] shadow-[0_18px_45px_rgba(30,27,20,0.08)] lg:min-h-[520px] ${className}`}>
      <iframe title={mapTitle} src={siteConfig.location.googleMapsEmbedUrl} className="pointer-events-none absolute inset-0 h-full w-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} aria-hidden="true" />
      <a href={siteConfig.location.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-accent" aria-label={`${openMapsLabel}: ${address}`}><span className="sr-only">{openMapsLabel}</span></a>
      <span className="pointer-events-none absolute inset-0 z-20 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#1b1b2f] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)] md:h-24 md:w-24 md:p-1.5">
          <Image src={siteConfig.assets.heroBackground} alt="" width={180} height={180} className="h-full w-full rounded-full object-cover object-center" />
        </span>
        <span className="mt-2 whitespace-nowrap bg-[#1b1b2f] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg sm:text-xs">{siteConfig.brand.displayName}</span>
        <span className="h-3 w-3 -translate-y-1 rotate-45 bg-[#1b1b2f]" />
      </span>
      <div className="pointer-events-none absolute left-2 top-2 z-30 w-max max-w-[calc(100%-1rem)] border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_12px_32px_rgba(25,25,35,0.18)] backdrop-blur-sm sm:left-5 sm:top-5 sm:w-[min(320px,calc(100%-2rem))] sm:p-5">
        <p className="text-[11px] font-bold text-foreground sm:text-sm">{siteConfig.brand.displayName}</p>
        <p className="mt-0.5 max-w-[230px] text-[9px] leading-3.5 text-slate-500 sm:mt-1 sm:max-w-none sm:text-xs sm:leading-5">{address}</p>
        <div className="mt-1 flex items-center gap-1 text-[9px] sm:mt-2 sm:gap-2 sm:text-xs">
          <strong className="text-foreground">{rating ? rating.toFixed(1) : "—"}</strong>
          <span className="sr-only">{rating ? `${rating.toFixed(1)} / 5` : "—"}</span>
          <span className="tracking-wide text-[#c9a84c]" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("")}</span>
          <span className="text-slate-400">({reviewCount})</span>
        </div>
        <span className="mt-1.5 inline-flex items-center gap-1 bg-[#1d73e8] px-2 py-1 text-[9px] font-bold text-white sm:mt-3 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"><MapPin size={14} aria-hidden="true" />{openMapsLabel}</span>
      </div>
      <span className="pointer-events-none absolute bottom-4 left-4 right-4 z-30 inline-flex items-center gap-2 bg-white/95 px-4 py-3 text-xs font-medium text-slate-700 shadow-lg backdrop-blur-sm md:right-auto md:w-max md:max-w-[calc(100%-2rem)]"><MapPin size={16} className="shrink-0 text-accent" aria-hidden="true" /><span className="md:whitespace-nowrap">{address}</span></span>
    </div>
  );
}
