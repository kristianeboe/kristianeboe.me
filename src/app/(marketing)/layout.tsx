import type { Metadata } from "next";

import Footer from "./Footer";
import Header from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s | Kristian Elset Bø",
    default: "Kristian Elset Bø — Software for freedom, outcomes, and stories",
  },
  description:
    "Norwegian founder and engineer in Oslo. Building Homi, SwipeStats, and other tools for deciding where to live, who to meet, and how to move.",
  openGraph: {
    title: "Kristian Elset Bø",
    description:
      "Norwegian founder and engineer in Oslo. Building Homi, SwipeStats, and other tools for more freedom, better outcomes, and good stories.",
    siteName: "kristianeboe.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kristian Elset Bø",
    description:
      "Norwegian founder and engineer in Oslo. Building Homi, SwipeStats, and other tools for more freedom, better outcomes, and good stories.",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background">
      <Header />
      <main className="bg-background relative isolate z-10 shadow-[0_36px_90px_rgba(10,18,16,0.24)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
