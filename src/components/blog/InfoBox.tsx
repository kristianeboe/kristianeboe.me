import type React from "react";
import { Info } from "lucide-react";

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

export function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <div className="not-prose my-6 rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-5">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
        <div className="flex-1">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-800">
            {title}
          </h4>
          <div className="prose prose-sm max-w-none text-blue-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
