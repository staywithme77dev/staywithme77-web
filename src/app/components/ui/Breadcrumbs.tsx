import {Link} from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "@/app/components/seo/JsonLd";
import { absoluteUrl, localizedPath } from "@/app/lib/seo";
import { useLocale, useTranslations } from "next-intl";

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("Breadcrumbs");
  const locale = useLocale();
  const breadcrumbItems = [{ label: t("home"), href: "/" }, ...items];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: absoluteUrl(localizedPath(locale, item.href ?? "/")),
        })),
      }} />
      <nav
        aria-label={t("aria")}
        className="scrollbar-none mb-5 flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 text-xs text-gray-400 sm:mb-6 md:mt-[20px]"
      >
      <Link
        href="/"
        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
      >
        <Home size={13} /> {t("home")}
      </Link>
      {items.map((item) => (
        <span
          key={`${item.href ?? "current"}-${item.label}`}
          className="flex shrink-0 items-center gap-1.5"
        >
          <ChevronRight
            size={13}
            className="text-gray-300"
            aria-hidden="true"
          />
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
      </nav>
    </>
  );
}
