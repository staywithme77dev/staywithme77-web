export type SiteLocale = "th" | "en";

type LocalizedText = Readonly<Record<SiteLocale, string>>;

/**
 * Runtime configuration for the property.
 * Keep operational data here; page copy stays in messages/*.
 */
export const siteConfig = {
  brand: {
    name: {
      th: "สเตทวิทมี77",
      en: "StayWithMe77",
    } satisfies LocalizedText,
    displayName: "Stay With Me 77 @Hatyai | Residence",
    shortName: "StayWithMe77",
    tagline: {
      th: "ที่พักกลางหาดใหญ่ บริการห้องพักรายวัน สะอาด ปลอดภัย จองตรงราคาพิเศษ",
      en: "A comfortable stay in Hat Yai with clean rooms, direct booking and thoughtful service.",
    } satisfies LocalizedText,
  },

  contact: {
    phone: {
      icon: "phone",
      display: "081-234-5678",
      href: "tel:0812345678",
    },
    phones: [
      { label: "เบอร์หลัก", display: "081-234-5678", href: "tel:0812345678" },
      { label: "เบอร์สำรอง", display: "064-652-7956", href: "tel:0646527956" },
    ],
    whatsapp: {
      icon: "whatsapp",
      display: "081-234-5678 | 064-652-7956",
      number: "66646527956",
      href: "https://wa.me/66646527956",
    },
    whatsapps: [
      {
        label: "WhatsApp 1",
        display: "081-234-5678",
        number: "66812345678",
        href: "https://wa.me/66812345678",
      },
      {
        label: "WhatsApp 2",
        display: "064-652-7956",
        number: "66646527956",
        href: "https://wa.me/66646527956",
      },
    ],
    line: {
      icon: "line",
      display: "@staywithme77",
      href: "https://line.me/ti/p/~@staywithme77",
    },
    facebook: {
      icon: "facebook",
      display: "StayWithMe77",
      href: "https://www.facebook.com/StayWithMe77Hatyai",
    },
    email: {
      icon: "email",
      display: "info@staywithme77.com",
      href: "mailto:info@staywithme77.com",
    },
  },

  location: {
    name: {
      th: "77 ถนนเพชรเกษม ซอย 10 ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา 90110",
      en: "77 Phetkasem Soi 10, Khlong U Tapao, Hat Yai District, Songkhla 90110",
    } satisfies LocalizedText,
    streetAddress: "77 Phetkasem Soi 10 Road",
    locality: {
      th: "บ้านคอหงส์, หาดใหญ่",
      en: "Ban Kho Hong, Hat Yai",
    } satisfies LocalizedText,
    region: {
      th: "สงขลา",
      en: "Songkhla",
    } satisfies LocalizedText,
    postalCode: "90110",
    countryCode: "TH",
    latitude: 7.0205958,
    longitude: 100.4824341,
    googleMapsUrl: "https://maps.app.goo.gl/EbjjjrQTZnHLmvru6",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=7.0205958,100.4824341&z=16&output=embed",
  },

  assets: {
    logoIconGold: "/logo/icon_gold.png",
    logoGold: "/logo/Logo_gold.png",
    heroBackground: "/hero-bg.jpg",
    agencyLogos: {
      agoda: "/logo/Agency/Agoda-Logo.png",
      airbnb: "/logo/Agency/Airbnb-Logo.png",
      traveloka: "/logo/Agency/Traveloka-Logo.png",
    },
  },

  bookingLinks: {
    direct: "",
    airbnb:
      "https://th.airbnb.com/users/profile/1758426702186390545?previous_page_name=PdpHomeMarketplace&utm_id=97758_v0_s00_e0_tv1_a1den1ncn1l6d1&fbclid=IwY2xjawUPNjpwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMUY2S0Y4RzlScGFFR3RsOWFzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe18IeED4pH4NXODIiwRdOfVQ8u3CUR3WHVizwoy66EbhbynpXYo7_WdPkDSA_aem_wx3923X7cmCgi8orfUcULA",
    agoda: "",
    traveloka: "",
  },

  business: {
    priceRange: "฿฿",
    currency: "THB",
    checkIn: "14:00",
    checkOut: "12:00",
    serviceHours: "08:00–22:00",
  },

  reviews: {
    provider: "Google",
    profileUrl:
      "https://www.google.com/travel/search?q=StayWithMe%2077%20%40HatYai%7C&hl=th-TH&gl=th&ap=ugEHcmV2aWV3cw&ictx=111",
    rating: 4.9,
    reviewCount: 19,
  },

  runtime: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
    googleSiteVerification:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  },

  privacy: {
    consentCookie: {
      name: "swm_cookie_consent",
      version: 1,
      maxAgeSeconds: 60 * 60 * 24 * 180,
    },
    analyticsProvider: "Google Analytics 4",
    marketingEnabled: false,
  },

  seo: {
    keywords: [
      "ที่พักหาดใหญ่",
      "โรงแรมหาดใหญ่",
      "ห้องพักรายวันหาดใหญ่",
      "ที่พักราคาถูกหาดใหญ่",
      "ที่พักใกล้ ม.อ. หาดใหญ่",
      "Hat Yai accommodation",
      "daily room Hat Yai",
    ],
    socialImage: {
      path: "/hero-bg.jpg",
      width: 1200,
      height: 630,
      alt: "Stay With Me 77 ที่พักหาดใหญ่",
    },
  },
} as const;

export function getSiteText(text: LocalizedText, locale: string) {
  return text[locale === "en" ? "en" : "th"];
}
