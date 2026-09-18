"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ImageLightbox from "@/app/components/shared/ImageLightbox";

type AboutPhotoGridProps = { images: string[]; name: string; aspect?: "square" | "landscape" };

export default function AboutPhotoGrid({ images, name, aspect = "landscape" }: AboutPhotoGridProps) {
  const t = useTranslations("Gallery");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <div className={images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"}>
      {images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => { setActiveIndex(index); setIsOpen(true); }} className={"group relative " + (aspect === "square" ? "aspect-square" : "aspect-[4/3]") + " cursor-zoom-in overflow-hidden border border-[#d8d1c5] bg-[#eee9e1] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"} aria-label={`${t("open")}: ${t("image", { name, number: index + 1 })}`}>
        <Image src={image} alt={`${name}, ${t("image", { name, number: index + 1 })}`} fill sizes="(max-width: 640px) 100vw, 1080px" className="object-cover transition-opacity duration-300 group-hover:opacity-85" />
      </button>)}
    </div>
    <ImageLightbox images={images} name={name} activeIndex={activeIndex} open={isOpen} onClose={() => setIsOpen(false)} onIndexChange={setActiveIndex} />
  </>;
}
