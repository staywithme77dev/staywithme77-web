/* eslint-disable react-hooks/refs */
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Tag,
  BedDouble,
  CalendarCheck,
  Share2,
} from "lucide-react";
import { siteConfig } from "@/app/lib/siteConfig";
import Link from "next/link";
import {
  StandaloneLanguageSwitcher,
  StandaloneLangCode,
} from "@/app/components/main/LanguageSwitcher";
import type { SocialLink } from "@/app/types/socialLink";
import { mockRooms } from "@/app/lib/mockDb";
import LocationMap from "@/app/components/shared/LocationMap";
import BookingPlatformLinks from "@/app/components/pages/links/BookingPlatformLinks";
import ContactLinksList from "@/app/components/pages/links/ContactLinksList";
import { getContactLinks } from "@/app/lib/contactLinks";

import linksMessages from "@/../messages/pages/links.json";

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(false);

  const setRailRef = (node: HTMLDivElement | null) => {
    ref.current = node;
  };

  return {
    setRailRef,
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const rail = event.currentTarget;
      dragging.current = true;
      moved.current = false;
      startX.current = event.clientX;
      startScrollLeft.current = rail.scrollLeft;
      rail.style.cursor = "grabbing";
    },
    onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => {
      if (!dragging.current || !ref.current) return;
      const distance = event.clientX - startX.current;
      if (Math.abs(distance) > 4) moved.current = true;
      ref.current.scrollLeft = startScrollLeft.current - distance;
    },
    onMouseUp: (event: React.MouseEvent<HTMLDivElement>) => {
      dragging.current = false;
      event.currentTarget.style.cursor = "grab";
    },
    onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => {
      dragging.current = false;
      event.currentTarget.style.cursor = "grab";
    },
    onClick: (event: React.MouseEvent<HTMLDivElement>) => {
      if (moved.current) {
        event.preventDefault();
        event.stopPropagation();
        moved.current = false;
      }
    },
  };
}
export default function LinksPage() {
  const [lang, setLang] = useState<StandaloneLangCode>("th");
  const [shareSupported, setShareSupported] = useState(false);
  const [mounted, setMounted] = useState(false);
  const copy = linksMessages[lang].LinksPage;
  const roomsRail = useDragScroll();
  const promotionsRail = useDragScroll();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setShareSupported("share" in navigator);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: siteConfig.brand.displayName,
        text: siteConfig.brand.tagline[lang],
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing", error);
    }
  };

  const links: SocialLink[] = [
    {
      id: "airbnb",
      label: {
        th: linksMessages.th.LinksPage.airbnb,
        en: linksMessages.en.LinksPage.airbnb,
      },
      sublabel: {
        th: linksMessages.th.LinksPage.bookingPlatformsDescription,
        en: linksMessages.en.LinksPage.bookingPlatformsDescription,
      },
      href: siteConfig.bookingLinks.airbnb || undefined,
      icon: (
        <Image
          src={siteConfig.assets.agencyLogos.airbnb}
          alt="Airbnb"
          width={96}
          height={96}
          sizes="80px"
          className="h-20 w-20 object-contain"
        />
      ),
      isBookingPlatform: true,
    },
    {
      id: "agoda",
      label: {
        th: linksMessages.th.LinksPage.agoda,
        en: linksMessages.en.LinksPage.agoda,
      },
      sublabel: {
        th: linksMessages.th.LinksPage.bookingPlatformsDescription,
        en: linksMessages.en.LinksPage.bookingPlatformsDescription,
      },
      href: siteConfig.bookingLinks.agoda || undefined,
      icon: (
        <Image
          src={siteConfig.assets.agencyLogos.agoda}
          alt="Agoda"
          width={96}
          height={96}
          sizes="80px"
          className="h-20 w-20 object-contain"
        />
      ),
      isBookingPlatform: true,
    },
    {
      id: "traveloka",
      label: {
        th: linksMessages.th.LinksPage.traveloka,
        en: linksMessages.en.LinksPage.traveloka,
      },
      sublabel: {
        th: linksMessages.th.LinksPage.bookingPlatformsDescription,
        en: linksMessages.en.LinksPage.bookingPlatformsDescription,
      },
      href: siteConfig.bookingLinks.traveloka || undefined,
      icon: (
        <Image
          src={siteConfig.assets.agencyLogos.traveloka}
          alt="Traveloka"
          width={96}
          height={96}
          sizes="80px"
          className="h-20 w-20 object-contain"
        />
      ),
      isBookingPlatform: true,
    },
  ];

  const bookingPlatformLinks = links.filter(
    (link) => link.isPrimary || link.isBookingPlatform,
  );
  const contactLinks = getContactLinks();

  return (
    <main id="main-content" tabIndex={-1} className="min-h-[100dvh] relative flex flex-col items-center py-5 px-4 sm:px-6 font-sans overflow-hidden">
      {/* Background Image & Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.assets.heroBackground}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"></div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col">
        {/* Top Actions: Language & Share */}
        <div
          className={`flex justify-end gap-2 absolute top-0 right-0 w-full z-30 opacity-0 ${mounted ? "animate-fade-in-up" : ""}`}
        >
          <StandaloneLanguageSwitcher lang={lang} onChange={setLang} />

          {shareSupported && (
            <button
              onClick={handleShare}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label={copy.share}
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Profile Section */}
        <div
          className={`flex flex-col items-center mb-5 relative pt-14 opacity-0 z-10 ${mounted ? "animate-fade-in-up" : ""}`}
        >
          <div className="relative mb-5 group">
            <div className="w-28 h-28 md:w-40 md:h-28 flex items-center justify-center relative">
              <Image
                src={siteConfig.assets.logoGold}
                alt={siteConfig.brand.displayName}
                fill
                sizes="(min-width: 768px) 160px, 112px"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-1 md:mb-3 tracking-tight drop-shadow-md">
            {siteConfig.brand.displayName}
          </h1>

          <div className="inline-flex w-full max-w-2xl items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center shadow-lg backdrop-blur-md">
            <span className="break-words text-sm md:text-lg font-medium leading-relaxed text-white/90 drop-shadow-sm">
              {siteConfig.brand.tagline[lang]}
            </span>
          </div>
        </div>

        {/* Horizontal room carousel */}
        <section
          className={`mt-5 w-full opacity-0 ${mounted ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "80ms", animationFillMode: "both" }}
          aria-labelledby="links-rooms-heading"
        >
          <div className="mb-3 flex items-end justify-between gap-3 px-1">
            <div>
              <p
                id="links-rooms-heading"
                className="flex items-center gap-2 text-base font-bold text-white sm:text-lg"
              >
                <BedDouble size={16} className="text-accent" aria-hidden="true" />
                {copy.roomsHeading}
              </p>
              <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs">
                {copy.roomsHint}
              </p>
            </div>
            <Link
              href={`/${lang}/rooms`}
              className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-accent transition-colors hover:text-white sm:text-xs"
            >
              {copy.rooms}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div
            className="flex snap-x snap-proximity gap-0 overflow-x-auto scroll-smooth overscroll-contain touch-pan-x pb-2 cursor-grab select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={roomsRail.setRailRef}
            onMouseDown={roomsRail.onMouseDown}
            onMouseMove={roomsRail.onMouseMove}
            onMouseUp={roomsRail.onMouseUp}
            onMouseLeave={roomsRail.onMouseLeave}
            onClick={roomsRail.onClick}
          >
            {mockRooms.map((room, index) => (
              <Link
                key={room.id}
                href={`/${lang}/rooms/${room.slug}`}
                className="group w-[min(48vw,190px)] shrink-0 snap-start sm:w-[230px] md:w-[270px]"
              >
                <div className="relative aspect-square overflow-hidden border-r border-white/20 bg-white/10 sm:aspect-[2/1]">
                  <Image
                    src={room.image}
                    alt={lang === "th" ? room.name : room.nameEn}
                    fill
                    sizes="(max-width: 640px) 48vw, 270px"
                    loading={index < 2 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Promotions carousel */}
        <section
          className={`mt-4 w-full opacity-0 ${mounted ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
          aria-labelledby="links-promotions-heading"
        >
          <div className="mb-3 flex items-end justify-between gap-3 px-1">
            <div>
              <p
                id="links-promotions-heading"
                className="flex items-center gap-2 text-base font-bold text-white sm:text-lg"
              >
                <Tag size={16} className="text-accent" aria-hidden="true" />
                {copy.promotionsHeading}
              </p>
              <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs">
                {copy.promotionsHint}
              </p>
            </div>
          </div>
          <div
            className="flex snap-x snap-proximity gap-0 overflow-x-auto scroll-smooth overscroll-contain touch-pan-x pb-2 cursor-grab select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={promotionsRail.setRailRef}
            onMouseDown={promotionsRail.onMouseDown}
            onMouseMove={promotionsRail.onMouseMove}
            onMouseUp={promotionsRail.onMouseUp}
            onMouseLeave={promotionsRail.onMouseLeave}
            onClick={promotionsRail.onClick}
          >
            {copy.promotionItems.map((promotion, index) => {
              const room = mockRooms[index % mockRooms.length];

              return (
              <Link
                key={promotion.title}
                href={`/${lang}/rooms`}
                className="group w-[min(48vw,190px)] shrink-0 snap-start sm:w-[230px] md:w-[270px]"
              >
                <div className="relative aspect-square overflow-hidden border-r border-white/20 bg-white/10 sm:aspect-[2/1]">
                  <Image
                    src={room.image}
                    alt={promotion.title}
                    fill
                    sizes="(max-width: 640px) 48vw, 270px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101020]/90 via-[#101020]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <span className="inline-flex rounded-full bg-accent px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-foreground">
                      {promotion.badge}
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-white">
                      {promotion.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/70">
                      {promotion.description}
                    </p>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>

        <BookingPlatformLinks
          links={bookingPlatformLinks}
          lang={lang}
          heading={<><CalendarCheck size={16} className="text-accent" aria-hidden="true" />{copy.bookingPlatforms}</>}
          description={copy.bookingPlatformsDescription}
        />


        {/* location && contact */}
        <section
          className={`mt-4 w-full opacity-0 ${mounted ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
          aria-label="Location and contact links"
        >
          <div className="md:mt-2 grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.2fr)]">
            <LocationMap
              address={siteConfig.location.name[lang]}
              mapTitle={copy.map}
              openMapsLabel={copy.map}
              className={
                "hidden md:block rounded-2xl " +
                (mounted ? "animate-fade-in-up" : "")
              }
            />

            <div className={"z-10 opacity-0 " + (mounted ? "animate-fade-in-up" : "")}>
              <ContactLinksList links={contactLinks} lang={lang} backHome={copy.backHome} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div
          className={`mt-auto pt-10 text-center opacity-0 z-10 ${mounted ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "300ms", animationFillMode: "both" }}
        >
          <div className="border-t border-white/10">
            <div className="container mx-auto px-4 py-5">
              <div className="text-white/40 text-[10px] sm:text-xs font-medium tracking-wide">
                © {new Date().getFullYear()} {siteConfig.brand.displayName}. All
                rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

















