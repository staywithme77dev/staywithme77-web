import type {ReactNode} from "react";
import type {AppLocale} from "@/i18n/routing";

export type LocalizedText = Readonly<Record<AppLocale, string>>;

export interface SocialLink {
  id: string;
  label: LocalizedText;
  sublabel: string | LocalizedText;
  href?: string;
  icon: ReactNode;
  isPrimary?: boolean;
  multiline?: boolean;
  isBookingPlatform?: boolean;
}
