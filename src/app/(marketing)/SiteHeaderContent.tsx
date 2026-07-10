"use client";

import { cn } from "@/components/ui";
import { getTravelNavigation } from "@/lib/travel-nav";

import { BrandLogo } from "./BrandLogo";
import HeaderClient from "./HeaderClient";

const navigation = {
  travel: getTravelNavigation(),
  callsToAction: [],
  simple: [
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Uses", href: "/uses" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
  ],
};

export function SiteHeaderContent({
  transparent = false,
  className,
}: {
  transparent?: boolean;
  className?: string;
}) {
  return (
    <nav
      aria-label="Global"
      data-layout-container="header"
      className={cn(
        "mx-auto flex w-full max-w-[1080px] items-center justify-between gap-4 py-5",
        className,
      )}
    >
      <BrandLogo
        label="Kristian Elset Bø"
        textClassName={cn(
          "transition-colors duration-300",
          transparent ? "text-[#FAF6EE]" : "text-[#15110C]",
        )}
      />

      <div className="flex items-center gap-2">
        <HeaderClient navigation={navigation} transparent={transparent} />
        <span
          className={cn(
            "hidden rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase lg:inline-block",
            transparent
              ? "bg-[#FAF6EE] text-[#15110C]"
              : "bg-[#15110C] text-[#FAF6EE]",
          )}
        >
          ● Oslo, Norway
        </span>
      </div>
    </nav>
  );
}
