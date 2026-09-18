import { getLocale } from "next-intl/server";
import Navbar from "@/app/components/main/Navbar";
import Footer from "@/app/components/main/Footer";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const skipLabel = locale === "th" ? "ข้ามไปยังเนื้อหาหลัก" : "Skip to main content";
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a href="#main-content" className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-md bg-foreground px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0">{skipLabel}</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
      <Footer />
    </div>
  );
}
