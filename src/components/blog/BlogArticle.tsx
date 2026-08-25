import { TransparentHeader } from "@/app/(marketing)/TransparentHeader";
import { CtaInjector } from "@/components/mdx/CtaInjector";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Prose } from "@/components/mdx/Prose";
import { RelatedPosts } from "@/components/mdx/RelatedPosts";
import { StickyCtaCard } from "@/components/mdx/StickyCtaCard";
import { posts, type Post } from ".velite";

import { ParallaxHero } from "./ParallaxHero";

function getRelatedPosts(current: Post) {
  return posts.filter(
    (post) =>
      post.slug !== current.slug &&
      post.isPublished &&
      post.tags.some((tag) => current.tags.includes(tag)),
  );
}

export function BlogArticle({
  post,
  preview = false,
}: {
  post: Post;
  preview?: boolean;
}) {
  const { content, ...meta } = post;
  const reviewBanner = (preview || !meta.isPublished) && (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-amber-400 py-2 text-center text-sm font-semibold text-amber-950">
      {preview ? "Preview: not published." : "Draft: only visible locally."}
    </div>
  );

  if (!meta.showStickyCTA) {
    return (
      <div className="overflow-x-clip bg-white" lang={meta.language}>
        {reviewBanner}
        {meta.heroImage && (
          <>
            <style
              dangerouslySetInnerHTML={{
                __html: `header:not(.hero-header) { display: none !important; }`,
              }}
            />
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

  return (
    <div className="isolate mt-12" lang={meta.language}>
      {reviewBanner}
      <div className="relative px-6 pt-14 lg:px-8">
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

      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-8 pb-16 sm:pb-24">
          <div className="mx-auto w-full max-w-3xl flex-1">
            <div className="max-w-none">
              <Prose>
                <MDXContent code={content} />
              </Prose>
              {meta.enableAutoCtAs && (
                <CtaInjector category={meta.category} tags={meta.tags} />
              )}
            </div>
          </div>

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
