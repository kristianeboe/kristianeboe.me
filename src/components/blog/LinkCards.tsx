import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CardLink {
  label: string;
  href: string;
  name: string;
  image?: string;
  imageAlt?: string;
}

export function LinkCards({ links }: { links: CardLink[] }) {
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name} on ${link.label} (opens in a new tab)`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-[#15110C]/10 bg-[#FAF6EE] transition-colors hover:border-[#B0573F]/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B0573F]"
        >
          {link.image && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={link.image}
                alt={link.imageAlt ?? link.name}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-5">
            <span className="text-xs font-medium tracking-wide text-[#15110C]/55 uppercase">
              {link.label}
            </span>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#15110C]">
              {link.name}
            </h3>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#B0573F]">
              {link.label === "Website"
                ? "Visit website"
                : `View on ${link.label}`}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
