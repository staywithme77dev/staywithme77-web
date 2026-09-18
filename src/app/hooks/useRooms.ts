"use client";
import { useState, useEffect } from "react";
import type { Room } from "@/app/type/room";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/rooms")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load rooms");
        return res.json() as Promise<{ data: Room[] }>;
      })
      .then(({ data }) => {
        if (!cancelled) setRooms(data);
      })
      .catch(() => {
        if (!cancelled) setRooms([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { rooms, loading };
}
