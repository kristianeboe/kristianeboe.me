import { notFound } from "next/navigation";

import { cn } from "@/components/ui";
import { AUTHORS } from "@/lib/blog-authors";
import { env } from "@/env";

import { CtaInjector } from "@/components/mdx/CtaInjector";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Prose } from "@/components/mdx/Prose";
import { RelatedPosts } from "@/components/mdx/RelatedPosts";
import { ParallaxHero } from "@/components/blog/ParallaxHero";
import { TransparentHeader } from "../../TransparentHeader";
import { StickyCtaCard } from "@/components/mdx/StickyCtaCard";
import { posts } from ".velite";

function getRelatedPosts(current: (typeof posts)[number]) {
  return posts.filter(
    (p) =>
      p.slug !== current.slug &&
      p.isPublished &&
      p.tags.some((tag) => current.tags.includes(tag)),
  );
}

export const dynamic = "force-static";

export function generateStaticParams() {
  // Only generate static paths for published posts
  return posts
    .filter((post) => post.isPublished)
    .map((post) => ({
      slug: post.slug,
    }));
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  // Generate OG image using new route
  const ogImageUrl = `${env.NEXT_PUBLIC_BASE_URL}/api/og/blog?title=${encodeURIComponent(post.metaTitle)}&description=${encodeURIComponent(post.metaDescription || "")}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [AUTHORS[post.author].name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Drafts (publishedAt in the future) are always visible outside of
  // production so they can be reviewed locally without publishing them.
  if (!post || (!post.isPublished && env.NODE_ENV === "production")) {
    notFound();
  }

  const { content, ...meta } = post!;
  const showStickyCTA = meta.showStickyCTA;

  // Fixed to the bottom rather than the top — both layout branches have
  // their own fixed/transparent header at top-0, and a top banner here
  // would fight them for the same space depending on which one is active.
  const draftBanner = !meta.isPublished && (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-amber-400 py-2 text-center text-sm font-semibold text-amber-950">
      Draft — not published. Only visible locally.
    </div>
  );

  // Simple layout without sticky CTA
  if (!showStickyCTA) {
    return (
      <div className={cn("bg-white", meta.heroImage && "-mt-[84px]")} lang={meta.language}>
        {draftBanner}
        {/* Hide the layout header and show transparent one for hero pages */}
        {meta.heroImage && (
          <>
            <style dangerouslySetInnerHTML={{ __html: `header:not(.hero-header) { display: none !important; }` }} />
            <TransparentHeader />
          </>
        )}
        {meta.heroImage ? (
          <ParallaxHero
            image={meta.heroImage}
            title={meta.h1}
            subtitle={meta.h1Subtitle}
            size="full"
          />
        ) : (
          <div className="mx-auto max-w-4xl px-6 pt-24 lg:px-8">
            <div className="mt-8">
              <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {meta.h1}
              </h1>
              {meta.h1Subtitle && (
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  {meta.h1Subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Article content */}
          <div className="mt-16 max-w-none pb-16 sm:pb-24">
            <Prose>
              <MDXContent code={content} />
            </Prose>
            {meta.enableAutoCtAs && (
              <CtaInjector category={meta.category} tags={meta.tags} />
            )}
          </div>
        </div>

        <RelatedPosts posts={getRelatedPosts(post)} basePath="/blog" />
      </div>
    );
  }

  // Sticky CTA layout (default)
  return (
    <div className="isolate mt-12" lang={meta.language}>
      {draftBanner}
      {/* Hero Section */}
      <div className="relative px-6 pt-14 lg:px-8">
        {/* Background decoration */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="from-primary/30 to-primary relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="mx-auto max-w-2xl py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {meta.h1}
            </h1>
            {meta.h1Subtitle && (
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {meta.h1Subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-8 pb-16 sm:pb-24">
          {/* Main Content */}
          <div className="mx-auto w-full max-w-3xl flex-1">
            {/* Article content */}
            <div className="max-w-none">
              <Prose>
                <MDXContent code={content} />
              </Prose>
              {meta.enableAutoCtAs && (
                <CtaInjector category={meta.category} tags={meta.tags} />
              )}
            </div>
          </div>

          {/* Sticky CTA Sidebar - Desktop Only */}
          <aside className="hidden w-80 shrink-0 2xl:block">
            <div className="sticky top-24">
              <StickyCtaCard />
            </div>
          </aside>
        </div>
      </div>

      <RelatedPosts posts={getRelatedPosts(post)} basePath="/blog" />
    </div>
  );
}
