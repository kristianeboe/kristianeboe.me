import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { cn } from "@/components/ui";

interface Place {
  name: string;
  category: string;
  note: string;
  website?: string;
  websiteLabel?: string;
  mapsQuery: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
}

/** Personal recommendations with optional photos and clear website/map actions. */
export function PlaceCards({
  places,
  stacked = false,
}: {
  places: Place[];
  stacked?: boolean;
}) {
  if (!places.length) return null;

  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
      {places.map((place, index) => (
        <article
          key={place.name}
          className={cn(
            "flex flex-col overflow-hidden rounded-2xl border border-[#15110C]/10 bg-[#FAF6EE]",
            places.length === 1 && "sm:col-span-2",
            places.length === 1 && !stacked && "sm:flex-row",
            places.length > 1 &&
              places.length % 2 === 1 &&
              index === places.length - 1 &&
              "sm:col-span-2",
          )}
        >
          {place.image && (
            <div
              className={cn(
                "relative aspect-[16/9]",
                places.length === 1 &&
                  !stacked &&
                  "sm:aspect-auto sm:w-2/5 sm:shrink-0",
              )}
            >
              <Image
                src={place.image}
                alt={place.imageAlt ?? place.name}
                fill
                sizes="(min-width: 640px) 420px, 100vw"
                className="object-cover"
              />
              {place.imageCredit && (
                <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white">
                  Photo: {place.imageCredit}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="text-xs font-medium tracking-wide text-[#15110C]/55 uppercase">
              {place.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#15110C]">
              {place.name}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#15110C]/75">
              {place.note}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${place.websiteLabel ?? "Website"}: ${place.name} (opens in a new tab)`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#15110C] px-4 py-2.5 text-sm font-medium text-[#FAF6EE] transition-colors hover:bg-[#15110C]/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15110C]"
                >
                  {place.websiteLabel ?? "Website"}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Google Maps: ${place.name} (opens in a new tab)`}
                className="inline-flex items-center gap-2 rounded-full border border-[#15110C]/20 px-4 py-2.5 text-sm font-medium text-[#15110C] transition-colors hover:bg-[#15110C]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15110C]"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Google Maps
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
