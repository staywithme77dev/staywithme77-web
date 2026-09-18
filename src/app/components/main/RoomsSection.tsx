import { Link } from "@/i18n/navigation";
import { mockRooms } from "@/app/lib/mockDb";
import SectionHeader from "@/app/components/ui/SectionHeader";
import RoomCard from "@/app/components/ui/RoomCard";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RoomsSection() {
  const t = useTranslations("RoomsSection");
  return (
    <section id="rooms" className="bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title={t("title")}
            subtitle={t("subtitle")}
            align="left"
          />
          <Link
            href="/rooms"
            id="rooms-section-view-all"
            className="hidden shrink-0 items-center gap-1.5 border-b border-accent pb-px text-sm font-semibold text-foreground transition-colors duration-200 sm:inline-flex"
          >
            {t("viewAll")} <ArrowRight size={14} />
          </Link>
        </div>

        {/* 2-col on mobile, 3-col on desktop — show all six rooms */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {mockRooms.slice(0, 6).map((room) => (
            <RoomCard key={room.id} room={room} compact={false} />
          ))}
        </div>

        <Link
          href="/rooms"
          id="rooms-section-view-more-mobile"
          className="mx-auto mt-8 flex w-full max-w-[200px] items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-foreground px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-foreground/90 sm:hidden"
        >
          {t("viewMore")} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
