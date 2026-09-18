"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import ImageLightbox from "@/app/components/shared/ImageLightbox";

type RoomGalleryProps = { images: string[]; name: string };

export default function RoomGallery({ images, name }: RoomGalleryProps) {
  const t = useTranslations("Gallery");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const gestureRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) return null;

  const changeImage = (direction: 1 | -1) => {
    setActiveIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;
    const distanceX = Math.abs(event.clientX - gesture.startX);
    const distanceY = Math.abs(event.clientY - gesture.startY);
    if (distanceX > 8 || distanceY > 8) {
      gesture.moved = true;
    }
  };

  const finishPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= 40 && Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe && images.length > 1) {
      changeImage(deltaX < 0 ? 1 : -1);
    }

    if (!gesture.moved && event.type === "pointerup") {
      setIsLightboxOpen(true);
    }

    suppressClickRef.current = gesture.moved;
    gesture.pointerId = -1;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 80);
  };

  const openLightbox = () => {
    if (!suppressClickRef.current) setIsLightboxOpen(true);
  };

  return (
    <>
      <div
        className="relative mb-3 aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-xl bg-slate-200 shadow-[0_18px_45px_rgba(26,26,46,0.14)] lg:max-h-[560px]"
      >
        <button
          type="button"
          onClick={openLightbox}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          className="absolute inset-0 z-10 cursor-zoom-in touch-pan-y"
          aria-label={t("open")}
        />
        <Image
          key={activeImage}
          src={activeImage}
          alt={name}
          fill
          draggable={false}
          className="pointer-events-none object-cover"
          priority={activeIndex === 0}
          sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 820px"
        />
        <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <Expand size={13} /> {t("expand")}
        </span>
        <span className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-md bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </span>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              data-gallery-control
              onClick={(event) => {
                event.stopPropagation();
                changeImage(-1);
              }}
              className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-white/90 text-foreground shadow-lg transition hover:bg-white"
              aria-label={t("previous")}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              data-gallery-control
              onClick={(event) => {
                event.stopPropagation();
                changeImage(1);
              }}
              className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-white/90 text-foreground shadow-lg transition hover:bg-white"
              aria-label={t("next")}
            >
              <ChevronRight size={20} />
            </button>
          </>
        ) : null}
      </div>

      <div className="scrollbar-none flex max-w-full touch-pan-x snap-x gap-2.5 overflow-x-auto overscroll-x-contain pb-1 sm:gap-3">
        {images.slice(0, 8).map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square w-[4.25rem] flex-none snap-start overflow-hidden rounded-md border-2 bg-white shadow-sm transition sm:w-[calc((100%-2.5rem)/6)] ${activeIndex === index ? "border-accent" : "border-transparent opacity-75 hover:opacity-100"}`}
            aria-label={t("select", { number: index + 1 })}
          >
            <Image
              src={image}
              alt={t("image", { name, number: index + 1 })}
              fill
              className="object-cover"
              sizes="(max-width: 639px) 68px, 160px"
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        images={images}
        name={name}
        activeIndex={activeIndex}
        open={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
