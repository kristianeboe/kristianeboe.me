import Link from "next/link";
import { BarChart3 } from "lucide-react";

import { cn } from "@/components/ui";

import HeaderClient from "./HeaderClient";

// Navigation structure for the header
const navigation = {
  product: [
    {
      name: "Features",
      description: "See what we can do for you",
      href: "/#features",
      icon: "ChartPieIcon" as const,
    },
    {
      name: "How it Works",
      description: "Learn how it works",
      href: "/#how-it-works",
      icon: "CursorArrowRaysIcon" as const,
    },
    {
      name: "About",
      description: "Learn more about us",
      href: "/#about",
      icon: "FingerPrintIcon" as const,
    },
  ],
  callsToAction: [
    {
      name: "Contact",
      href: "mailto:hello@example.com",
      icon: "PhoneIcon" as const,
    },
  ],
  simple: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Uses", href: "/uses" },
    { name: "Blog", href: "/blog" },
  ],
};

interface HeaderProps {
  container?: boolean;
  showBanner?: boolean;
  transparent?: boolean;
}

export default function Header({
  container = false,
  showBanner = false,
  transparent = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "inset-x-0 z-30",
        transparent
          ? "fixed top-0 bg-transparent"
          : "bg-background/10 border-border/20 sticky border-b backdrop-blur-sm",
        !transparent && (showBanner ? "top-28 md:top-16 lg:top-12" : "top-0"),
      )}
    >
      <nav
        aria-label="Global"
        className={cn(
          "flex items-center justify-between p-6 lg:px-8",
          container ? "mx-auto max-w-7xl" : "mx-auto max-w-7xl",
        )}
      >
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <BarChart3 className="size-4" />
            </div>
            <span className="text-xl font-bold">kristianeboe.me</span>
          </Link>
        </div>

        <HeaderClient navigation={navigation} />
      </nav>
    </header>
  );
}
