"use client";

import { useEffect, useState } from "react";

import { cn } from "@/components/ui";

import { SiteHeaderContent } from "./SiteHeaderContent";

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
          ? "border-b border-[#15110C]/10 bg-[#FAF6EE]/90 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <SiteHeaderContent transparent={!scrolled} />
    </header>
  );
}
