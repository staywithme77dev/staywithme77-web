import roomContent from "@/../messages/data/rooms.json";
import type { Room, RoomBookingLinks, RoomImage, RoomStatus } from "@/app/type/room";

/**
 * Database-shaped room model.
 *
 * A future repository can return this same shape from PostgreSQL, Supabase,
 * Prisma, or a CMS. Translations, pricing, availability, and media are kept
 * as separate concerns so the UI does not become the database contract.
 */
export type RoomDbTranslation = {
  name: string;
  bedType: string;
  description: string;
  amenities: string[];
};

export type RoomDbRecord = {
  id: string;
  slug: string;
  capacity: number;
  sizeSqm: number;
  pricing: {
    amount: number;
    currency: string;
    unit: "night";
  };
  availability: {
    status: RoomStatus;
  };
  featured: boolean;
  amenityKeys: string[];
  images: RoomImage[];
  bookingLinks?: RoomBookingLinks;
  translations: {
    th: RoomDbTranslation;
    en: RoomDbTranslation;
  };
};

type RawRoom = {
  id: string;
  slug: string;
  capacity: number;
  price: number;
  available: boolean;
  size: number;
  image: string | string[] | RawRoomImage[];
  amenityKeys: string[];
  featured?: boolean;
  bookingLinks?: RoomBookingLinks;
  th: RoomDbTranslation;
  en: RoomDbTranslation;
};

type RawRoomImage = {
  url: string;
  sortOrder?: number;
  isCover?: boolean;
};

function toImageRecords(
  roomId: string,
  image: string | string[] | RawRoomImage[],
): RoomImage[] {
  const entries = (Array.isArray(image) ? image : [image]).map((entry, index) =>
    typeof entry === "string"
      ? { url: entry, sortOrder: index, isCover: index === 0 }
      : {
          url: entry.url,
          sortOrder: entry.sortOrder ?? index,
          isCover: entry.isCover ?? false,
        },
  );

  return entries.map((entry, index) => ({
    id: roomId + "-image-" + (index + 1),
    ...entry,
  })).sort((a, b) => a.sortOrder - b.sortOrder);
}

function toStatus(available: boolean): RoomStatus {
  return available ? "available" : "unavailable";
}

export const mockRoomRecords: RoomDbRecord[] = (
  roomContent.rooms as RawRoom[]
).map((room) => ({
  id: room.id,
  slug: room.slug,
  capacity: room.capacity,
  sizeSqm: room.size,
  pricing: {
    amount: room.price,
    currency: "THB",
    unit: "night",
  },
  availability: {
    status: toStatus(room.available),
  },
  featured: room.featured ?? false,
  amenityKeys: room.amenityKeys,
  images: toImageRecords(room.id, room.image),
  bookingLinks: room.bookingLinks,
  translations: {
    th: room.th,
    en: room.en,
  },
}));

/**
 * UI adapter. Keep flattened fields here while pages migrate to the
 * database-shaped record. RoomCard and RoomGallery can consume this safely.
 */
export const mockRooms: Room[] = mockRoomRecords.map((room) => {
  const coverImage =
    room.images.find((image) => image.isCover)?.url ?? room.images[0]?.url ?? "";

  return {
    id: room.id,
    slug: room.slug,
    name: room.translations.th.name,
    nameEn: room.translations.en.name,
    capacity: room.capacity,
    price: room.pricing.amount,
    currency: room.pricing.currency,
    available: room.availability.status === "available",
    status: room.availability.status,
    bedType: room.translations.th.bedType,
    bedTypeEn: room.translations.en.bedType,
    size: room.sizeSqm,
    description: room.translations.th.description,
    descriptionEn: room.translations.en.description,
    image: coverImage,
    images: room.images,
    bookingLinks: room.bookingLinks,
    amenityKeys: room.amenityKeys,
    amenities: room.translations.th.amenities,
    amenitiesEn: room.translations.en.amenities,
    featured: room.featured,
  };
});

export const featuredRooms = mockRooms.filter((room) => room.featured);

export function getMockRoomById(id: string) {
  return mockRooms.find((room) => room.id === id);
}

export function getMockRoomBySlug(slug: string) {
  return mockRooms.find((room) => room.slug === slug);
}

export function getMockRoomRecordById(id: string) {
  return mockRoomRecords.find((room) => room.id === id);
}




