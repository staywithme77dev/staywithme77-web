import type { Metadata } from "next";
import LoginForm from "@/app/components/auth/LoginForm";
import { getTranslations } from "next-intl/server";
import {localizedPageMetadata} from "@/app/lib/seo";
import Image from "next/image";
import { siteConfig } from "@/app/lib/siteConfig";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace:"Login"});
  return { ...localizedPageMetadata({ locale, path: "/login", title: t("metaTitle"), description: t("metaDescription") }), robots: { index: false, follow: false } };
}

export default async function LoginPage() {
  const t = await getTranslations("Login");
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#f9f5ee] px-4 pb-20 pt-32 sm:px-6 lg:pt-36">
      <div className="mx-auto grid min-h-[650px] w-full min-w-0 max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] border border-[#eadfca] bg-white shadow-[0_20px_70px_rgba(26,26,46,0.12)] xl:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-w-0 overflow-hidden bg-foreground xl:block">
          <Image
            src={siteConfig.assets.heroBackground}
            alt=""
            fill
            sizes="(min-width: 1280px) 45vw, 0px"
            className="object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111120] via-[#111120]/35 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-14">
            <p className="text-sm font-semibold tracking-[0.22em] text-accent">{siteConfig.brand.shortName}</p>
            <div>
              <p className="mb-3 text-sm font-medium text-white/70">{t("welcome")}</p>
              <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">{t("heroTitle").split("\n").map((line) => <span key={line} className="block">{line}</span>)}</h1>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{t("heroDescription")}</p>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 items-center justify-center p-6 sm:p-10 lg:p-14">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}


