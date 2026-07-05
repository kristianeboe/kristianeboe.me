interface ItineraryStop {
  location: string;
  duration?: string;
  detail?: string;
}

interface ItineraryProps {
  title?: string;
  stops: ItineraryStop[];
}

export function Itinerary({ title, stops }: ItineraryProps) {
  return (
    <div className="not-prose border-border bg-card my-8 overflow-hidden rounded-2xl border shadow-sm">
      {title && (
        <div className="border-border bg-muted/40 border-b px-6 py-3">
          <h4 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            {title}
          </h4>
        </div>
      )}
      <ol className="px-6 py-5">
        {stops.map((stop, i) => (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {i < stops.length - 1 && (
              <span
                className="bg-border absolute top-3 left-[5px] -ml-px h-full w-px"
                aria-hidden="true"
              />
            )}
            <span
              className="bg-primary ring-primary/15 relative z-10 mt-1.5 size-[11px] flex-none rounded-full ring-4"
              aria-hidden="true"
            />
            <div className="-mt-0.5 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-foreground font-semibold">
                  {stop.location}
                </span>
                {stop.duration && (
                  <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {stop.duration}
                  </span>
                )}
              </div>
              {stop.detail && (
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {stop.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
