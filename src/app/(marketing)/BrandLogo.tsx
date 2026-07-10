import Image from "next/image";
import Link from "next/link";

import { cn } from "@/components/ui";

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  label?: string;
  onClick?: () => void;
}

export function BrandLogo({
  className,
  markClassName,
  textClassName,
  label = "Kristian Elset Bø",
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      onClick={onClick}
    >
      <Image
        src="/favicon.svg"
        alt=""
        width={32}
        height={32}
        className={cn("size-7 flex-none rounded-[6px]", markClassName)}
        aria-hidden="true"
      />
      <span
        className={cn("text-sm font-semibold whitespace-nowrap", textClassName)}
      >
        {label}
      </span>
    </Link>
  );
}
