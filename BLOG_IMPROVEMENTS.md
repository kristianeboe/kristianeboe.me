# Blog Engine Improvements

## Status: Planning (June 2026)

## Context

The Bali travel blog post (`content/posts/bali.mdx`) has all its images present (64 files in `public/blog/bali/`) but has formatting/component issues and duplicate content. The blog engine uses Velite + MDX with 4 custom components in `src/components/blog/`. We want to borrow patterns from the Towers Club codebase (`~/Developer/boe-ventures/towers.club`) for better image presentation.

## Current Architecture

- **Content pipeline:** Velite → MDX → React (Next.js 15)
- **MDX components:** registered in `src/components/mdx/MDXContent.tsx`
- **Blog post page:** `src/app/(marketing)/blog/[slug]/page.tsx`
- **Custom blog components:**
  - `ImageGallery` — embla carousel, one image at a time with prev/next arrows
  - `ParallaxHero` — full-screen (`min-h-screen`) section divider with background image
  - `InfoBox` — blue callout box with icon
  - `YouTubeEmbed` — responsive iframe embed

## Issues to Fix

### 1. Duplicate Content in `bali.mdx`

The post has **two versions** of most sections concatenated. The first half (lines ~1–200) uses structured formatting with numbered images (`-01` suffix) and `InfoBox` with props. The second half (~200–383) is a rewrite with simpler image names and slightly different text.

**Action:** Merge into one clean version. The first half is generally more structured; the second half sometimes has better prose. Pick the best of each.

### 2. `InfoBox` Component Bug

The MDX uses `InfoBox` two ways:
- `<InfoBox title="...">children</InfoBox>` ← works
- `<InfoBox title="..." items={[...]} />` ← **silently drops** the items

The component (`src/components/blog/InfoBox.tsx`) only accepts `title` + `children`. It needs to also render an `items` string array as a bullet list.

### 3. `ImageGallery` — Replace Carousel with Grid

The current carousel shows one image at a time, which buries the photography. Replace with a photo grid layout inspired by Towers Club's collage pattern.

**Towers Club reference** (`~/Developer/boe-ventures/towers.club/src/routes/towers.$slug.tsx`):
```tsx
// 4-col, 2-row grid: hero takes 2×2 left, 4 smaller images on right
<div className="mt-6 grid h-[460px] grid-cols-4 grid-rows-2 gap-2">
  <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
    <img src={hero.url} className="h-full w-full object-cover" />
  </div>
  {rest.map((p) => (
    <div className="overflow-hidden rounded-2xl">
      <img src={p.url} className="h-full w-full object-cover" />
    </div>
  ))}
</div>
```

**New `ImageGallery` spec:**
- For 1–2 images: simple side-by-side or stacked layout
- For 3–5 images: Towers Club-style collage grid (hero + smaller tiles)
- For 6+ images: collage grid showing first 5, with a "+N more" overlay on the last tile that opens a lightbox/modal
- Optional lightbox on click (Radix Dialog or similar)
- Keep the same `images` prop interface: `{ src, alt, caption? }[]`

### 4. `ParallaxHero` — Tone Down

Currently `min-h-screen` makes each section divider a full viewport height — too much scrolling. Options:
- Reduce to `min-h-[50vh]` or `min-h-[60vh]`
- Or replace with a simpler banner: wide image with overlaid text, ~300px tall
- Keep `backgroundAttachment: fixed` for the parallax effect on desktop

### 5. General Polish

- The `Prose` wrapper (`src/components/mdx/Prose.tsx`) styles might need tweaking for the new grid layout (check `not-prose` usage)
- Consider adding `next/image` with blur placeholders instead of raw `<img>` tags for better loading UX
- The Velite config may need updating if we change the frontmatter schema

## File Map

```
src/components/blog/
├── ImageGallery.tsx    ← rewrite (grid + lightbox)
├── InfoBox.tsx         ← fix items prop
├── ParallaxHero.tsx    ← reduce height
└── YouTubeEmbed.tsx    ← fine as-is

src/components/mdx/
└── MDXContent.tsx      ← component registry (no changes needed)

src/app/(marketing)/blog/[slug]/
└── page.tsx            ← blog post page layout (no changes needed)

content/posts/
└── bali.mdx            ← deduplicate sections

public/blog/bali/
└── (64 images)         ← all present, no missing files
```

## Build & Deploy

- Last successful production deploy: ~106 days ago (March 2026)
- Recent preview deploys (45 days ago) errored — likely from the Huly-style effects commits
- Vercel project: `kristianeboe-me` under `boe-ventures` org
- URL: https://kristianeboe-me.vercel.app
- No custom domain configured (kristianeboe.me DNS not pointed at Vercel)
- Test build locally with `bun run build` before pushing
