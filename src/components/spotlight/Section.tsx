import { useId } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = useId();

  return (
    <section
      aria-labelledby={id}
      className="border-t border-[#1F1B14]/12 pt-8 sm:pt-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2
          id={id}
          className="font-[family-name:var(--font-newsreader)] text-3xl tracking-[-0.015em] text-[#1F1B14] sm:text-[34px]"
        >
          {title}
        </h2>
        <span className="font-mono text-[10px] tracking-[0.08em] text-[#B0573F] uppercase">
          Field notes
        </span>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}
