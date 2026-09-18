"use client";

import { useEffect } from "react";
import { trackEvent } from "@/app/components/analytics/events";

export default function RoomViewTracker({ roomId, roomName }: { roomId: string; roomName: string }) {
  useEffect(() => {
    trackEvent("view_room", { room_id: roomId, room_name: roomName });
  }, [roomId, roomName]);
  return null;
}
