import Link from "next/link";
import clsx from "clsx";

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Card<T extends React.ElementType = "div">({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(
        className,
        "group relative flex flex-col items-start rounded-[20px] border border-white/60 bg-[#FFFDF8] p-6 shadow-[0_18px_50px_rgba(21,17,12,0.07)] transition-shadow hover:shadow-[0_22px_60px_rgba(21,17,12,0.11)]",
      )}
    >
      {children}
    </Component>
  );
}

Card.Link = function CardLink({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="absolute inset-0 z-0 rounded-[20px] bg-[#F1EBDD] opacity-0 transition group-hover:opacity-100" />
      <Link {...props}>
        <span className="absolute inset-0 z-20 rounded-[20px]" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle<T extends React.ElementType = "h2">({
  as,
  href,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, "as" | "href"> & {
  as?: T;
  href?: string;
}) {
  const Component = as ?? "h2";

  return (
    <Component className="font-[family-name:var(--font-newsreader)] text-[27px] leading-tight tracking-[-0.015em] text-[#1F1B14]">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="relative z-10 mt-2 text-sm leading-relaxed text-[#1F1B14]/62">
      {children}
    </p>
  );
};

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-5 flex items-center text-sm font-semibold text-[#1F4D3C]"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, "as" | "decorate"> & {
  as?: T;
  decorate?: boolean;
}) {
  const Component = as ?? "p";

  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center font-mono text-[10px] tracking-[0.08em] text-[#B0573F] uppercase",
        decorate && "pl-3.5",
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-px rounded-full bg-[#B0573F]" />
        </span>
      )}
      {children}
    </Component>
  );
};
