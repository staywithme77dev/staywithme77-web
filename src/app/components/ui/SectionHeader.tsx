type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
};

export default function SectionHeader({ title, subtitle, align = "center", light = false, as = "h2" }: SectionHeaderProps) {
  const isCenter = align === "center";
  const Heading = as;
  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <Heading className={`mb-3 text-pretty text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight tracking-[-0.01em] ${light ? "text-white" : "text-foreground"}`}>{title}</Heading>
      <span className={`mb-4 block h-[3px] w-10 rounded-full bg-gradient-to-r from-accent to-[#e8c97a] ${isCenter ? "mx-auto" : ""}`} aria-hidden="true" />
      {subtitle ? <p className={`max-w-xl text-pretty text-sm leading-relaxed md:text-base ${light ? "text-white/65" : "text-gray-500"} ${isCenter ? "mx-auto" : ""}`}>{subtitle}</p> : null}
    </div>
  );
}


