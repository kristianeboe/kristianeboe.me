import { Newsreader } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
});

export function SimpleLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`${newsreader.variable} bg-[#FAF6EE] text-[#1F1B14]`}>
      <header className="border-b border-[#1F1B14]/10 bg-[#F1EBDD] px-6 pt-24 pb-16 lg:px-8 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-[1080px]">
          {eyebrow && (
            <div className="mb-4 font-mono text-[11px] tracking-[0.08em] text-[#B0573F] uppercase">
              {eyebrow}
            </div>
          )}
          <h1 className="max-w-4xl font-[family-name:var(--font-newsreader)] text-5xl leading-[0.98] tracking-[-0.015em] sm:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#1F1B14]/65">
            {intro}
          </p>
        </div>
      </header>
      {children && (
        <div className="px-6 py-16 lg:px-8 lg:py-22">
          <div className="mx-auto max-w-[1080px]">{children}</div>
        </div>
      )}
    </div>
  );
}
