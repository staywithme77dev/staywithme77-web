import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Users } from "lucide-react";

import { mockRooms } from "@/app/lib/mockDb";
import { siteConfig } from "@/app/lib/siteConfig";
import AboutPhotoGrid from "@/app/components/pages/about/AboutPhotoGrid";
import { Link } from "@/i18n/navigation";

const roomTypes = mockRooms.filter(
  (room, index, rooms) =>
    rooms.findIndex((candidate) => candidate.nameEn === room.nameEn) === index,
);

const extraImages = [
  { src: "/images/Staywithme77/staywithme77-gallery-01.webp", key: "interior-01" },
  { src: "/images/Staywithme77/staywithme77-gallery-02.webp", key: "interior-02" },
  { src: "/images/Staywithme77/staywithme77-gallery-03.webp", key: "interior-03" },
  { src: "/images/Staywithme77/staywithme77-gallery-04.webp", key: "interior-04" },
  { src: "/images/Staywithme77/staywithme77-gallery-05.webp", key: "interior-05" },
  { src: "/images/Staywithme77/staywithme77-gallery-06.webp", key: "interior-06" },
  { src: "/images/Staywithme77/staywithme77-gallery-07.webp", key: "interior-07" },
  { src: "/images/Staywithme77/staywithme77-gallery-08.webp", key: "interior-08" },
  { src: "/images/Staywithme77/staywithme77-gallery-09.webp", key: "interior-09" },
];

export default function AboutRooms() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  const currency = new Intl.NumberFormat(locale === "en" ? "en-US" : "th-TH");

  return (
    <section
      id="rooms-overview"
      className="border-b border-[#ddd7cc] bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-[#d8d1c5] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl border-l-2 border-accent pl-5 sm:pl-8">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {t("rooms.title")}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {t("rooms.subtitle")}
            </p>
          </div>

          <Link
            href="/rooms"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-foreground px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t("rooms.viewAll")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {roomTypes.map((room) => {
            const name = locale === "en" ? room.nameEn : room.name;
            const description =
              locale === "en" ? room.descriptionEn : room.description;
            const bedType = locale === "en" ? room.bedTypeEn : room.bedType;

            return (
              <article
                key={room.nameEn}
                className="flex flex-col border border-[#d8d1c5] bg-white"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden border-b border-[#d8d1c5] bg-[#eee9e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  aria-label={`${t("rooms.viewDetails")}: ${name}`}
                >
                  <Image
                    src={room.image}
                    alt={`${name} — ${t("rooms.imageAlt")}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-3 sm:p-6">
                  <h3 className="mt-2 text-base font-bold leading-tight text-foreground sm:text-xl">
                    {name}
                  </h3>
                  <p className="mt-2 line-clamp-4 text-xs leading-6 text-slate-600 sm:mt-3 sm:line-clamp-3 sm:text-sm sm:leading-7">
                    {description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2 border-t border-[#e5dfd5] pt-3 text-[10px] text-slate-500 sm:mt-5 sm:gap-x-4 sm:pt-4 sm:text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <Users
                        size={12}
                        aria-hidden="true"
                        className="sm:h-3.5 sm:w-3.5"
                      />
                      {room.capacity} {t("rooms.guests")}
                    </span>
                    <span>{bedType}</span>
                    <span>
                      {room.size} {t("rooms.squareMeters")}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col items-start gap-3 border-t border-[#e5dfd5] pt-3 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pt-4">
                    <div>
                      <p className="text-[10px] text-slate-500 sm:text-xs">
                        {t("rooms.startingFrom")}
                      </p>
                      <p className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        ฿{currency.format(room.price)}
                        <span className="ml-1 text-[10px] font-normal text-slate-500 sm:text-xs">
                          {t("rooms.perNight")}
                        </span>
                      </p>
                    </div>
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="inline-flex items-center gap-1 border-b border-foreground pb-1 text-xs font-bold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm"
                    >
                      {t("rooms.viewDetails")}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 border-t border-[#d8d1c5] pt-10 sm:mt-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {t("rooms.galleryTitle")}
              </h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-right">
              {t("rooms.gallerySubtitle")}
            </p>
          </div>

          <div className="mt-7">
            <AboutPhotoGrid
              images={extraImages.map((image) => image.src)}
              name={t("rooms.galleryTitle")}
            />
          </div>
        </div>

        <p className="mt-6 text-xs leading-6 text-slate-500">
          {t("rooms.contactForAvailability", {
            phone: siteConfig.contact.phone.display,
          })}
        </p>
      </div>
    </section>
  );
}
