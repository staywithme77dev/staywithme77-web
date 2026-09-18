import type { Metadata } from "next";
import {Link} from "@/i18n/navigation";
import TableOfContents from "@/app/components/ui/TableOfContents";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import CookieSettingsButton from "@/app/components/privacy/CookieSettingsButton";
import { getTranslations } from "next-intl/server";
import {localizedPageMetadata} from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace:"PrivacyPage"});
  return localizedPageMetadata({ locale, path: "/privacy", title: t("metaTitle"), description: t("metaDescription") });
}

const content = [
  {
    id: "data-collection",
    title: "1. การเก็บรวบรวมข้อมูลส่วนบุคคล",
    body: `${siteConfig.brand.displayName} เก็บรวบรวมข้อมูลส่วนบุคคลเท่าที่จำเป็นสำหรับการให้บริการจองห้องพัก ได้แก่ ชื่อ–นามสกุล หมายเลขโทรศัพท์ วันที่เช็คอิน/เช็คเอาท์ จำนวนผู้เข้าพัก และข้อมูลการติดต่อผ่าน WhatsApp หรือ Facebook รวมถึงข้อมูลทางเทคนิคของอุปกรณ์ (IP Address) ผ่านคุกกี้วิเคราะห์การใช้งานเว็บไซต์`,
  },
  {
    id: "purpose",
    title: "2. วัตถุประสงค์ในการใช้ข้อมูล",
    body: "ข้อมูลที่เก็บรวบรวมจะถูกนำมาใช้เพื่อวัตถุประสงค์ดังต่อไปนี้",
    list: [
      "ยืนยันและจัดการการจองห้องพักของคุณ",
      "ติดต่อสื่อสารก่อน–ระหว่าง–หลังการเข้าพัก",
      "ส่งข้อมูลโปรโมชัน ส่วนลด หรือข่าวสารจากที่พัก (กรณีได้รับความยินยอม)",
      "ปรับปรุงคุณภาพการบริการของที่พัก",
    ],
  },
  {
    id: "security",
    title: "3. การเก็บรักษาและความปลอดภัยของข้อมูล",
    body: "เรามีมาตรการรักษาความมั่นคงปลอดภัยอย่างเข้มงวด โดยเก็บข้อมูลในระบบที่ได้รับการป้องกันและจำกัดการเข้าถึงเฉพาะบุคลากรที่เกี่ยวข้องเท่านั้น ข้อมูลจะถูกเก็บไว้ไม่เกิน 3 ปี นับจากวันที่เช็คเอาท์ครั้งสุดท้าย หรือจนกว่าจะได้รับการร้องขอให้ลบออก",
  },
  {
    id: "pdpa-rights",
    title: "4. สิทธิ์ของท่านตามกฎหมาย PDPA",
    body: "ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) ท่านมีสิทธิ์ดำเนินการดังนี้",
    list: [
      "เพิกถอนความยินยอมในการประมวลผลข้อมูลได้ทุกเมื่อ",
      "ขอเข้าถึงและรับสำเนาข้อมูลส่วนบุคคลของตนเอง",
      "ขอแก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน",
      "ขอลบหรือระงับการใช้งานข้อมูลส่วนบุคคล",
      "ขอให้โอนย้ายข้อมูลส่วนบุคคลในรูปแบบที่อ่านได้ด้วยเครื่องมืออัตโนมัติ",
    ],
  },
  {
    id: "cookies",
    title: "5. การใช้คุกกี้ (Cookies)",
    body: "เว็บไซต์ของเราใช้คุกกี้เพื่อให้เว็บไซต์ทำงานได้ตามปกติและปรับปรุงประสบการณ์การใช้งาน โดยคุณสามารถเลือกยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็นได้ผ่านแบนเนอร์หรือเมนูตั้งค่าคุกกี้",
    list: [
      `swm_cookie_consent — คุกกี้จำเป็นสำหรับจำการตั้งค่าความยินยอม อายุ 180 วัน ผู้ให้บริการ: ${siteConfig.brand.displayName}`,
      "คุกกี้จำเป็น (Essential) — ช่วยให้การเลือกวันและจำนวนผู้เข้าพักทำงานได้ปกติ ไม่สามารถปิดได้",
      "คุกกี้วิเคราะห์ (Analytics) — Google Analytics ใช้สถิติแบบไม่ระบุตัวบุคคลเพื่อปรับปรุงเว็บไซต์ และจะโหลดเมื่อได้รับความยินยอมเท่านั้น",
      "คุกกี้การตลาด (Marketing) — ยังไม่มีการติดตั้งในขณะนี้ และจะไม่ทำงานโดยอัตโนมัติ",
      "คุณสามารถถอนความยินยอมได้ทุกเมื่อจากปุ่ม “จัดการคุกกี้” ในส่วนท้ายเว็บไซต์",
    ],
  },
  {
    id: "contact",
    title: "6. การติดต่อเรา",
    body: "หากต้องการใช้สิทธิ์ตาม PDPA หรือมีคำถามเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราได้ที่",
    isContact: true,
  },
];

