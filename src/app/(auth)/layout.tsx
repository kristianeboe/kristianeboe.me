import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | App Name",
    default: "App Name - Your App Description",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
