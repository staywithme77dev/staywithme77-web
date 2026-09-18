import { NextResponse } from "next/server";
import { mockRooms } from "@/app/lib/mockDb";

export async function GET() {
  return NextResponse.json({ data: mockRooms });
}
