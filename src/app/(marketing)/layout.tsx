import type { Metadata } from "next";

import Footer from "./Footer";
import Header from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s | Kristian Elset Bø",
    default: "Kristian Elset Bø — Software for the messy parts of modern life",
  },
  description:
    "Norwegian founder and engineer in Brooklyn. Building Homi, SwipeStats, and other tools for deciding where to live, who to meet, and how to move.",
  openGraph: {
    title: "Kristian Elset Bø",
    description:
      "Norwegian founder and engineer in Brooklyn. Building Homi, SwipeStats, and other tools for the messy parts of modern life.",
    siteName: "kristianeboe.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Elset Bø",
    description:
      "Norwegian founder and engineer in Brooklyn. Building Homi, SwipeStats, and other tools for the messy parts of modern life.",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      <Header container />
      <main className="isolate pt-[84px]">{children}</main>
      <Footer />
    </div>
  );
}
