"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";

type ImageLightboxProps = {
  images: string[];
  name: string;
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const controlClass = "flex items-center justify-center transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40";

export default function ImageLightbox({ images, name, activeIndex, open, onClose, onIndexChange }: ImageLightboxProps) {
  const t = useTranslations("Gallery");
  const [zoom, setZoom] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeImage = images[activeIndex] ?? images[0];

  const changeImage = useCallback((direction: 1 | -1) => {
    if (images.length < 2) return;
    onIndexChange((activeIndex + direction + images.length) % images.length);
    setZoom(1);
  }, [activeIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") changeImage(-1);
      if (event.key === "ArrowRight") changeImage(1);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [changeImage, onClose, open]);

  if (!open || !activeImage) return null;

  return (
    <div ref={dialogRef} className="fixed inset-0 z-[200] flex overscroll-contain items-center justify-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t("gallery", { name })}>
      <button ref={closeButtonRef} type="button" onClick={onClose} className={`absolute right-4 top-4 z-20 h-11 w-11 rounded-md bg-white/10 text-white ${controlClass}`} aria-label={t("close")}><X size={24} aria-hidden="true" /></button>
      <div className="absolute left-4 top-4 z-20 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md" aria-live="polite">{activeIndex + 1} / {images.length}</div>
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-md bg-white/10 p-1.5 text-white backdrop-blur-md">
        <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} disabled={zoom <= 1} className={`h-9 w-9 ${controlClass}`} aria-label={t("zoomOut")}><Minus size={18} aria-hidden="true" /></button>
        <span className="min-w-14 text-center text-xs font-semibold tabular-nums" aria-live="polite">{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.25))} disabled={zoom >= 3} className={`h-9 w-9 ${controlClass}`} aria-label={t("zoomIn")}><Plus size={18} aria-hidden="true" /></button>
      </div>
      {images.length > 1 ? <>
        <button type="button" onClick={() => changeImage(-1)} className={`absolute left-3 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-md bg-white/10 text-white sm:left-8 ${controlClass}`} aria-label={t("previous")}><ChevronLeft size={28} aria-hidden="true" /></button>
        <button type="button" onClick={() => changeImage(1)} className={`absolute right-3 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-md bg-white/10 text-white sm:right-8 ${controlClass}`} aria-label={t("next")}><ChevronRight size={28} aria-hidden="true" /></button>
      </> : null}
      <div className="relative h-[78vh] w-full max-w-6xl overflow-hidden"><Image src={activeImage} alt={name} fill className="object-contain transition-transform duration-200 motion-reduce:transition-none" style={{ transform: `scale(${zoom})` }} sizes="100vw" priority /></div>
    </div>
  );
}
