import Link from "next/link";

import { cn } from "@/components/ui";
import { getTravelNavigation } from "@/lib/travel-nav";

import HeaderClient from "./HeaderClient";

// Homepage-only nav: a contained floating pill instead of the site's
// edge-to-edge bar, matching the "Card Tower" design direction. Fixed
// (not absolute-in-hero) so it stays reachable while scrolling the rest
// of the page — everywhere else still uses the standard <Header />.
export function HomeHeader() {
  const navigation = {
    travel: getTravelNavigation(),
    callsToAction: [],
    simple: [
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Speaking", href: "/speaking" },
      { name: "Uses", href: "/uses" },
      { name: "Blog", href: "/blog" },
      { name: "Resume", href: "/resume" },
    ],
  };

  return (
    <header className="hero-header fixed inset-x-5 top-5 z-30 sm:inset-x-7 sm:top-6">
      <nav
        aria-label="Global"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-5 py-2.5",
          "border border-white/55 bg-[#FAF6EE]/80 shadow-[0_16px_40px_rgba(21,17,12,0.16),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-lg",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-[family-name:var(--font-newsreader)] flex size-7 flex-none items-center justify-center rounded-full bg-[#15110C] text-[15px] text-[#FAF6EE] italic">
            k
          </span>
          <span className="text-sm font-semibold text-[#15110C]">
            Kristian Elset Bø
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <HeaderClient navigation={navigation} />
          <span className="font-mono hidden rounded-full bg-[#15110C] px-3 py-1.5 text-[10px] tracking-[0.08em] text-[#FAF6EE] uppercase sm:inline-block">
            ● Oslo, Norway
          </span>
        </div>
      </nav>
    </header>
  );
}
