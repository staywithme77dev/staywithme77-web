"use client";

import { useMemo, useState } from "react";
import { Filter, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import RoomCard from "@/app/components/ui/RoomCard";
import type { Room } from "@/app/type/room";
import { getWhatsAppLink } from "@/app/lib/contact";
import { useLocale, useTranslations } from "next-intl";

type RoomsCatalogProps = {
  rooms: Room[];
  initialGuests: number;
  hasSearch: boolean;
  searchSummary: string;
};

export default function RoomsCatalog({
  rooms,
  initialGuests,
  hasSearch,
  searchSummary,
}: RoomsCatalogProps) {
  const t = useTranslations("RoomsCatalog");
  const locale = useLocale();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [availability, setAvailability] = useState<"all" | "available">("all");
  const [minCapacity, setMinCapacity] = useState(initialGuests || 0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [bedType, setBedType] = useState("all");

  const activeFilterCount = [
    availability !== "all",
    minCapacity > 0 && minCapacity !== initialGuests,
    maxPrice > 0,
    bedType !== "all",
  ].filter(Boolean).length;

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) => {
        if (initialGuests > 0 && room.capacity < initialGuests) return false;
        if (availability === "available" && !room.available) return false;
        if (minCapacity > 0 && room.capacity < minCapacity) return false;
        if (maxPrice > 0 && room.price > maxPrice) return false;
        if (bedType !== "all" && room.bedType !== bedType) return false;
        return true;
      }),
    [rooms, initialGuests, availability, minCapacity, maxPrice, bedType],
  );

  const resetFilters = () => {
    setAvailability("all");
    setMinCapacity(initialGuests || 0);
    setMaxPrice(0);
    setBedType("all");
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          as="h1"
          title={t("title")}
          subtitle={
            hasSearch
              ? searchSummary
              : t("summary", {available: rooms.filter((room) => room.available).length, total: rooms.length})
          }
          align="left"
        />

        <button
          onClick={() => setIsFilterOpen((open) => !open)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all lg:w-fit ${isFilterOpen || activeFilterCount > 0 ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
          aria-expanded={isFilterOpen}
          aria-controls="rooms-filter-panel"
        >
          <Filter size={16} />
          {t("filter")}
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {hasSearch && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-900">
          <p>
            <span className="font-bold">{t("results")}</span> · {searchSummary}
          </p>
          <span className="font-semibold">{t("found", {count: filteredRooms.length})}</span>
        </div>
      )}

      {isFilterOpen && (
        <div
          id="rooms-filter-panel"
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(26,26,46,0.08)]"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <SlidersHorizontal size={17} className="text-accent" />{" "}
              {t("searchSettings")}
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={t("closeFilter")}
            >
              <X size={17} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
              {t("status")}
              <select
                value={availability}
                onChange={(event) =>
                  setAvailability(event.target.value as "all" | "available")
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-400"
              >
                <option value="all">{t("all")}</option>
                <option value="available">{t("availableOnly")}</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
              {t("minimumGuests")}
              <select
                value={minCapacity}
                onChange={(event) => setMinCapacity(Number(event.target.value))}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-400"
              >
                <option value={0}>{t("unlimited")}</option>
                <option value={2}>{t("twoPlus")}</option>
                <option value={4}>{t("fourPlus")}</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
              {t("maxPrice")}
              <select
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-400"
              >
                <option value={0}>{t("unlimited")}</option>
                <option value={1000}>{t("upTo", {price: "1,000"})}</option>
                <option value={1500}>{t("upTo", {price: "1,500"})}</option>
                <option value={3000}>{t("upTo", {price: "3,000"})}</option>
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
              {t("bedType")}
              <select
                value={bedType}
                onChange={(event) => setBedType(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-400"
              >
                <option value="all">{t("all")}</option>
                {[...new Set(rooms.map((room) => room.bedType))].map((type) => (
                  <option key={type} value={type}>
                    {locale === "en" ? rooms.find((room) => room.bedType === type)?.bedTypeEn ?? type : type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-foreground"
            >
              <RotateCcw size={13} /> {t("clear")}
            </button>
          )}
        </div>
      )}

      <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} compact={false} />
        ))}
      </div>
      {filteredRooms.length === 0 && (
        <div className="mb-12 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          {t("empty")}
        </div>
      )}

      <div className="rounded-2xl bg-foreground p-6 text-center md:p-8">
        <p className="mb-1.5 font-semibold text-white">
          {t("helpTitle")}
        </p>
        <p className="mb-5 text-sm text-white/50">
          {t("helpText")}
        </p>
        <a
          href={getWhatsAppLink(locale)}
          target="_blank"
          rel="noopener noreferrer"
          id="rooms-page-cta"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-[#e8c97a] px-6 py-3 text-sm font-bold text-foreground"
        >
          {t("ask")}
        </a>
      </div>
    </>
  );
}


