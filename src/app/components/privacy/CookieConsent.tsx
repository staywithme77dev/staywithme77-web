"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Settings, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {Link} from "@/i18n/navigation";
import { siteConfig } from "@/app/lib/siteConfig";

const { consentCookie } = siteConfig.privacy;
const OPEN_SETTINGS_EVENT = "swm-open-cookie-settings";

export type CookieConsent = {
  version: number;
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  openSettings: () => void;
  saveConsent: (analytics: boolean, marketing: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function readConsent(): CookieConsent | null {
  const prefix = `${consentCookie.name}=`;
  const raw = document.cookie
    .split("; ")
    .find((item) => item.startsWith(prefix))
    ?.slice(prefix.length);
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw)) as CookieConsent;
    return value.version === consentCookie.version && value.essential === true ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean, marketing: boolean): CookieConsent {
  const value: CookieConsent = { version: consentCookie.version, essential: true, analytics, marketing };
  document.cookie = `${consentCookie.name}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${consentCookie.maxAgeSeconds}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  return value;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  return context;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const hydrateConsent = window.setTimeout(() => {
      const stored = readConsent();
      if (stored) {
        setConsent(stored);
        setAnalytics(stored.analytics);
        setMarketing(stored.marketing);
      }
      setHasHydrated(true);
    }, 0);
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => {
      window.clearTimeout(hydrateConsent);
      window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const saveConsent = (allowAnalytics: boolean, allowMarketing: boolean) => {
    const next = writeConsent(allowAnalytics, allowMarketing && siteConfig.privacy.marketingEnabled);
    setConsent(next);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setSettingsOpen(false);
  };

  const value = useMemo(() => ({
    consent,
    openSettings: () => setSettingsOpen(true),
    saveConsent,
  }), [consent]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {hasHydrated && !consent && !settingsOpen && (
        <CookiePanel onAccept={() => saveConsent(true, false)} onReject={() => saveConsent(false, false)} onSettings={() => setSettingsOpen(true)} />
      )}
      {settingsOpen && (
        <CookieSettings analytics={analytics} marketing={marketing} setAnalytics={setAnalytics} setMarketing={setMarketing} onSave={() => saveConsent(analytics, marketing)} onClose={() => setSettingsOpen(false)} />
      )}
    </CookieConsentContext.Provider>
  );
}

function CookiePanel({ onAccept, onReject, onSettings }: { onAccept: () => void; onReject: () => void; onSettings: () => void }) {
  const t = useTranslations("Cookie");
  return (
    <aside className="fixed inset-x-3 bottom-3 z-[140] mx-auto max-w-3xl rounded-2xl border border-[#eadfca] bg-white p-5 shadow-[0_20px_70px_rgba(26,26,46,0.2)] sm:inset-x-6 sm:p-6" aria-label={t("label")}>
      <p className="text-sm font-bold text-foreground">{t("title")}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{t("description")} <Link href="/privacy#cookies" className="font-semibold text-accent underline">{t("privacy")}</Link></p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onSettings} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:border-accent hover:text-foreground"><Settings size={14} /> {t("settings")}</button>
        <button type="button" onClick={onReject} className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50">{t("reject")}</button>
        <button type="button" onClick={onAccept} className="rounded-xl bg-foreground px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#292941]">{t("accept")}</button>
      </div>
    </aside>
  );
}

function CookieSettings({ analytics, marketing, setAnalytics, setMarketing, onSave, onClose }: { analytics: boolean; marketing: boolean; setAnalytics: (value: boolean) => void; setMarketing: (value: boolean) => void; onSave: () => void; onClose: () => void }) {
  const t = useTranslations("Cookie");
  return (
    <div className="fixed inset-0 z-[150] flex items-end justify-center bg-black/40 p-3 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Privacy choices</p><h2 id="cookie-settings-title" className="mt-1 text-xl font-bold text-foreground">{t("settingsTitle")}</h2></div><button type="button" onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-foreground" aria-label={t("close")}><X size={18} /></button></div>
        <div className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-200">
          <CookieOption title={t("essential")} description={t("essentialDesc")} checked disabled onChange={() => undefined} />
          <CookieOption title={t("analytics")} description={t("analyticsDesc")} checked={analytics} onChange={setAnalytics} />
          <CookieOption title={t("marketing")} description={t("marketingDesc")} checked={marketing} disabled={!siteConfig.privacy.marketingEnabled} onChange={setMarketing} />
        </div>
        <button type="button" onClick={onSave} className="mt-6 w-full rounded-xl bg-foreground py-3 text-sm font-bold text-white transition hover:bg-[#292941]">{t("save")}</button>
      </div>
    </div>
  );
}

function CookieOption({ title, description, checked, disabled = false, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center justify-between gap-4 p-4"><span><span className="block text-sm font-semibold text-foreground">{title}</span><span className="mt-0.5 block text-xs text-gray-500">{description}</span></span><input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-[#c9a84c]" /></label>;
}
