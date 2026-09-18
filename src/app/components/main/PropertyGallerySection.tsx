import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const galleryImages = [
  "/images/Staywithme77/staywithme77-exterior.webp",
  "/images/Staywithme77/staywithme77-gallery-01.webp",
  "/images/Staywithme77/staywithme77-gallery-02.webp",
  "/images/Staywithme77/staywithme77-gallery-03.webp",
  "/images/Staywithme77/staywithme77-gallery-04.webp",
  "/images/Staywithme77/staywithme77-gallery-05.webp",
  "/images/Staywithme77/staywithme77-gallery-06.webp",
  "/images/Staywithme77/staywithme77-gallery-07.webp",
];

export default function PropertyGallerySection() {
  const t = useTranslations("PropertyGallery");

  return (
    <section id="property-gallery" aria-labelledby="property-gallery-title" className="w-full overflow-hidden bg-[#f9f5ee]">
      <h2 id="property-gallery-title" className="sr-only">{t("title")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[clamp(180px,13.5vw,260px)]">
        {galleryImages.map((src, index) => (
          <Link
            key={src}
            href="/rooms"
            className={"group relative col-span-1 aspect-square overflow-hidden bg-[#ded7ca] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent md:aspect-auto " + (index === 0 ? "md:row-span-2" : "") + (index === 7 ? " md:hidden" : "")}
          >
            <Image
              src={src}
              alt={t("imageAlt", { type: t("title") })}
              fill
              priority={index < 4}
              sizes="(max-width: 767px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="pointer-events-none absolute bottom-5 left-5 translate-y-3 text-sm font-semibold text-white opacity-0 drop-shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:bottom-7 sm:left-7 sm:text-base">
              {t("title")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}