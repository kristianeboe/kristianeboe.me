"use client";

import { useEffect, useState } from "react";

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

export function TransparentHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "hero-header fixed inset-x-0 top-0 z-30 transition-all duration-300",
        scrolled
          ? "bg-background/80 border-border/20 border-b backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <BrandLogo
            textClassName={cn(
              "transition-colors duration-300",
              scrolled ? "text-foreground" : "text-white",
            )}
          />
        </div>

        <HeaderClient navigation={navigation} transparent={!scrolled} />
      </nav>
    </header>
  );
}
