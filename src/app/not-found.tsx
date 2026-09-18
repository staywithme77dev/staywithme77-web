"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const isEnglish = pathname?.split("/")[1] === "en";
  const copy = isEnglish
    ? {
        title: "We couldn't find that page",
        description:
          "This page may have moved, disappeared, or never existed. Let’s get you back to a comfortable stay.",
        backHome: "Back home",
        viewRooms: "View rooms",
      }
    : {
        title: "ไม่พบหน้าที่คุณกำลังค้นหา",
        description:
          "ดูเหมือนว่าหน้านี้อาจถูกย้าย ลบ หรือไม่มีอยู่ตั้งแต่แรก ลองกลับไปเลือกห้องพักที่เหมาะกับคุณอีกครั้งนะครับ",
        backHome: "กลับหน้าหลัก",
        viewRooms: "ดูห้องพัก",
      };
  const locale = isEnglish ? "en" : "th";

  return (
    <main className="not-found-page">
      <style>{`
        .not-found-page {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 40px 20px;
          color: #fff;
          background: #17151a;
          font-family: "IBM Plex Sans Thai", "Segoe UI", sans-serif;
        }
        .not-found-page::before {
          content: "";
          position: absolute;
          inset: -32px;
          background: url("/hero-bg.jpg") center / cover;
          filter: blur(22px);
          transform: scale(1.08);
          z-index: 0;
        }
        .not-found-page::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,14,18,.86), rgba(30,25,20,.58) 48%, rgba(12,12,16,.9));
          z-index: 1;
        }
        .not-found-page *, .not-found-page *::before, .not-found-page *::after { box-sizing: border-box; }
        .not-found-content { position: relative; z-index: 2; width: 100%; max-width: 620px; text-align: center; }
        .not-found-home {
          display: flex; align-items: center; justify-content: center; width: 64px; height: 64px;
          margin: 0 auto 38px; color: #c9a84c; border: 1px solid rgba(255,255,255,.28);
          border-radius: 18px; background: rgba(255,255,255,.1); box-shadow: 0 18px 45px rgba(0,0,0,.25);
          backdrop-filter: blur(12px); transition: transform .25s ease;
        }
        .not-found-home:hover { transform: translateY(-4px); }
        .not-found-code {
          margin: 0 0 22px; color: #c9a84c; font-family: "IBM Plex Mono", "Courier New", monospace;
          font-size: clamp(84px, 23vw, 160px); font-weight: 600; line-height: .8; letter-spacing: -.08em;
          text-shadow: 0 8px 30px rgba(201,168,76,.25);
        }
        .not-found-card {
          max-width: 520px; margin: 0 auto; padding: 40px; border: 1px solid rgba(255,255,255,.2);
          border-radius: 32px; background: rgba(0,0,0,.27); box-shadow: 0 24px 80px rgba(0,0,0,.3);
          backdrop-filter: blur(18px);
        }
        .not-found-icon {
          display: flex; align-items: center; justify-content: center; width: 48px; height: 48px;
          margin: 0 auto 20px; color: #c9a84c; border-radius: 50%; background: rgba(201,168,76,.16);
        }
        .not-found-title { margin: 0; font-size: clamp(24px, 5vw, 34px); font-weight: 600; line-height: 1.25; }
        .not-found-description { margin: 12px 0 0; color: rgba(255,255,255,.74); font-family: Sarabun, "Segoe UI", sans-serif; font-size: 18px; line-height: 1.65; }
        .not-found-actions { display: flex; justify-content: center; gap: 12px; margin-top: 32px; }
        .not-found-button {
          display: inline-flex; align-items: center; justify-content: center; min-height: 48px; gap: 8px; padding: 0 24px;
          border-radius: 999px; font-size: 14px; font-weight: 600; text-decoration: none; transition: transform .25s ease, background .25s ease;
        }
        .not-found-button:hover { transform: translateY(-2px); }
        .not-found-button-primary { color: #1a1a2e; background: #c9a84c; box-shadow: 0 10px 28px rgba(201,168,76,.25); }
        .not-found-button-primary:hover { background: #e8c97a; }
        .not-found-button-secondary { color: #fff; border: 1px solid rgba(255,255,255,.28); background: rgba(255,255,255,.1); }
        .not-found-footer { margin-top: 28px; color: rgba(255,255,255,.55); font-family: Sarabun, "Segoe UI", sans-serif; font-size: 14px; }
        @media (max-width: 560px) {
          .not-found-page { padding: 24px 16px; }
          .not-found-home { width: 56px; height: 56px; margin-bottom: 32px; }
          .not-found-card { padding: 28px 20px; border-radius: 26px; }
          .not-found-description { font-size: 16px; }
          .not-found-actions { flex-direction: column; }
          .not-found-button { width: 100%; }
        }
      `}</style>

      <section className="not-found-content">
        <div className="not-found-card">
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">{copy.title}</h1>
          <p className="not-found-description">{copy.description}</p>
          <div className="not-found-actions">
            <Link
              href={`/${locale}`}
              className="not-found-button not-found-button-primary"
            >
              <Home size={17} />
              {copy.backHome}
            </Link>
            <Link
              href={`/${locale}/rooms`}
              className="not-found-button not-found-button-secondary"
            >
              {copy.viewRooms}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
