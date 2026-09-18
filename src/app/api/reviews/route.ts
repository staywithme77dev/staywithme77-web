import { NextResponse } from "next/server";
import { getReviews } from "@/app/lib/reviews";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "th";
  const source = url.searchParams.get("source");
  const data = await getReviews(locale);
  const reviews = source && source !== "all"
    ? data.reviews.filter((review) => review.source === source)
    : data.reviews;

  return NextResponse.json(
    { ...data, reviews },
    { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
