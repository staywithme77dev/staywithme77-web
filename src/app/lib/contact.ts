import { siteConfig } from "@/app/lib/siteConfig";

export type SupportedLocale = "th" | "en";

export function getWhatsAppLink(locale: string, roomName?: string) {
  const language: SupportedLocale = locale === "en" ? "en" : "th";
  const brandName = siteConfig.brand.displayName;
  const message =
    language === "en"
      ? roomName
        ? `Hello, I would like to ask about ${roomName} at ${brandName}.`
        : `Hello, I would like to ask about a room at ${brandName}.`
      : roomName
        ? `สวัสดีครับ ต้องการสอบถามห้อง ${roomName} ที่ ${brandName}`
        : `สวัสดีครับ ต้องการสอบถามห้องพัก ${brandName}`;

  return `${siteConfig.contact.whatsapp.href}?text=${encodeURIComponent(message)}`;
}
