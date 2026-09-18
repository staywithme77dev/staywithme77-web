import { getGoogleReviews } from "@/app/lib/googleReviews";

import reviewMessages from "../../../messages/home/reviews.json";

export type ReviewSource = "google" | "airbnb" | "facebook" | "manual";

export type Review = {
  id: string;
  source: ReviewSource;
  sourceLabel: string;
  name: string;
  date: string;
  text: string;
  rating: number;
};

type ReviewMessageLocale = {
  Reviews: {
    sourceLabels?: Record<string, string>;
    items: Array<[string, string, string, string]>;
  };
};

const sourceOrder: ReviewSource[] = ["google", "airbnb", "facebook", "manual"];

function sourceKey(value: string): ReviewSource {
  const normalized = value.toLowerCase();
  if (normalized === "airbnb") return "airbnb";
  if (normalized === "facebook") return "facebook";
  if (normalized === "manual") return "manual";
  return "google";
}

function getMessages(locale: string): ReviewMessageLocale {
  const key = locale === "en" ? "en" : "th";
  return reviewMessages[key] as unknown as ReviewMessageLocale;
}

export function getMockReviews(locale: string): Review[] {
  const messages = getMessages(locale);

  const items = [...messages.Reviews.items];
  if (!items.some(([, source]) => sourceKey(source) === "airbnb")) {
    items.push(
      locale === "en"
        ? ["Jane P.", "Airbnb", "October 2025", "Clean, peaceful accommodation with an easy location. The host was thoughtful and helpful throughout our stay."]
        : ["\u0e1c\u0e39\u0e49\u0e40\u0e02\u0e49\u0e32\u0e1e\u0e31\u0e01 Airbnb", "Airbnb", "\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21 2568", "\u0e17\u0e35\u0e48\u0e1e\u0e31\u0e01\u0e2a\u0e30\u0e2d\u0e32\u0e14 \u0e40\u0e07\u0e35\u0e22\u0e1a\u0e2a\u0e07\u0e1a \u0e40\u0e14\u0e34\u0e19\u0e17\u0e32\u0e07\u0e2a\u0e30\u0e14\u0e27\u0e01 \u0e41\u0e25\u0e30\u0e40\u0e08\u0e49\u0e32\u0e02\u0e2d\u0e07\u0e14\u0e39\u0e41\u0e25\u0e14\u0e35\u0e21\u0e32\u0e01"],
    );
  }

  return items.map(([name, source, date, text], index) => {
    const sourceId = sourceKey(source);
    return {
      id: `mock-${sourceId}-${index + 1}`,
      source: sourceId,
      sourceLabel: messages.Reviews.sourceLabels?.[sourceId] ?? source,
      name,
      date,
      text,
      rating: 5,
    };
  });
}

export async function getReviews(locale: string) {
  const messages = getMessages(locale);
  const mockReviews = getMockReviews(locale);
  const google = await getGoogleReviews();

  const googleReviews: Review[] = google?.reviews.length
    ? google.reviews.map((review, index) => ({
        id: `google-${index + 1}`,
        source: "google",
        sourceLabel: messages.Reviews.sourceLabels?.google ?? "Google",
        name: review.name,
        date: review.date,
        text: review.text,
        rating: review.rating,
      }))
    : [];

  const reviews = [
    ...googleReviews,
    ...mockReviews.filter((review) => review.source !== "google"),
  ].sort((a, b) => {
    const sourceDifference = sourceOrder.indexOf(a.source) - sourceOrder.indexOf(b.source);
    return sourceDifference || b.id.localeCompare(a.id);
  });

  return {
    reviews,
    rating: google?.rating || 0,
    reviewCount: google?.reviewCount ?? 0,
    isGoogleLive: Boolean(google),
  };
}