export default async function PrivacyPage() {
  const t = await getTranslations("PrivacyPage");
  const common = await getTranslations("Common");
  const translatedContent = t.raw("sections") as typeof content;
  const localizedContent = translatedContent.length ? translatedContent : content;
  const localizedSections = localizedContent.map(({id, title}) => ({id, title}));
  const intro = t.raw("intro") as string[];
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-[#f0f0f0] pb-10 pt-36 lg:pb-12 lg:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: t("title") }]} />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {siteConfig.brand.displayName}
          </p>
          <h1 className="mb-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-400">
            {t("updated")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Sidebar TOC */}
            <aside className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-28">
                <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  {t("toc")}
                </p>
                <TableOfContents sections={localizedSections} />
              </div>
            </aside>

            {/* Main content */}
            <div className="max-w-3xl flex-1">
              {/* Intro */}
              <div className="mb-10 space-y-4 text-base leading-relaxed text-gray-600">
                {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {localizedContent.map((sec) => (
                  <div key={sec.id} id={sec.id} className="scroll-mt-28">
                    <h2 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                      {sec.title}
                    </h2>
                    <div className="mb-4 h-[2px] w-8 rounded-full bg-accent" />
                    <p className="mb-4 text-sm leading-relaxed text-gray-600">
                      {sec.body}
                    </p>
                    {sec.list && (
                      <ul className="space-y-2.5 mt-3">
                        {sec.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span className="text-sm leading-relaxed text-gray-600">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sec.isContact && (
                      <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f9f5f0] p-5 sm:p-6">
                        <p className="mb-4 text-sm font-bold text-foreground">
                          {t("controller")}
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <MapPin
                              size={16}
                              className="mt-0.5 shrink-0 text-accent"
                            />
                            <span className="text-sm text-gray-600">
                              {t("address")}
                            </span>
                          </li>
                          <li className="flex items-center gap-3">
                            <Mail size={15} className="shrink-0 text-accent" />
                            <a
                              href={siteConfig.contact.email.href}
                              className="text-sm text-gray-600 transition-colors hover:text-accent"
                            >
                              {siteConfig.contact.email.display}
                            </a>
                          </li>
                          <li className="flex items-center gap-3">
                            <Phone size={15} className="shrink-0 text-accent" />
                            <a
                              href={siteConfig.contact.phone.href}
                              className="text-sm text-gray-600 transition-colors hover:text-accent"
                            >
                              {siteConfig.contact.phone.display}
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-[#eadfca] bg-[#f9f5f0] p-5 text-sm text-gray-600">
                {t("changeCookies")} <CookieSettingsButton />
              </div>

              {/* Back link */}
              <div className="mt-16 border-t border-[#f0f0f0] pt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-accent"
                >
                  <ArrowLeft size={16} />
                  {common("backHome")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

