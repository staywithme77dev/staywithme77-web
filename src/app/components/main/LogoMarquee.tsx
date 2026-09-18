import Image from "next/image";

import { Marquee } from "@/app/components/ui/marquee";
import { siteConfig } from "@/app/lib/siteConfig";
import { useTranslations } from "next-intl";

type Brand = {
  name: string;
  image?: string;
  width?: number;
};

const brands: Brand[] = [
  { name: "Agoda", image: siteConfig.assets.agencyLogos.agoda, width: 142 },
  { name: "Airbnb", image: siteConfig.assets.agencyLogos.airbnb, width: 142 },
  { name: "Traveloka", image: siteConfig.assets.agencyLogos.traveloka, width: 168 },
  { name: siteConfig.brand.shortName, image: siteConfig.assets.logoGold, width: 142 },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <div className="group flex h-28 w-[190px] shrink-0 items-center justify-center px-5 opacity-55 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0 sm:h-32 sm:w-[240px]">
      {brand.image ? (
        <Image
          src={brand.image}
          alt={brand.name}
          width={brand.width}
          height={72}
          className="h-auto max-h-20 w-auto max-w-[185px] object-contain sm:max-h-24 sm:max-w-[220px]"
          style={{ width: "auto", height: "auto" }}
          draggable={false}
        />
      ) : (
        <span className="font-display text-xl font-bold tracking-tight text-slate-500 transition-colors duration-300 group-hover:text-accent">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export default function LogoMarquee() {
  const t = useTranslations("LogoMarquee");
  return (
    <section
      aria-label={t("aria")}
      className="overflow-hidden border-y border-[#eee8dc] bg-[#f9f7f2]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <Marquee
            className="p-0 [--duration:34s] [--gap:0px]"
            pauseOnHover
            repeat={4}
          >
            {brands.map((brand) => (
              <BrandItem key={brand.name} brand={brand} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
