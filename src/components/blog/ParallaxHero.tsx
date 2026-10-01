import { cn } from "@/components/ui";

interface ParallaxHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  backgroundPosition?: string;
  // "full" is the post's own title banner, larger than section dividers.
  // "banner" is for section dividers within the body — used many times
  // per post, so a full viewport each would make for excessive scrolling.
  size?: "full" | "banner";
  /** Wide section image with rounded corners and visible page margins. */
  variant?: "bleed" | "inset";
  /** Preserve a wide montage instead of cropping its outer subjects on desktop. */
  panorama?: boolean;
}

export function ParallaxHero({
  image,
  title,
  subtitle,
  backgroundPosition,
  size = "banner",
  variant = "bleed",
  panorama = false,
}: ParallaxHeroProps) {
  return (
    <div
      className={cn(
        "not-prose relative left-1/2 flex items-center justify-center bg-cover bg-scroll bg-center bg-no-repeat motion-reduce:bg-scroll md:bg-fixed",
        variant === "inset"
          ? "my-12 -translate-x-1/2 overflow-hidden rounded-2xl sm:my-16 sm:rounded-3xl"
          : "-ml-[50vw] w-screen",
        variant === "inset" &&
          (size === "full"
            ? "w-[calc(100vw-3rem)] sm:w-[max(90vw,min(1080px,calc(100vw-3rem)))] lg:w-[max(88vw,min(1080px,calc(100vw-4rem)))]"
            : "w-[calc(100vw-2rem)] max-w-[1600px] sm:w-[max(78vw,min(1040px,calc(100vw-3rem)))] lg:w-[max(74vw,min(1040px,calc(100vw-4rem)))]"),
        variant === "inset"
          ? size === "full"
            ? "min-h-[42svh] sm:min-h-[50vh] md:min-h-[54vh] lg:min-h-[58vh]"
            : "aspect-[16/10] sm:aspect-[21/9] sm:max-h-[500px]"
          : size === "full"
            ? "min-h-[78svh] md:min-h-screen"
            : "min-h-[44svh] sm:min-h-[56vh] md:min-h-[70vh] lg:min-h-[80vh]",
        variant === "inset" && size === "full" && "mt-24 sm:mt-24",
        panorama && "!bg-scroll sm:aspect-[3/1] sm:!min-h-0",
        backgroundPosition && "!bg-scroll",
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition,
      }}
    >
      <div
        className={cn(
          "absolute inset-0",
          variant === "inset" ? "bg-black/35" : "bg-black/50",
        )}
      />
      <div className="relative z-10 max-w-5xl px-6 py-12 text-center">
        <h2
          className={cn(
            "font-bold tracking-tight text-white",
            size === "full"
              ? "text-4xl sm:text-5xl md:text-6xl"
              : "text-3xl sm:text-4xl md:text-5xl",
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80 sm:text-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
