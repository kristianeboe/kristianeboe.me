import type React from "react";
import { Info } from "lucide-react";

interface InfoBoxProps {
  title?: string;
  items?: string[];
  children?: React.ReactNode;
}

export function InfoBox({ title, items, children }: InfoBoxProps) {
  return (
    <div className="not-prose border-primary/15 from-primary/[0.06] my-6 overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent shadow-sm">
      <div className="flex gap-3 p-5">
        <span className="bg-primary/10 text-primary flex size-8 flex-none items-center justify-center rounded-full">
          <Info className="size-4" />
        </span>
        <div className="flex-1 pt-0.5">
          {title && (
            <h4 className="text-foreground mb-2 text-sm font-semibold tracking-wide">
              {title}
            </h4>
          )}
          {items && items.length > 0 && (
            <ul className="space-y-1.5">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="text-muted-foreground flex gap-2 text-sm leading-relaxed"
                >
                  <span className="bg-primary/50 mt-2 size-1 flex-none rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {children && (
            <div className="prose prose-sm text-muted-foreground max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
