import type { Metadata } from "next";
import "../globals.css";
import { CookieConsentProvider } from "@/app/components/privacy/CookieConsent";
import GoogleAnalytics from "@/app/components/analytics/GoogleAnalytics";
import { siteMetadata } from "@/app/lib/seo";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { IBM_Plex_Sans_Thai, Sarabun } from "next/font/google";

export const metadata: Metadata = siteMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${ibmPlexSansThai.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="bg-gray-50 font-sans text-gray-900 antialiased">
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Bangkok"
        >
          <CookieConsentProvider>
            {children}
            <GoogleAnalytics />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
