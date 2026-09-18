import type {AppLocale} from "./routing";

const messageFiles = [
  "common",
  "navigation",
  "home/meta",
  "home/hero",
  "home/stats",
  "home/rooms",
  "home/amenities",
  "home/faq",
  "home/location",
  "home/reviews",
  "home/final-cta",
  "home/logo-marquee",
  "home/property-gallery",
  "pages/rooms",
  "pages/room-detail",
  "pages/location",
  "pages/login",
  "pages/privacy",
  "pages/terms",
  "components/date-picker",
  "components/gallery",
  "components/room-card",
  "components/cookie",
  "pages/about",
  "pages/contact",
  "pages/not-found",
  "pages/links",
  "pages/reviews"
] as const;

export async function loadMessages(locale: AppLocale) {
  const modules = await Promise.all(
    messageFiles.map((file) => import(`../../messages/${file}.json`))
  );

  return Object.assign(
    {},
    ...modules.map((module) => module.default[locale])
  );
}
