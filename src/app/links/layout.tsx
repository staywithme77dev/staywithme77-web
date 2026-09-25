import type { Metadata } from "next";
import "../globals.css";
import { IBM_Plex_Sans_Thai, Sarabun } from "next/font/google";
import { siteIcons } from "@/app/lib/seo";


const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "All Links & Contacts | Stay With Me 77",
  description: "รวมลิงก์โซเชียลมีเดีย แผนที่ และช่องทางการติดต่อทั้งหมดของ Stay With Me 77",
  alternates: {
    canonical: "/links",
  },
  robots: {
    index: false,
    follow: true,
  },
  icons: siteIcons,
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      data-scroll-behavior="smooth"
      className={`${ibmPlexSansThai.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="h-full bg-gray-50 font-sans text-gray-900 antialiased">
        <a href="#main-content" className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-md bg-white px-4 py-3 text-sm font-bold text-foreground shadow-lg transition-transform focus:translate-y-0">ข้ามไปยังเนื้อหาหลัก</a>
        {children}
      </body>
    </html>
  );
}



