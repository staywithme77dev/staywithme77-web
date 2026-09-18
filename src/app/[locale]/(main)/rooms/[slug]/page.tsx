import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound, permanentRedirect } from "next/navigation";
import {
  BedDouble,
  Building2,
  CheckCircle2,
  Maximize2,
  Refrigerator,
  ShowerHead,
  Snowflake,
  Sofa,
  Sparkles,
  Tv,
  UsersRound,
  Wifi,
} from "lucide-react";
import {
  getMockRoomById,
  getMockRoomBySlug,
  mockRooms,
} from "@/app/lib/mockDb";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import RoomGallery from "@/app/components/ui/RoomGallery";
import JsonLd from "@/app/components/seo/JsonLd";
import RoomViewTracker from "@/app/components/analytics/RoomViewTracker";
import MobileBookingBar from "@/app/components/main/MobileBookingBar";
import { localizedAlternates, localizedPath } from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";
import { getTranslations } from "next-intl/server";

type Params = { slug: string; locale: string };

const amenityIcons = {
  wifi: Wifi,
  ac: Snowflake,
  tv: Tv,
  fridge: Refrigerator,
  shower: ShowerHead,
  city: Building2,
  sofa: Sofa,
} as const;

export async function generateStaticParams() {
  return mockRooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "RoomDetail" });
  const room = getMockRoomBySlug(slug) ?? getMockRoomById(slug);
  if (!room) return { title: t("notFound") };

  const roomName = locale === "en" ? room.nameEn : room.name;
  const description = locale === "en" ? room.descriptionEn : room.description;
  return {
    title: roomName,
    description,
    alternates: localizedAlternates(locale, `/rooms/${room.slug}`),
    openGraph: {
      title: `${roomName} | ${siteConfig.brand.displayName}`,
      description,
      type: "website",
      url: localizedPath(locale, `/rooms/${room.slug}`),
      images: room.images.map((image) => ({ url: image.url, alt: roomName })),
    },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations("RoomDetail");
  const room = getMockRoomBySlug(slug);
  const legacyRoom = room ? undefined : getMockRoomById(slug);
  if (legacyRoom) {
    permanentRedirect(localizedPath(locale, `/rooms/${legacyRoom.slug}`));
  }
  if (!room) notFound();

  const roomName = locale === "en" ? room.nameEn : room.name;
  const roomDescription =
    locale === "en" ? room.descriptionEn : room.description;
  const bedType = locale === "en" ? room.bedTypeEn : room.bedType;
  const amenities = locale === "en" ? room.amenitiesEn : room.amenities;
  const otherRooms = mockRooms
    .filter((item) => item.id !== room.id && item.featured)
    .slice(0, 2);
  const directBookingUrl = siteConfig.bookingLinks.direct
    ? `${siteConfig.bookingLinks.direct}?room=${room.slug}`
    : "";
  const platformLinks = [
    {
      key: "airbnb",
      label: t("airbnb"),
      logo: siteConfig.assets.agencyLogos.airbnb,
      href: room.bookingLinks?.airbnb ?? siteConfig.bookingLinks.airbnb,
    },
    {
      key: "agoda",
      label: t("agoda"),
      logo: siteConfig.assets.agencyLogos.agoda,
      href: room.bookingLinks?.agoda ?? siteConfig.bookingLinks.agoda,
    },
    {
      key: "traveloka",
      label: t("traveloka"),
      logo: siteConfig.assets.agencyLogos.traveloka,
      href: room.bookingLinks?.traveloka ?? siteConfig.bookingLinks.traveloka,
    },
  ];

  return (
    <div className="overflow-x-clip bg-background px-4 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-32 sm:pt-36 md:pb-20">
      <RoomViewTracker roomId={room.id} roomName={room.nameEn} />
      <MobileBookingBar available={room.available} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HotelRoom",
          name: roomName,
          description: roomDescription,
          image: room.images.map((image) => image.url),
          url: localizedPath(locale, `/rooms/${room.slug}`),
          occupancy: { "@type": "QuantitativeValue", maxValue: room.capacity },
          offers: {
            "@type": "Offer",
            price: room.price,
            priceCurrency: siteConfig.business.currency,
          },
        }}
      />

      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[{ label: t("rooms"), href: "/rooms" }, { label: roomName }]}
        />

        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <RoomGallery
              images={room.images.map((image) => image.url)}
              name={roomName}
            />
            <div className="mt-8">
              <div>
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {roomName}
                  </h1>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-sm">
                  <BedDouble size={14} className="text-accent" />
                  {bedType}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-sm">
                  <UsersRound size={14} className="text-accent" />
                  {t("capacity", { count: room.capacity })}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-sm">
                  <Maximize2 size={14} className="text-accent" />
                  {t("sqm", { size: room.size })}
                </span>
              </div>

              <div className="mt-8 border-t border-[#eadfca] pt-7">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                  {t("amenities")}
                </h2>
                <p className="max-w-3xl font-sarabun text-base leading-relaxed text-gray-600">
                  {roomDescription}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {amenities.map((amenity, index) => {
                    const AmenityIcon =
                      amenityIcons[
                        room.amenityKeys[index] as keyof typeof amenityIcons
                      ] ?? Sparkles;

                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2.5 text-sm text-gray-600"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff7e8] text-accent">
                          <AmenityIcon size={16} strokeWidth={1.9} />
                        </span>
                        {amenity}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-3xl border border-[#eadfca] border-t-4 border-t-accent bg-white p-5 shadow-[0_18px_50px_rgba(26,26,46,0.12)] sm:p-7">
              <h2 className="mb-4 text-xl font-bold text-foreground">
                {roomName}
              </h2>
              <div className="mb-5">
                <span className="text-3xl font-bold text-accent">
                  ฿{room.price.toLocaleString()}
                </span>
                <span className="ml-1 text-sm text-gray-400">
                  {t("perNight")}
                </span>
              </div>

              <div className="mb-5 rounded-2xl border border-accent/25 bg-[#fffaf0] p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {t("direct")}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      {t("directDescription")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent/15 px-2 py-1 text-[10px] font-bold text-accent">
                    BEST PRICE
                  </span>
                </div>
                {room.available && directBookingUrl ? (
                  <a
                    href={directBookingUrl}
                    id={`room-detail-book-direct-${room.id}`}
                    className="btn-gold flex w-full justify-center"
                  >
                    {t("bookDirect")}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed justify-center rounded-full bg-accent/35 py-3 text-sm font-bold text-foreground/60"
                  >
                    {t("bookDirect")} · {t("comingSoon")}
                  </button>
                )}
              </div>

              <div className="mb-5">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  {t("otherPlatforms")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {platformLinks.map((platform) =>
                    platform.href ? (
                      <a
                        key={platform.key}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${platform.label} · ${roomName}`}
                        className="flex min-h-[100px] md:min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-2 transition hover:border-accent hover:shadow-sm"
                      >
                        <Image
                          src={platform.logo}
                          alt={platform.label}
                          width={110}
                          height={32}
                          className="h-7 w-auto object-contain scale-[1.7] md:scale-[1.5]"
                        />
                        <span className="text-[10px] font-medium text-gray-500">
                          {platform.label}
                        </span>
                      </a>
                    ) : (
                      <div
                        key={platform.key}
                        aria-disabled="true"
                        className="flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-2 py-2 opacity-60"
                      >
                        <Image
                          src={platform.logo}
                          alt={platform.label}
                          width={110}
                          height={32}
                          className="h-7 w-auto object-contain grayscale"
                        />
                        <span className="text-center text-[9px] font-medium leading-tight text-gray-400">
                          {t("comingSoon")}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mb-2 space-y-2 border-y border-gray-100 py-4 text-xs text-gray-500">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  {t("confirmAvailability")}
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  {t("support")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {otherRooms.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              {t("recommended")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {otherRooms.map((other) => (
                <Link
                  href={`/rooms/${other.slug}`}
                  key={other.id}
                  id={`related-room-${other.id}`}
                  className="flex gap-4 rounded-2xl border border-[#f3f4f6] bg-white p-4 transition-all duration-200 hover:shadow-md"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={other.image}
                      alt={locale === "en" ? other.nameEn : other.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {locale === "en" ? other.nameEn : other.name}
                    </p>
                    <p className="mb-1 text-xs text-gray-400">
                      {t("sqm", { size: other.size })} ·{" "}
                      {t("capacity", { count: other.capacity })}
                    </p>
                    <p className="font-bold text-accent">
                      ฿{other.price.toLocaleString()} {t("night")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


