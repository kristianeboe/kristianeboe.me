import { cn } from "@/components/ui";

interface ParallaxHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  // "full" is the post's own title banner (dramatic, full viewport).
  // "banner" is for section dividers within the body — used many times
  // per post, so a full viewport each would make for excessive scrolling.
  size?: "full" | "banner";
}

export function ParallaxHero({
  image,
  title,
  subtitle,
  size = "banner",
}: ParallaxHeroProps) {
  return (
    <div
      className={cn(
        "not-prose relative left-1/2 -ml-[50vw] flex w-screen items-center justify-center",
        size === "full" ? "min-h-screen" : "min-h-[70vh] sm:min-h-[80vh]",
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-6 text-center">
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
