interface CareerEntry {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  tags?: string[];
}

export function CareerTimeline({ entries }: { entries: CareerEntry[] }) {
  return (
    <ol className="space-y-10">
      {entries.map((entry, i) => (
        <li key={i} className="relative flex gap-6">
          {i < entries.length - 1 && (
            <span
              className="absolute top-3 left-[5px] -ml-px h-full w-px bg-zinc-200 dark:bg-zinc-700"
              aria-hidden="true"
            />
          )}
          <span
            className="relative z-10 mt-1.5 size-[11px] flex-none rounded-full bg-teal-500 ring-4 ring-teal-500/15"
            aria-hidden="true"
          />
          <div className="-mt-1 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                {entry.role}{" "}
                <span className="font-normal text-zinc-500 dark:text-zinc-400">
                  · {entry.company}
                </span>
              </h3>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                {entry.period}
                {entry.location ? ` · ${entry.location}` : ""}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {entry.description}
            </p>
            {entry.tags && entry.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
