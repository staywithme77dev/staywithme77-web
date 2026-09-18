import { Mail, MapPin, Phone } from "lucide-react";
import linksMessages from "@/../messages/pages/links.json";
import { FacebookIcon, LineIcon, WhatsAppIcon } from "@/app/components/icons/BrandIcons";
import { siteConfig } from "@/app/lib/siteConfig";
import type { SocialLink } from "@/app/types/socialLink";

export function getContactLinks(): SocialLink[] {
  const copy = linksMessages;
  return [
    { id: "map", label: { th: copy.th.LinksPage.map, en: copy.en.LinksPage.map }, sublabel: siteConfig.location.name, multiline: true, href: siteConfig.location.googleMapsUrl, icon: <MapPin className="h-5 w-5" /> },
    { id: "facebook", label: { th: copy.th.LinksPage.facebook, en: copy.en.LinksPage.facebook }, sublabel: siteConfig.contact.facebook.display, href: siteConfig.contact.facebook.href, icon: <FacebookIcon /> },
    { id: "line", label: { th: copy.th.LinksPage.line, en: copy.en.LinksPage.line }, sublabel: siteConfig.contact.line.display, href: siteConfig.contact.line.href, icon: <LineIcon /> },
    { id: "whatsapp", label: { th: copy.th.LinksPage.whatsapp, en: copy.en.LinksPage.whatsapp }, sublabel: siteConfig.contact.whatsapp.display, href: siteConfig.contact.whatsapp.href, icon: <WhatsAppIcon /> },
    { id: "phone", label: { th: copy.th.LinksPage.phone, en: copy.en.LinksPage.phone }, sublabel: siteConfig.contact.phone.display, href: siteConfig.contact.phone.href, icon: <Phone className="h-5 w-5" /> },
    { id: "email", label: { th: copy.th.LinksPage.email, en: copy.en.LinksPage.email }, sublabel: siteConfig.contact.email.display, href: siteConfig.contact.email.href, icon: <Mail className="h-5 w-5" /> },
  ];
}

