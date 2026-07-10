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

      <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <HeaderClient navigation={navigation} transparent={transparent} />
      </div>
    </nav>
  );
}
