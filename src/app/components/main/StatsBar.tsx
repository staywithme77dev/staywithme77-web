import { Bed, Clock3, ShieldCheck, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [Bed, Star, Clock3, ShieldCheck];

export default function StatsBar() {
  const t = useTranslations("Stats");
  const stats = (t.raw("items") as Array<{value:string; label:string; accent:string}>).map((item, index) => ({...item, icon: icons[index]}));
  return (
    <section aria-label={t("aria")} className="relative overflow-hidden border-y border-[#eadfca] bg-[#f9f5ee] px-4 py-5 sm:py-7">
      <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#dfd2b9]">
        {stats.map(({ icon: Icon, value, label, accent }) => (
          <div key={label} className="group flex items-center gap-3 rounded-2xl border border-[#eadfca] bg-white/75 px-3 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:rounded-none md:border-0 md:bg-transparent md:px-8 md:py-2 md:shadow-none">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8efdc] text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <Icon size={21} strokeWidth={1.8} fill={Icon === Star ? "currentColor" : "none"} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{accent}</p>
              <p className="mt-0.5 truncate text-base font-bold leading-tight text-foreground sm:text-lg">{value}</p>
              <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
