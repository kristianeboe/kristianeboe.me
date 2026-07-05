"use client";

/* eslint-disable @next/next/no-img-element -- lightbox needs intrinsic
   aspect-ratio scaling (max-h/max-w + auto), which next/image can't express */
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/components/ui";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <div className="not-prose my-8">
      <GalleryGrid images={images} onSelect={setOpenIndex} />
      <Lightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
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
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group bg-muted relative block h-full w-full overflow-hidden rounded-xl",
        className,
      )}
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
      <div className="flex flex-col gap-2">
        <Tile
          image={images[0]!}
          onClick={() => onSelect(offset)}
          className="aspect-video"
        />
        {images[0]!.caption && (
          <p className="text-muted-foreground text-center text-sm italic">
            {images[0]!.caption}
          </p>
        )}
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid h-[280px] grid-cols-2 gap-2 sm:h-[340px]">
        {images.map((image, i) => (
          <Tile key={i} image={image} onClick={() => onSelect(offset + i)} />
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid h-[320px] grid-cols-2 gap-2 sm:h-[380px]">
        <Tile image={images[0]!} onClick={() => onSelect(offset)} />
        <div className="grid grid-rows-2 gap-2">
          <Tile image={images[1]!} onClick={() => onSelect(offset + 1)} />
          <Tile image={images[2]!} onClick={() => onSelect(offset + 2)} />
        </div>
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid h-[320px] grid-cols-2 grid-rows-2 gap-2 sm:h-[420px]">
        {images.map((image, i) => (
          <Tile key={i} image={image} onClick={() => onSelect(offset + i)} />
        ))}
      </div>
    );
  }

  // count === 5: hero (2x2) + 4 tiles fill the row exactly, no leftovers.
  const tiles = images.slice(1);
  return (
    <div className="grid h-[320px] grid-cols-4 grid-rows-2 gap-2 sm:h-[420px]">
      <Tile
        image={images[0]!}
        onClick={() => onSelect(offset)}
        className="col-span-2 row-span-2"
      />
      {tiles.map((image, i) => (
        <Tile key={i} image={image} onClick={() => onSelect(offset + i + 1)} />
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
