import type { ReactNode } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import LocationMap from "@/app/components/shared/LocationMap";
import { siteConfig } from "@/app/lib/siteConfig";

type LocationDetail = { label: string; value: string; icon: ReactNode };
type SecondaryAction = { href: string; label: string; icon: ReactNode };

type LocationContactPanelProps = {
  address: string;
  addressLabel: string;
  mapTitle: string;
  openMapsLabel: string;
  details?: LocationDetail[];
  secondaryAction?: SecondaryAction;
  rating?: number;
  reviewCount?: number;
  mapClassName?: string;
};

export default function LocationContactPanel({
  address,
  addressLabel,
  mapTitle,
  openMapsLabel,
  details = [],
  secondaryAction,
  rating,
  reviewCount,
  mapClassName = "",
}: LocationContactPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <LocationMap
        address={address}
        mapTitle={mapTitle}
        openMapsLabel={openMapsLabel}
        rating={rating}
        reviewCount={reviewCount}
        className={mapClassName}
      />
      <aside className="flex flex-col border border-[#cfc7b9] bg-white p-6 sm:p-8" aria-label={addressLabel}>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{addressLabel}</h3>
        <div className="mt-5 flex items-start gap-3">
          <MapPin size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <p className="font-sarabun text-base font-semibold leading-7">{address}</p>
        </div>
        {details.length > 0 ? (
          <>
            <div className="my-7 border-t border-[#e5e0d7]" />
            <dl className="grid gap-5 pb-6">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-accent" aria-hidden="true">{detail.icon}</span>
                  <div><dt className="text-xs text-slate-500">{detail.label}</dt><dd className="mt-1 text-sm font-bold">{detail.value}</dd></div>
                </div>
              ))}
            </dl>
          </>
        ) : null}
        <div className="mt-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a href={siteConfig.location.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-foreground bg-foreground px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2b2b42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <ExternalLink size={16} aria-hidden="true" />{openMapsLabel}
          </a>
          {secondaryAction ? (
            <a href={secondaryAction.href} className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#cfc7b9] bg-white px-4 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <span aria-hidden="true">{secondaryAction.icon}</span>{secondaryAction.label}
            </a>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
