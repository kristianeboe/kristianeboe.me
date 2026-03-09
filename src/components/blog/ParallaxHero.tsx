interface ParallaxHeroProps {
  image: string;
  title: string;
  subtitle?: string;
}

export function ParallaxHero({ image, title, subtitle }: ParallaxHeroProps) {
  return (
    <div
      className="not-prose relative flex min-h-[60vh] w-full items-center justify-center"
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
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80 sm:text-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
