import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

interface MapsPlace {
  name: string;
  category: string;
  note: string;
  mapsUrl: string;
  location?: string;
  image?: string;
  imageAlt?: string;
  website?: string;
}

/** Compact place-link previews, separate from accommodation recommendations. */
export function MapsCards({ places }: { places: MapsPlace[] }) {
  return (
    <div
      className={`not-prose my-8 grid gap-4 ${places.length > 1 ? "md:grid-cols-2" : ""}`}
    >
      {places.map((place) => (
        <article
          key={place.name}
          className="flex items-start gap-3 rounded-xl border border-[#15110C]/10 bg-white p-3"
        >
          {place.image && (
            <a
              href={place.website ?? place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${place.name} (opens in a new tab)`}
              className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-[#F6F5F1] focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-24"
            >
              <Image
                src={place.image}
                alt={
                  place.imageAlt ??
                  `Google Maps preview of the area around ${place.name}`
                }
                fill
                sizes="(min-width: 640px) 96px, 80px"
                className={place.imageAlt ? "object-cover" : "object-contain"}
              />
            </a>
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="text-xs text-[#15110C]/55">
              {place.category} · {place.location ?? "Santa Teresa"}
            </p>
            <a
              href={place.website ?? place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 text-base font-semibold text-[#15110C] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {place.name}
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-1 text-sm leading-relaxed text-[#15110C]/70">
              {place.note}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 text-xs">
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#15110C] hover:underline"
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                Google Maps
              </a>
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#15110C]/60 hover:underline"
                >
                  Website ↗
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
