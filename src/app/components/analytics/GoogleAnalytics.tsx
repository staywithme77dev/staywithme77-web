"use client";

import Script from "next/script";
import { useCookieConsent } from "@/app/components/privacy/CookieConsent";
import { siteConfig } from "@/app/lib/siteConfig";

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent();
  const measurementId = siteConfig.runtime.gaMeasurementId;
  if (!measurementId || !consent?.analytics) return null;

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`}
    </Script>
  </>;
}
