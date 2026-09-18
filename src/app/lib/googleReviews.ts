type GooglePlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string };
  }>;
};

export type GoogleReviewSummary = {
  rating: number;
  reviewCount: number;
  reviews: Array<{
    name: string;
    source: "Google";
    date: string;
    text: string;
    rating: number;
  }>;
};

/**
 * Reads public Google reviews through Places API (New) when production
 * credentials are available. The request is server-only and cached to avoid
 * turning every page view into a paid API request.
 */
export async function getGoogleReviews(): Promise<GoogleReviewSummary | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return null;

    const place = (await response.json()) as GooglePlaceResponse;
    const reviews = (place.reviews ?? [])
      .map((review) => ({
        name: review.authorAttribution?.displayName || "Google guest",
        source: "Google" as const,
        date: review.relativePublishTimeDescription || "",
        text: review.originalText?.text || review.text?.text || "",
        rating: Math.round(review.rating ?? 5),
      }))
      .filter((review) => review.text);

    return {
      rating: place.rating ?? 0,
      reviewCount: place.userRatingCount ?? reviews.length,
      reviews,
    };
  } catch {
    return null;
  }
}
