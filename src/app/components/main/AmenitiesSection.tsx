import type { ReactNode } from "react";
import {
  Briefcase,
  Calendar,
  Car,
  CigaretteOff,
  Clock,
  Lock,
  Refrigerator,
  Shield,
  Shirt,
  ShowerHead,
  Snowflake,
  Sparkles,
  Tv,
  Wifi,
  Wind,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/app/lib/siteConfig";

const roomIcons: ReactNode[] = [
  <Wifi key="wifi" />,
  <Snowflake key="air-conditioning" />,
  <Tv key="tv" />,
  <Refrigerator key="refrigerator" />,
  <ShowerHead key="shower" />,
  <Wind key="hair-dryer" />,
];

const serviceIcons: ReactNode[] = [
  <Car key="parking" />,
  <Clock key="check-in" />,
  <Sparkles key="housekeeping" />,
  <Shirt key="laundry" />,
  <Briefcase key="luggage" />,
  <Lock key="digital-key" />,
];

const policyIcons: ReactNode[] = [
  <Calendar key="policy-check-in" />,
  <Calendar key="policy-check-out" />,
  <CigaretteOff key="no-smoking" />,
  <Shield key="cctv" />,
];

function getGroupIcons(groupIndex: number, itemCount: number) {
  if (groupIndex === 0) return roomIcons;
  if (groupIndex === 2) return policyIcons;

  return itemCount === 5
    ? [serviceIcons[0], serviceIcons[1], serviceIcons[2], serviceIcons[4], serviceIcons[5]]
    : serviceIcons;
}

export default function AmenitiesSection() {
  const t = useTranslations("Amenities");
  const localizedGroups = t.raw("groups") as Array<{
    title: string;
    items: Array<[string, string]>;
  }>;

  const displayGroups = localizedGroups.map((group, groupIndex) => {
    const icons = getGroupIcons(groupIndex, group.items.length);

    return {
      ...group,
      items: group.items.map((translated, itemIndex) => {
        if (groupIndex === 2 && itemIndex < 2) {
          const isCheckIn = itemIndex === 0;
          return {
            icon: icons[itemIndex],
            label: t(isCheckIn ? "checkInLabel" : "checkOutLabel", {
              time: isCheckIn
                ? siteConfig.business.checkIn
                : siteConfig.business.checkOut,
            }),
            note: t(isCheckIn ? "checkInNote" : "checkOutNote"),
          };
        }

        return {
          icon: icons[itemIndex],
          label: translated[0],
          note: translated[1],
        };
      }),
    };
  });

  return (
    <section
      id="amenities"
      className="scroll-mt-24 border-y border-[#e2ddd3] bg-[#f9f5f0] px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
      aria-labelledby="amenities-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <h2
            id="amenities-heading"
            className="max-w-xl text-pretty text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="font-sarabun mt-4 max-w-xl text-pretty text-sm leading-7 text-slate-600 sm:text-base">
            {t("subtitle")}
          </p>
        </header>

        <div className="mt-10 border-y border-[#d8d1c5] sm:mt-12 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-[#d8d1c5]">
          {displayGroups.map((group, groupIndex) => (
            <section
              key={group.title}
              className="border-b border-[#d8d1c5] py-7 last:border-b-0 sm:py-9 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              aria-labelledby={"amenity-group-" + groupIndex}
            >
              <h3
                id={"amenity-group-" + groupIndex}
                className="text-pretty text-base font-bold text-foreground sm:text-lg"
              >
                {group.title}
              </h3>
              <div className="mt-3 h-px w-8 bg-[#c9a84c]" aria-hidden="true" />

              <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 min-[430px]:grid-cols-2 lg:grid-cols-1">
                {group.items.map((item) => (
                  <li key={item.label} className="flex min-w-0 items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 text-[#a7802f] [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:stroke-[1.6]"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block break-words text-sm font-semibold leading-5 text-foreground">
                        {item.label}
                      </span>
                      {item.note ? (
                        <span className="font-sarabun mt-0.5 block break-words text-[11px] leading-4 text-slate-500 sm:text-xs">
                          {item.note}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}


