"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Wifi,
  Snowflake,
  Tv,
  Refrigerator,
  ShowerHead,
  Bed,
  Users,
} from "lucide-react";
import type { Room } from "@/app/type/room";
import { trackEvent } from "@/app/components/analytics/events";
import { useLocale, useTranslations } from "next-intl";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi aria-hidden="true" size={14} />,
  ac: <Snowflake aria-hidden="true" size={14} />,
  tv: <Tv aria-hidden="true" size={14} />,
  fridge: <Refrigerator aria-hidden="true" size={14} />,
  shower: <ShowerHead aria-hidden="true" size={14} />,
};

const AMENITY_LABELS: Record<string, string> = {
  wifi: "Wi-Fi",
  ac: "แอร์",
  tv: "ทีวี",
  fridge: "ตู้เย็น",
  shower: "น้ำอุ่น",
};

const AMENITY_LABELS_EN: Record<string, string> = {
  wifi: "Wi-Fi",
  ac: "A/C",
  tv: "TV",
  fridge: "Fridge",
  shower: "Hot shower",
};

type RoomCardProps = {
  room: Room;
  compact?: boolean; // true = 2-col mobile compact layout
};

export default function RoomCard({ room, compact = false }: RoomCardProps) {
  const t = useTranslations("RoomCard");
  const locale = useLocale();
  const roomName = locale === "en" ? room.nameEn : room.name;
  const roomBedType = locale === "en" ? room.bedTypeEn : room.bedType;
  const amenityLabels = locale === "en" ? AMENITY_LABELS_EN : AMENITY_LABELS;
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
      {/* Image */}
      <div
        className={`relative overflow-hidden ${compact ? "h-[120px]" : "aspect-[4/3] md:aspect-auto md:h-[200px]"}`}
      >
        <Image
          src={room.image}
          alt={roomName}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        {/* Room Name */}
        <h3
          className={`font-semibold leading-tight mb-1 text-foreground ${compact ? "text-xs" : "text-[0.95rem]"}`}
        >
          {roomName}
        </h3>

        {/* Room Meta */}
        <div className="mb-2 flex flex-wrap gap-2 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <Bed aria-hidden="true" size={11} />
            {compact ? roomBedType.split(" ")[0] : roomBedType}
          </span>
          <span className="flex items-center gap-1">
            <Users aria-hidden="true" size={11} />
            {t("guests", { count: room.capacity })}
          </span>
          {/* {!compact && (
            <span className="flex items-center gap-1">
              <Maximize2 aria-hidden="true" size={11} />
              {t("sqm", { size: room.size })}
            </span>
          )} */}
        </div>

        {/* Amenity Icons */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {room.amenityKeys.slice(0, compact ? 3 : 4).map((key) => (
            <span
              key={key}
              className="flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600"
              title={amenityLabels[key]}
            >
              {AMENITY_ICONS[key]}
              {!compact && (
                <span className="hidden sm:inline">{amenityLabels[key]}</span>
              )}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-2">
            <span
              className={`font-bold text-accent ${compact ? "text-base" : "text-xl"}`}
            >
              ฿{room.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">{t("night")}</span>
          </div>

          {compact ? (
            <Link
              onClick={() => trackEvent("start_booking", { room_id: room.id })}
              href={`/rooms/${room.slug}`}
              id={`room-card-detail-${room.id}`}
              className="block w-full rounded-lg bg-foreground py-1.5 text-center text-xs font-semibold text-white transition-colors duration-200"
            >
              {t("viewDetails")}
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                onClick={() =>
                  trackEvent("start_booking", { room_id: room.id })
                }
                href={`/rooms/${room.slug}`}
                id={`room-card-detail-${room.id}`}
                className="flex-1 rounded-lg bg-gray-100 py-2 text-center text-xs font-semibold text-gray-700 transition-colors duration-200"
              >
                {room.available ? t("details") : t("viewRoom")}
              </Link>
              {room.available && (
                <Link
                  onClick={() =>
                    trackEvent("start_booking", { room_id: room.id })
                  }
                  href={`/rooms/${room.slug}`}
                  id={`room-card-book-${room.id}`}
                  className="flex-1 rounded-lg bg-foreground py-2 text-center text-xs font-bold text-white transition-colors duration-200"
                >
                  {t("checkAvailability")}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
