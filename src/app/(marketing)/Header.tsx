import Link from "next/link";

import { cn } from "@/components/ui";
import { getTravelNavigation } from "@/lib/travel-nav";

import HeaderClient from "./HeaderClient";

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
  // Navigation structure for the header
  const navigation = {
    travel: getTravelNavigation(),
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
      { name: "Resume", href: "/downloads/kristian-elset-boe-cv.pdf" },
    ],
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30",
        "bg-background/10 border-border/20 border-b backdrop-blur-sm",
        showBanner && "top-28 md:top-16 lg:top-12",
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
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">kristianeboe.me</span>
          </Link>
        </div>

        <HeaderClient navigation={navigation} />
      </nav>
    </header>
  );
}
