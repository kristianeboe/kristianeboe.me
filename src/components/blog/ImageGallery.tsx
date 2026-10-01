"use client";

/* eslint-disable @next/next/no-img-element -- lightbox needs intrinsic
   aspect-ratio scaling (max-h/max-w + auto), which next/image can't express */
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/components/ui";
import { InlineVideo } from "./InlineVideo";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
  videoSrc?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  /** A smaller, centered gallery for quieter moments in the article. */
  size?: "default" | "compact";
  /** Optional caption for the whole gallery. Single images use their own caption. */
  caption?: string;
  layout?:
    | "collage"
    | "natural"
    | "stacked-left"
    | "stacked-right"
    | "landscape-top";
}

export function ImageGallery({
  images,
  caption,
  size = "default",
  layout = "collage",
}: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;
  const visibleCaption =
    caption ?? (images.length === 1 ? images[0]!.caption : undefined);

  return (
    <figure
      className={cn(
        "not-prose my-8",
        size === "compact" && "mx-auto w-[85%] sm:w-4/5",
      )}
    >
      {images.length === 1 ? (
        <GalleryGrid images={images} onSelect={setOpenIndex} />
      ) : layout === "stacked-right" && images.length === 3 ? (
        <div className="grid items-start gap-2 sm:grid-cols-[1.22fr_1fr]">
          <Tile
            image={images[0]!}
            onClick={() => setOpenIndex(0)}
            className="h-auto"
          />
          <div className="grid gap-2">
            {images.slice(1).map((image, index) => (
              <Tile
                key={image.src}
                image={image}
                onClick={() => setOpenIndex(index + 1)}
                className="h-auto"
              />
            ))}
          </div>
        </div>
      ) : layout === "landscape-top" && images.length === 3 ? (
        <div
          className="grid items-start gap-2 sm:grid-cols-[var(--gallery-columns)]"
          style={
            {
              "--gallery-columns": `${images[1]!.aspectRatio ?? 0.75}fr ${images[2]!.aspectRatio ?? 0.75}fr`,
            } as React.CSSProperties
          }
        >
          {images.map((image, index) => (
            <Tile
              key={image.src}
              image={image}
              onClick={() => setOpenIndex(index)}
              className={cn("h-auto", index === 0 && "sm:col-span-2")}
            />
          ))}
        </div>
      ) : layout === "stacked-left" && images.length === 3 ? (
        <div className="grid gap-2 sm:aspect-[17/12] sm:grid-cols-[1fr_1.125fr] sm:grid-rows-2">
          {images.map((image, index) => (
            <Tile
              key={image.src}
              image={image}
              onClick={() => setOpenIndex(index)}
              className={cn(
                "h-auto sm:h-full",
                index === 0 && "sm:col-start-1 sm:row-start-1",
                index === 1 && "sm:col-start-1 sm:row-start-2",
                index === 2 && "sm:col-start-2 sm:row-span-2 sm:row-start-1",
              )}
            />
          ))}
        </div>
      ) : layout === "natural" ? (
        <div
          className={cn(
            "grid items-start gap-2",
            images.length === 2 || images.length === 4
              ? "sm:grid-cols-2"
              : "sm:grid-cols-3",
          )}
        >
          {images.map((image, index) => (
            <Tile
              key={image.src}
              image={image}
              onClick={() => setOpenIndex(index)}
              className="aspect-[3/4] h-auto"
            />
          ))}
        </div>
      ) : (
        <GalleryGrid images={images} onSelect={setOpenIndex} />
      )}
      {visibleCaption && (
        <figcaption className="text-muted-foreground mx-auto mt-4 max-w-xl px-4 text-center text-sm leading-relaxed italic sm:text-base">
          {visibleCaption}
        </figcaption>
      )}
      <Lightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </figure>
  );
}

