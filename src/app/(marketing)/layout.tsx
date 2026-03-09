import type { Metadata } from "next";

import Footer from "./Footer";
import Header from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s | AppName",
    default: "AppName - Your App Description",
  },
  description:
    "A brief description of what your app does and how it helps users.",
  openGraph: {
    title: "AppName - Your App Description",
    description:
      "A brief description of what your app does and how it helps users.",
    siteName: "AppName",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppName - Your App Description",
    description:
      "A brief description of what your app does and how it helps users.",
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
