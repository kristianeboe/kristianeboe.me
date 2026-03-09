"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

import { cn } from "@/components/ui";

import HeaderClient from "./HeaderClient";

const navigation = {
  product: [],
  callsToAction: [],
  simple: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Uses", href: "/uses" },
    { name: "Blog", href: "/blog" },
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
          <Link href="/" className="flex items-center space-x-2">
            <div
              className={cn(
                "flex size-6 items-center justify-center rounded-md transition-colors duration-300",
                scrolled
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/20 text-white",
              )}
            >
              <BarChart3 className="size-4" />
            </div>
            <span
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                scrolled ? "text-foreground" : "text-white",
              )}
            >
              kristianeboe.me
            </span>
          </Link>
        </div>

        <HeaderClient navigation={navigation} transparent={!scrolled} />
      </nav>
    </header>
  );
}
