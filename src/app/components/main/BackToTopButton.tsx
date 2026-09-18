"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 420);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={
        "fixed bottom-4 right-4 z-[21] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#e6c96f] bg-accent text-foreground shadow-[0_14px_32px_rgba(26,26,46,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e8c97a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:bottom-5 sm:right-6 sm:h-16 sm:w-16 " +
        (visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0")
      }
    >
      <ArrowUp size={18} />
    </button>
  );
}
