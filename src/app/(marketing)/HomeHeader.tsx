import { cn } from "@/components/ui";
import { getTravelNavigation } from "@/lib/travel-nav";

import { BrandLogo } from "./BrandLogo";
import HeaderClient from "./HeaderClient";

// Homepage-only nav, contained within the hero rather than using the site's
// edge-to-edge header.
export function HomeHeader() {
  const navigation = {
    travel: getTravelNavigation(),
    callsToAction: [],
    simple: [
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
    ],
  };

  return (
    <header className="hero-header relative z-10 px-6 pt-5 sm:px-8 sm:pt-6">
      <nav
        aria-label="Global"
        className={cn(
          "mx-auto flex max-w-[1080px] items-center justify-between gap-4 py-2.5",
        )}
      >
        <BrandLogo
          label="Kristian Elset Bø"
          markClassName="size-7 rounded-[6px]"
          textClassName="whitespace-nowrap text-sm font-semibold text-[#15110C]"
        />

        <div className="flex items-center gap-2">
          <HeaderClient navigation={navigation} />
          <span className="hidden rounded-full bg-[#15110C] px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-[#FAF6EE] uppercase sm:inline-block">
            ● Oslo, Norway
          </span>
        </div>
      </nav>
    </header>
  );
}
