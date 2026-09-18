import type { Metadata } from "next";
import {Link} from "@/i18n/navigation";
import TableOfContents from "@/app/components/ui/TableOfContents";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {localizedPageMetadata} from "@/app/lib/seo";
import { siteConfig } from "@/app/lib/siteConfig";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace:"TermsPage"});
  return localizedPageMetadata({ locale, path: "/terms", title: t("metaTitle"), description: t("metaDescription") });
}

const content = [
  {
    id: "booking",
    title: "1. การจองห้องพัก",
    body: "การจองห้องพักถือว่าสมบูรณ์เมื่อได้รับการยืนยันจากเจ้าหน้าที่ผ่านช่องทาง WhatsApp หรือ Facebook ทั้งนี้ราคาที่แสดงบนเว็บไซต์เป็นราคาต่อคืนและอาจเปลี่ยนแปลงตามช่วงเวลาหรือโปรโมชัน ราคาที่ยืนยันในการจองจะถูกล็อคตลอดระยะเวลาการเข้าพัก",
    list: [
      "กรุณาระบุวันเช็คอิน เช็คเอาท์ และจำนวนผู้เข้าพักให้ถูกต้อง",
      "การจองถือว่าสมบูรณ์เมื่อได้รับข้อความยืนยันจากทางที่พัก",
      "ทางที่พักขอสงวนสิทธิ์ปฏิเสธการจองในกรณีที่ห้องพักไม่ว่าง",
    ],
  },
  {
    id: "payment",
    title: "2. การชำระเงินและการยกเลิก",
    body: "รูปแบบการชำระเงินและนโยบายการยกเลิกมีรายละเอียดดังนี้",
    list: [
      "ชำระเงินสดหรือโอนเงินเมื่อเช็คอิน หรืออาจชำระล่วงหน้าตามที่ตกลงกัน",
      "ยกเลิกฟรีก่อนวันเช็คอิน 48 ชั่วโมง (สำหรับมัดจำที่ชำระแล้ว)",
      "ยกเลิกภายใน 24 ชั่วโมงก่อนเช็คอิน หักค่าบริการ 50% ของราคาคืนแรก",
      "No-show หรือยกเลิกหลังเช็คอิน ไม่คืนเงิน",
    ],
  },
  {
    id: "rules",
    title: "3. กฎระเบียบที่พัก",
    body: "เพื่อความสะดวกสบายของผู้เข้าพักทุกท่าน กรุณาปฏิบัติตามกฎระเบียบดังนี้",
    list: [
      "ห้ามสูบบุหรี่ภายในห้องพักและพื้นที่ส่วนกลางทุกแห่ง",
      "ห้ามนำสัตว์เลี้ยงเข้าพัก",
      "โปรดรักษาความสงบ ห้ามส่งเสียงรบกวน โดยเฉพาะหลังเวลา 22:00 น.",
      "ห้ามนำบุคคลภายนอกเข้าพักโดยไม่แจ้งเจ้าหน้าที่",
      "ผู้พักมีหน้าที่รับผิดชอบค่าเสียหายที่เกิดจากตนเองหรือผู้ร่วมเดินทาง",
    ],
  },
  {
    id: "checkin",
    title: "4. เช็คอิน – เช็คเอาท์",
    body: "กรุณาปฏิบัติตามเวลาที่กำหนด เพื่อให้การบริการทำความสะอาดและเตรียมห้องดำเนินไปได้อย่างราบรื่น",
    list: [
      "เช็คอิน: ตั้งแต่เวลา 14:00 น. เป็นต้นไป",
      "เช็คเอาท์: ก่อนเวลา 12:00 น.",
      "เช็คอินก่อนเวลาหรือเช็คเอาท์ล่าช้าสามารถขอได้ล่วงหน้า (ขึ้นอยู่กับความพร้อมของห้อง อาจมีค่าบริการเพิ่มเติม)",
      "กรุณานำบัตรประชาชนหรือหนังสือเดินทางมาแสดงเพื่อยืนยันตัวตนเมื่อเช็คอิน",
    ],
  },
  {
    id: "liability",
    title: "5. ความรับผิดชอบ",
    body: `${siteConfig.brand.displayName} จะดูแลความปลอดภัยของทรัพย์สินในที่พักอย่างดีที่สุด อย่างไรก็ตาม ทางที่พักไม่รับผิดชอบต่อ`,
    list: [
      "ทรัพย์สินส่วนบุคคลที่สูญหายหรือเสียหายอันเนื่องมาจากความประมาทของผู้เข้าพัก",
      "ความเสียหายอันเกิดจากเหตุสุดวิสัย เช่น ภัยธรรมชาติ ไฟฟ้าดับ หรือเหตุการณ์ที่อยู่นอกเหนือการควบคุม",
      "การสูญหายของยานพาหนะในที่จอดรถ (กล้องวงจรปิดติดตั้งทั่วบริเวณ)",
    ],
  },
  {
    id: "contact",
    title: "6. ติดต่อเรา",
    body: "หากมีข้อสงสัยเกี่ยวกับข้อตกลงนี้ หรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเราได้ที่",
    isContact: true,
  },
];

export default async function TermsPage() {
  const t = await getTranslations("TermsPage");
  const common = await getTranslations("Common");
  const translatedContent = t.raw("sections") as typeof content;
  const localizedContent = translatedContent.length ? translatedContent : content;
  const localizedSections = localizedContent.map(({id, title}) => ({id, title}));
  return (
    <div className="bg-white">
      {/* Header */}
      <section
        className="border-b border-[#f0f0f0] pb-10 pt-36 lg:pb-12 lg:pt-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: t("title") }]} />
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {siteConfig.brand.displayName}
          </p>
          <h1
            className="mb-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground"
          >
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
                <p
                  className="mb-3 px-4 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400"
                >
                  {t("toc")}
                </p>
                <TableOfContents sections={localizedSections} />
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 max-w-3xl">
              {/* Intro */}
              <div
                className="mb-10 space-y-4 text-base leading-relaxed text-gray-600"
              >
                <p>{t("intro")}</p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {localizedContent.map((sec) => (
                  <div key={sec.id} id={sec.id} className="scroll-mt-28">
                    <h2
                      className="mb-3 text-xl font-bold tracking-tight text-foreground"
                    >
                      {sec.title}
                    </h2>
                    <div
                      className="mb-4 h-[2px] w-8 rounded-full bg-accent"
                    />
                    <p className="text-sm leading-relaxed mb-4 text-gray-600">
                      {sec.body}
                    </p>
                    {sec.list && (
                      <ul className="space-y-2.5 mt-3">
                        {sec.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            <span className="text-sm leading-relaxed text-gray-600">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sec.isContact && (
                      <div
                        className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f9f5f0] p-5 sm:p-6"
                      >
                        <p className="font-bold text-sm mb-4 text-foreground">
                          {t("controller")}
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
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

              {/* Back link */}
              <div
                className="mt-16 border-t border-[#f0f0f0] pt-8"
              >
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

