"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, LogIn, X } from "lucide-react";
import { siteConfig } from "@/app/lib/siteConfig";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "@/app/components/main/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const normalizedPathname =
    pathname.replace(/^\/(?:th|en)(?=\/|$)/, "") || "/";
  const isHome = normalizedPathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ตรวจจับการเลื่อนจอเพื่อเปลี่ยนสไตล์ Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return; // ล็อกสถานะไว้ถ้าเปิดเมนูมือถืออยู่
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const navLinks = [
    { path: "/", label: t("home") },
    { path: "/about", label: t("about") },
    { path: "/rooms", label: t("rooms") },
    { path: "/location", label: t("location") },
    { path: "/contact", label: t("contact") },
  ];

  // ป้องกันการ Scroll หน้าจอเวลาเปิดเมนูมือถือ
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <>
      {/* 1. Top Announcement Bar (แถบประกาศด้านบน) 
          จะเลื่อนหายไปเมื่อเลื่อนจอลง หรือ **เมื่อเปิดเมนูมือถือ** เพื่อไม่ให้เกะกะ */}
      <div
        className={`bg-black text-white text-sm h-10 flex justify-center items-center gap-3 w-full fixed top-0 z-[60] transition-all duration-500 ease-in-out ${
          isScrolled || isMenuOpen ? "-translate-y-full opacity-0" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-3 w-full">
          <span className="font-light tracking-wide text-xs md:text-sm">
            {t("announcement")}
          </span>
          <Link
            href="/rooms"
            className="bg-[#e7b84c]  hover:bg-[#af8e3f] text-white px-3 py-1 rounded-full font-bold text-[10px] sm:text-xs  transition-colors"
          >
            {t("whatsapp")}
          </Link>
        </div>
      </div>

      {/* 2. Main Navigation (แถบเมนูหลัก) */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ease-in-out w-full ${
          isMenuOpen
            ? "top-0 bg-white text-gray-900 shadow-none border-none xl:top-4 xl:bg-white/95 xl:backdrop-blur-xl xl:w-[calc(100%-2rem)] xl:max-w-7xl xl:rounded-[2rem] xl:border xl:border-gray-200 xl:shadow-lg" // ตอนเปิดเมนูมือถือ จะไม่มีเงา ไม่มีขอบ กลืนไปกับพื้นหลัง
            : isScrolled
              ? "top-0 xl:top-4 bg-white/50 backdrop-blur-xl xl:w-[calc(100%-2rem)] xl:max-w-7xl xl:rounded-[2rem] border-b xl:border border-gray-200 shadow-lg text-gray-900" // ตอนเลื่อนจอปกติ
              : isHome
                ? "top-10 border-none bg-transparent text-white shadow-none"
                : "top-10 border-b border-gray-200 bg-white text-gray-900 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${
              isScrolled || isMenuOpen ? "h-16 xl:h-20" : "h-20 xl:h-24"
            }`}
          >
            {/* Logo */}
            <div className="order-2 flex shrink-0 items-center justify-self-center xl:order-none xl:justify-self-start">
              <Link href="/" className="flex items-center group">
                {/* Mobile Logo (Icon only) */}
                {siteConfig.assets.logoIconGold && (
                  <div
                    className={`block xl:hidden transition-transform duration-300 ${
                      isScrolled || isMenuOpen ? "scale-140" : "scale-160"
                    }`}
                  >
                    <Image
                      src={siteConfig.assets.logoGold}
                      alt={
                        locale === "en"
                          ? siteConfig.brand.name.en
                          : siteConfig.brand.name.th
                      }
                      width={64}
                      height={64}
                      className="h-14 w-14 object-contain"
                      priority
                    />
                  </div>
                )}

                {/* Desktop Logo (Full logo with text) */}
                {siteConfig.assets.logoIconGold && (
                  <div
                    className={`hidden xl:block transition-transform duration-300 ${
                      isScrolled || isMenuOpen ? "scale-80" : "scale-100"
                    }`}
                  >
                    <Image
                      src={siteConfig.assets.logoIconGold}
                      alt={
                        locale === "en"
                          ? siteConfig.brand.name.en
                          : siteConfig.brand.name.th
                      }
                      width={150} // slightly larger for desktop full logo
                      height={50}
                      className="object-contain h-[80px] w-auto" // ensures it scales nicely
                      priority
                    />
                  </div>
                )}

                {/* Text name shown on desktop */}
                <span
                  className={`hidden font-display text-lg font-semibold tracking-widest transition-all duration-300 md:text-2xl xl:block ${
                    isScrolled || isMenuOpen ? "scale-95" : "scale-100"
                  }`}
                >
                  {siteConfig.brand.name.en}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:contents">
              <nav className="flex items-center gap-1 rounded-full border border-current/10 bg-black/[0.03] p-1 text-sm font-medium tracking-wide backdrop-blur-sm xl:justify-self-center">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`rounded-full px-4 py-2 transition-all ${
                      normalizedPathname === path
                        ? "bg-current/10 font-bold opacity-100"
                        : "opacity-65 hover:bg-current/5 hover:opacity-100"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2 xl:justify-self-end">
                <LanguageSwitcher />
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-current/15 px-4 py-2.5 text-xs font-semibold transition hover:bg-current/10"
                >
                  <LogIn size={15} />
                  {t("login")}
                </Link>
                <Link
                  href="/rooms"
                  id="navbar-whatsapp-cta"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#e8c97a] px-6 py-3 text-xs font-bold tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("book")}
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="order-1 z-[210] flex items-center gap-2 justify-self-start xl:order-none xl:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")} aria-expanded={isMenuOpen} aria-controls="mobile-navigation"
              >
                {/* Hamburger Icon */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 transform ${
                    isMenuOpen ? "scale-50 opacity-0 -rotate-180" : ""
                  }`}
                >
                  <Menu size={24} strokeWidth={1.8} aria-hidden="true" />
                </div>
                {/* Close Icon (X) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
                    isMenuOpen
                      ? "scale-100 opacity-100 rotate-0"
                      : "scale-50 opacity-0 rotate-180"
                  }`}
                >
                  <X size={24} strokeWidth={1.8} aria-hidden="true" />
                </div>
              </button>
              <LanguageSwitcher iconOnly />
            </div>

            <Link
              href="/login"
              aria-label={t("login")}
              className="order-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-current hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 xl:hidden"
            >
              <LogIn size={21} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Mobile Menu Overlay (เมนูเต็มจอบนมือถือ) */}
      <div
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`fixed inset-0 bg-white text-gray-900 z-40 transition-all duration-500 ease-in-out xl:hidden flex flex-col ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-6 pt-24 pb-10 w-full flex flex-col justify-center">
          <div className="flex flex-col text-center space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-light uppercase tracking-widest transition-colors ${
                  normalizedPathname === link.path
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-center w-full">
            <Link
              href="/rooms"
              id="mobile-menu-whatsapp-cta"
              className="bg-black text-white w-full max-w-xs py-4 rounded-full font-bold text-sm tracking-widest uppercase text-center shadow-lg active:scale-95 transition-transform"
            >
              {t("book")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


