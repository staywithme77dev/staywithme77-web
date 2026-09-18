import type { Metadata } from "next";
import { mockRooms } from "@/app/lib/mockDb";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import RoomsCatalog from "@/app/components/main/RoomsCatalog";
import { getTranslations } from "next-intl/server";
import {localizedPageMetadata} from "@/app/lib/seo";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace:"RoomsPage"});
  return localizedPageMetadata({ locale, path: "/rooms", title: t("metaTitle"), description: t("metaDescription") });
}

function formatShortDate(value?: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ checkIn?: string; checkOut?: string; guests?: string }>;
}) {
  const query = await searchParams;
  const t = await getTranslations("RoomsPage");
  const guests = Number(query.guests || 0);
  const hasSearch = Boolean(query.checkIn || query.checkOut || query.guests);

  return (
    <div className="min-h-screen bg-[#f9f5f0] px-4 pb-20 pt-36">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: t("breadcrumb") }]} />
        <RoomsCatalog rooms={mockRooms} initialGuests={guests} hasSearch={hasSearch} searchSummary={t("searchSummary", {checkIn:formatShortDate(query.checkIn), checkOut:formatShortDate(query.checkOut), guests:guests || 1})} />
      </div>
    </div>
  );
}

