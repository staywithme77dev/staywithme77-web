type P = { size?: number; className?: string; strokeWidth?: number };

const s = (d: React.ReactNode, { size, className, strokeWidth = 1.75 }: P) => (
  <svg
    width={size ?? 20}
    height={size ?? 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {d}
  </svg>
);

export const WifiIcon = (p: P) => s(<>
  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
  <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
</>, p);

export const CarIcon = (p: P) => s(<>
  <path d="M5 17H3a2 2 0 0 1-2-2V9l3-6h14l3 6v6a2 2 0 0 1-2 2h-2" />
  <circle cx="7" cy="17" r="2" />
  <circle cx="17" cy="17" r="2" />
  <path d="M5 9h14" />
</>, p);

export const SnowflakeIcon = (p: P) => s(<>
  <line x1="12" y1="2" x2="12" y2="22" />
  <line x1="2" y1="12" x2="22" y2="12" />
  <polyline points="9 4 12 7 15 4" />
  <polyline points="4 9 7 12 4 15" />
  <polyline points="15 20 12 17 9 20" />
  <polyline points="20 15 17 12 20 9" />
</>, p);

export const TvIcon = (p: P) => s(<>
  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
  <polyline points="17 2 12 7 7 2" />
</>, p);

export const RefrigeratorIcon = (p: P) => s(<>
  <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z" />
  <line x1="5" y1="10" x2="19" y2="10" />
  <line x1="15" y1="7" x2="15" y2="9" />
  <line x1="15" y1="13" x2="15" y2="16" />
</>, p);

export const ShowerIcon = (p: P) => s(<>
  <path d="M4 12a8 8 0 0 1 16 0" />
  <line x1="12" y1="12" x2="12" y2="22" />
  <path d="M8 22h8" />
  <line x1="9" y1="16" x2="8" y2="18" />
  <line x1="12" y1="16" x2="12" y2="18" />
  <line x1="15" y1="16" x2="16" y2="18" />
</>, p);

export const WindIcon = (p: P) => s(<>
  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
</>, p);

export const LockIcon = (p: P) => s(<>
  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</>, p);

export const ClockIcon = (p: P) => s(<>
  <circle cx="12" cy="12" r="10" />
  <polyline points="12 6 12 12 16 14" />
</>, p);

export const SparklesIcon = (p: P) => s(<>
  <path d="M12 2l1.09 4.26L17 7.5l-3.91 1.24L12 13l-1.09-4.26L7 7.5l3.91-1.24L12 2z" fill="currentColor" stroke="none" />
  <path d="M19 14l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" fill="currentColor" stroke="none" />
  <path d="M4 17l.4 1.6 1.6.4-1.6.4L4 21l-.4-1.6-1.6-.4 1.6-.4L4 17z" fill="currentColor" stroke="none" />
</>, p);

export const ShirtIcon = (p: P) => s(<>
  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
</>, p);

export const BriefcaseIcon = (p: P) => s(<>
  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  <line x1="12" y1="12" x2="12" y2="12" strokeWidth="3" />
  <path d="M12 12h.01" strokeWidth="3" />
</>, p);

export const StarIcon = (p: P) => s(<>
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
</>, p);

export const StarFilledIcon = (p: P) => s(<>
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />
</>, p);

export const CheckIcon = (p: P) => s(<>
  <polyline points="20 6 9 17 4 12" />
</>, p);

export const CheckCircleIcon = (p: P) => s(<>
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  <polyline points="22 4 12 14.01 9 11.01" />
</>, p);

export const XIcon = (p: P) => s(<>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</>, p);

export const MapPinIcon = (p: P) => s(<>
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
  <circle cx="12" cy="10" r="3" />
</>, p);

export const ArrowRightIcon = (p: P) => s(<>
  <line x1="5" y1="12" x2="19" y2="12" />
  <polyline points="12 5 19 12 12 19" />
</>, p);

export const ChevronRightIcon = (p: P) => s(<>
  <polyline points="9 18 15 12 9 6" />
</>, p);

export const UsersIcon = (p: P) => s(<>
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
</>, p);

export const BedIcon = (p: P) => s(<>
  <path d="M2 4v16" />
  <path d="M2 8h18a2 2 0 0 1 2 2v10" />
  <path d="M2 17h20" />
  <path d="M6 8v9" />
</>, p);

export const MaximizeIcon = (p: P) => s(<>
  <polyline points="15 3 21 3 21 9" />
  <polyline points="9 21 3 21 3 15" />
  <line x1="21" y1="3" x2="14" y2="10" />
  <line x1="3" y1="21" x2="10" y2="14" />
</>, p);

export const WhatsAppIcon = (p: P) => (
  <svg
    width={p.size ?? 20}
    height={p.size ?? 20}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={p.className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const PhoneIcon = (p: P) => s(<>
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
</>, p);

export const ShieldIcon = (p: P) => s(<>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
</>, p);

export const CalendarIcon = (p: P) => s(<>
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
  <line x1="16" y1="2" x2="16" y2="6" />
  <line x1="8" y1="2" x2="8" y2="6" />
  <line x1="3" y1="10" x2="21" y2="10" />
</>, p);

export const ChevronDownIcon = (p: P) => s(<>
  <polyline points="6 9 12 15 18 9" />
</>, p);

export const SearchIcon = (p: P) => s(<>
  <circle cx="11" cy="11" r="8" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" />
</>, p);

export const MailIcon = (p: P) => s(<>
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
  <polyline points="22,6 12,13 2,6" />
</>, p);



export const FacebookIcon = (p: P) => s(<>
  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
</>, p);

export const LineIcon = (p: P) => s(<>
  <path d="M21 11.5C21 7.4 17 4 12 4S3 7.4 3 11.5c0 3.6 3.2 6.7 7.5 7.4.3.1.7.2.8.5.1.3.1.6.1.9l-.3 1.6c-.1.3.1.6.4.6.2 0 .3-.1.5-.2l2.8-1.6c.3-.2.5-.3.8-.5 1.3-.4 2.5-1 3.5-1.8 1.3-1 1.9-2.3 1.9-3.9z" />
</>, p);

export const ArrowLeftIcon = (p: P) => s(<>
  <line x1="19" y1="12" x2="5" y2="12" />
  <polyline points="12 19 5 12 12 5" />
</>, p);

export const SmokingOffIcon = (p: P) => s(<>
  <line x1="2" y1="2" x2="22" y2="22" />
  <path d="M12 12H2v4h10.54M20 16h2v-4M18 12a4 4 0 0 0-4-4" />
  <path d="M21.18 11.17c.21.36.32.77.32 1.83" />
</>, p);
