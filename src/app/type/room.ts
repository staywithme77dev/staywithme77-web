export type RoomStatus = "available" | "unavailable" | "maintenance";

export type RoomImage = {
  id: string;
  url: string;
  sortOrder: number;
  isCover?: boolean;
};

export type RoomBookingLinks = {
  direct?: string;
  airbnb?: string;
  agoda?: string;
  traveloka?: string;
};

export type Room = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  capacity: number;
  price: number;
  currency: string;
  available: boolean;
  status: RoomStatus;
  bedType: string;
  bedTypeEn: string;
  size: number;
  description: string;
  descriptionEn: string;
  image: string;
  images: RoomImage[];
  bookingLinks?: RoomBookingLinks;
  amenityKeys: string[]; // for icon display
  amenities: string[];   // for full text list
  amenitiesEn: string[];
  featured?: boolean;
};

