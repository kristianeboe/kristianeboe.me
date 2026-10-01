"use client";

import { useEffect, useRef, useState } from "react";

export function InlineVideo({
  src,
  poster,
  label,
  caption,
  aspectRatio = 16 / 9,
  embedded = false,
}: {
  src: string;
  poster: string;
  label: string;
  caption?: string;
  aspectRatio?: number;
  embedded?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = !!entry?.isIntersecting;
        if (inView) setLoaded(true);
        setVisible(inView);
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      if (
        visible &&
        loaded &&
        !document.hidden &&
        !reducedMotion.matches &&
        !connection?.saveData
      ) {
        void video.play().catch(() => {
          /* Native controls remain available if autoplay is blocked. */
        });
      } else video.pause();
    };
    update();
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [visible, loaded]);

  return (
    <figure className={embedded ? "h-full min-h-0" : "not-prose my-8"}>
      <video
        ref={videoRef}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        playsInline
        loop
        controls
        preload="none"
        aria-label={label}
        className={
          embedded
            ? "block h-full w-full rounded-xl object-cover"
            : `mx-auto block w-full rounded-2xl ${aspectRatio < 1 ? "max-w-md" : ""}`
        }
        style={embedded ? undefined : { aspectRatio }}
      />
      {caption && (
        <figcaption className="text-muted-foreground mt-4 text-center text-sm italic sm:text-base">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
