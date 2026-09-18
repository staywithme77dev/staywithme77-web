"use client";

import { useEffect, useState } from "react";

type Section = { id: string; title: string };

export default function TableOfContents({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const updateActiveSection = () => {
      const anchor = 150;
      let currentId = sections[0]?.id ?? "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= anchor) {
          currentId = section.id;
        }
      }

      setActiveId(currentId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 110;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
    history.pushState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav className="space-y-0.5">
      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleClick(e, s.id)}
            className={`block border-l-2 py-2 pl-3 text-sm transition-colors duration-200 ${isActive ? "border-accent font-semibold text-foreground" : "border-transparent font-normal text-gray-500 hover:text-foreground"}`}
          >
            {s.title}
          </a>
        );
      })}
    </nav>
  );
}
