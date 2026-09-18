export type AnalyticsEvent =
  | "view_room"
  | "start_booking"
  | "submit_booking"
  | "booking_success"
  | "click_phone"
  | "click_whatsapp"
  | "search_rooms"
  | "select_checkin"
  | "select_checkout";

export function trackEvent(name: AnalyticsEvent, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
}
