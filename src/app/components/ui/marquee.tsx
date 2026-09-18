"use client";

import { useRef, useState, type ComponentPropsWithoutRef, type PointerEvent, type ReactNode } from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const adjustingScrollRef = useRef(false);
  const pointerRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    event.preventDefault();
    pointerRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
    };
    setDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !pointerRef.current.active) return;

    const loopWidth = track.scrollWidth / 2;
    let nextScroll = pointerRef.current.startScroll - (event.clientX - pointerRef.current.startX);

    if (loopWidth > 0) {
      if (nextScroll >= loopWidth) nextScroll -= loopWidth;
      if (nextScroll <= 0) nextScroll += loopWidth;
    }

    track.scrollLeft = nextScroll;
    pointerRef.current.startScroll = nextScroll;
    pointerRef.current.startX = event.clientX;
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    pointerRef.current.active = false;
    setDragging(false);
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || adjustingScrollRef.current || pointerRef.current.active) return;

    const loopWidth = track.scrollWidth / 2;
    if (loopWidth <= 0) return;

    if (track.scrollLeft >= loopWidth) {
      adjustingScrollRef.current = true;
      track.scrollLeft -= loopWidth;
      adjustingScrollRef.current = false;
    } else if (track.scrollLeft <= 0) {
      adjustingScrollRef.current = true;
      track.scrollLeft += loopWidth;
      adjustingScrollRef.current = false;
    }
  };

  return (
    <div
      {...props}
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onScroll={handleScroll}
      onDragStart={(event) => event.preventDefault()}
      className={cn(
        "scrollbar-none group flex touch-pan-y select-none gap-(--gap) overflow-x-auto p-2 [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover ? "pause-on-hover" : undefined,
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap)",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            reverse ? "animate-reverse" : undefined,
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
