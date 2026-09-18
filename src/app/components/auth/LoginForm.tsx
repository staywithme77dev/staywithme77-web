"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("Login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-w-0 max-w-md">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-foreground"
      >
        <ArrowLeft size={16} />
        {t("back")}
      </Link>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {t("description")}
        </p>
      </div>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
      >
        <GoogleIcon />
        {t("google")}
      </button>
      <div className="my-7 flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        {t("divider")}
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-foreground">
            {t("email")}
          </span>
          <span className="relative block">
            <Mail
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
            />
          </span>
        </label>
        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {t("password")}
            </span>
            <button
              type="button"
              className="text-xs font-medium text-accent hover:text-[#a8892e]"
            >
              {t("forgot")}
            </button>
          </div>
          <span className="relative block">
            <LockKeyhole
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-[#c9a84c]"
          />
          {t("remember")}
        </label>
        <button
          type="submit"
          className="w-full rounded-xl bg-foreground py-3.5 text-sm font-bold text-white shadow-lg shadow-foreground/10 transition hover:-translate-y-0.5 hover:bg-[#292941]"
        >
          {t("submit")}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        {t("noAccount")}{" "}
        <button
          type="button"
          className="font-bold text-accent hover:text-[#a8892e]"
        >
          {t("register")}
        </button>
      </p>
      <p className="mt-7 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {t("secure")}
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.22c1.89-1.74 2.99-4.3 2.99-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.22-2.51c-.9.6-2.04.96-3.4.96-2.61 0-4.82-1.76-5.62-4.13H3.05v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.38 13.89A6 6 0 0 1 6.06 12c0-.66.11-1.3.32-1.89V7.52H3.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.48l3.33-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.98c1.47 0 2.79.5 3.83 1.49l2.87-2.87C16.97 2.9 14.7 2 12 2a10 10 0 0 0-8.95 5.52l3.33 2.59C7.18 7.74 9.39 5.98 12 5.98Z"
      />
    </svg>
  );
}