function Tile({
  image,
  onClick,
  className,
  children,
}: {
  image: GalleryImage;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  if (image.videoSrc) {
    return (
      <div className={cn("min-h-0 overflow-hidden rounded-xl", className)}>
        <InlineVideo
          src={image.videoSrc}
          poster={image.src}
          label={image.alt}
          embedded
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group bg-muted relative block h-full w-full overflow-hidden rounded-xl",
        className,
      )}
      style={image.aspectRatio ? { aspectRatio: image.aspectRatio } : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition duration-300 group-hover:scale-105"
      />
      {children}
    </button>
  );
}

// Renders a balanced hero+tiles layout for 1-5 images. Galleries larger than
// that split into two of these blocks (see GalleryGrid) rather than bolting
// a lopsided leftover row onto one oversized grid.
function GalleryBlock({
  images,
  offset,
  onSelect,
}: {
  images: GalleryImage[];
  offset: number;
  onSelect: (index: number) => void;
}) {
  const count = images.length;

  if (count === 1) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2",
          images[0]!.aspectRatio &&
            images[0]!.aspectRatio <= 1 &&
            "mx-auto w-full max-w-md",
        )}
      >
        <Tile
          image={images[0]!}
          onClick={() => onSelect(offset)}
          className="aspect-video"
        />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-1 gap-2 sm:h-[340px] sm:grid-cols-2">
        {images.map((image, i) => (
          <Tile
            key={i}
            image={image}
            onClick={() => onSelect(offset + i)}
            className="aspect-[4/3] sm:aspect-auto"
          />
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:h-[380px] sm:grid-rows-2">
        <Tile
          image={images[0]!}
          onClick={() => onSelect(offset)}
          className="col-span-2 aspect-[4/3] sm:col-span-1 sm:row-span-2 sm:aspect-auto"
        />
        <Tile
          image={images[1]!}
          onClick={() => onSelect(offset + 1)}
          className="aspect-square sm:aspect-auto"
        />
        <Tile
          image={images[2]!}
          onClick={() => onSelect(offset + 2)}
          className="aspect-square sm:aspect-auto"
        />
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:h-[420px] sm:grid-rows-2">
        {images.map((image, i) => (
          <Tile
            key={i}
            image={image}
            onClick={() => onSelect(offset + i)}
            className="aspect-square sm:aspect-auto"
          />
        ))}
      </div>
    );
  }

  // count === 5: hero (2x2) + 4 tiles fill the row exactly, no leftovers.
  const tiles = images.slice(1);
  return (
    <div className="grid grid-cols-2 gap-2 sm:h-[420px] sm:grid-cols-4 sm:grid-rows-2">
      <Tile
        image={images[0]!}
        onClick={() => onSelect(offset)}
        className="col-span-2 aspect-[4/3] sm:row-span-2 sm:aspect-auto"
      />
      {tiles.map((image, i) => (
        <Tile
          key={i}
          image={image}
          onClick={() => onSelect(offset + i + 1)}
          className="aspect-square sm:aspect-auto"
        />
      ))}
    </div>
  );
}

function GalleryGrid({
  images,
  offset = 0,
  onSelect,
}: {
  images: GalleryImage[];
  offset?: number;
  onSelect: (index: number) => void;
}) {
  const count = images.length;

  // More than 5 photos would force either a cramped single grid or a
  // lopsided leftover row. Instead, split into two balanced blocks — each
  // gets its own hero, so a 6-photo gallery reads as two clean 3-photo
  // moments rather than one busy grid and one orphaned tile.
  if (count > 5) {
    const mid = Math.ceil(count / 2);
    return (
      <div className="flex flex-col gap-4">
        <GalleryGrid
          images={images.slice(0, mid)}
          offset={offset}
          onSelect={onSelect}
        />
        <GalleryGrid
          images={images.slice(mid)}
          offset={offset + mid}
          onSelect={onSelect}
        />
      </div>
    );
  }

  return <GalleryBlock images={images} offset={offset} onSelect={onSelect} />;
}

function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const current = index !== null ? images[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => !next && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/90" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none sm:p-10"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            {current?.alt ?? "Photo"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Close className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="size-6" />
                <span className="sr-only">Previous</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="size-6" />
                <span className="sr-only">Next</span>
              </button>
            </>
          )}

          {current && (
            <div className="flex max-h-full max-w-full flex-col items-center gap-3">
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
              />
              {current.caption && (
                <p className="text-center text-sm text-white/70">
                  {current.caption}
                </p>
              )}
              {images.length > 1 && (
                <p className="text-xs text-white/40">
                  {index! + 1} / {images.length}
                </p>
              )}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
