import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Newsreader } from "next/font/google";

import type { Post } from ".velite";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
});

const serif = "font-[family-name:var(--font-newsreader)] tracking-[-0.015em]";
const monoLabel = "font-mono text-[10px] uppercase tracking-[0.08em]";

interface BlogGridProps {
  posts: readonly Post[];
  title?: string;
  description?: string;
  showFeatured?: boolean;
  featuredPosts?: readonly Post[];
  basePath?: string;
  searchComponent?: React.ReactNode;
}

function getDisplayImageUrl(post: Post): string {
  if (post.thumbnail) {
    return post.thumbnail;
  }

  const title = encodeURIComponent(post.h1);
  const tag = post.category || post.tags[0] || "journal";
  return `/api/og/display?title=${title}&tag=${encodeURIComponent(tag)}`;
}

function PostMeta({ post }: { post: Post }) {
  return (
    <div className={monoLabel + " flex items-center gap-3 text-[#15110C]/52"}>
      {post.category && <span className="text-[#B0573F]">{post.category}</span>}
      {post.isPublished && (
        <time dateTime={post.publishedAt}>
          {format(parseISO(post.publishedAt), "MMM yyyy")}
        </time>
      )}
      {!post.isPublished && <span className="text-[#B0573F]">Draft</span>}
    </div>
  );
}

function PostCard({
  post,
  basePath = "/blog",
  featured = false,
}: {
  post: Post;
  basePath?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[20px] border border-white/60 bg-[#FFFDF8] shadow-[0_18px_50px_rgba(21,17,12,0.07)] transition-shadow hover:shadow-[0_22px_60px_rgba(21,17,12,0.11)] ${
        featured ? "lg:grid lg:grid-cols-[1.08fr_0.92fr]" : ""
      }`}
    >
      <Link
        href={`${basePath}/${post.slug}`}
        className={`relative block overflow-hidden ${featured ? "min-h-64 lg:h-full" : ""}`}
      >
        <Image
          src={getDisplayImageUrl(post)}
          alt={post.h1}
          width={800}
          height={520}
          className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
            featured ? "h-full min-h-64" : "aspect-[4/3]"
          }`}
        />
        {!post.isPublished && (
          <span className="absolute top-4 left-4 rounded-full border border-[#B0573F]/30 bg-[#FFFDF8]/90 px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-[#B0573F] uppercase backdrop-blur">
            Draft
          </span>
        )}
      </Link>

      <div className={`flex flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <PostMeta post={post} />
        <h3
          className={`${serif} mt-3 text-[30px] leading-[1.03] text-[#15110C] ${
            featured ? "sm:text-[38px]" : ""
          }`}
        >
          <Link
            href={`${basePath}/${post.slug}`}
            className="transition-colors hover:text-[#1F4D3C]"
          >
            {post.h1}
          </Link>
        </h3>
        {(post.h1Subtitle || post.metaDescription) && (
          <Link
            href={`${basePath}/${post.slug}`}
            className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#15110C]/62 transition-colors hover:text-[#15110C]"
          >
            {post.h1Subtitle || post.metaDescription}
          </Link>
        )}
        <Link
          href={`${basePath}/${post.slug}`}
          className="mt-6 text-[13px] font-semibold text-[#1F4D3C] transition hover:text-[#B0573F]"
        >
          Read note →
        </Link>
      </div>
    </article>
  );
}

export function BlogGrid({
  posts,
  title = "From the blog",
  description = "Learn how to grow your business with our expert advice.",
  showFeatured = false,
  featuredPosts = [],
  basePath = "/blog",
  searchComponent,
}: BlogGridProps) {
  return (
    <div className={`${newsreader.variable} bg-[#FAF6EE] text-[#1F1B14]`}>
      <header className="border-b border-[#1F1B14]/10 bg-[#F1EBDD] px-6 pt-24 pb-16 lg:px-8 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-[1080px]">
          <div className={`${monoLabel} mb-4 text-[#B0573F]`}>Journal</div>
          <h1
            className={`${serif} max-w-4xl text-5xl leading-[0.98] sm:text-7xl`}
          >
            {title}{" "}
            <em className="text-[#1F4D3C] italic">
              from the road and the work.
            </em>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#1F1B14]/65">
            {description}
          </p>
        </div>
      </header>

      <div className="px-6 py-16 lg:px-8 lg:py-22">
        <div className="mx-auto max-w-[1080px]">
          {showFeatured && featuredPosts.length > 0 && (
            <section aria-labelledby="featured-notes">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-[#1F1B14]/12 pb-4">
                <div>
                  <div className={`${monoLabel} text-[#B0573F]`}>
                    Start here
                  </div>
                  <h2
                    id="featured-notes"
                    className={`${serif} mt-1 text-3xl leading-none sm:text-[36px]`}
                  >
                    Notes worth keeping.
                  </h2>
                </div>
                <span className={`${monoLabel} text-[#15110C]/45`}>
                  {featuredPosts.length} featured
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {featuredPosts[0] && (
                  <div className="lg:col-span-2">
                    <PostCard
                      post={featuredPosts[0]}
                      basePath={basePath}
                      featured
                    />
                  </div>
                )}
                {featuredPosts.slice(1, 3).map((post) => (
                  <PostCard key={post.slug} post={post} basePath={basePath} />
                ))}
              </div>
            </section>
          )}

          <section
            aria-labelledby="all-notes"
            className={`${showFeatured && featuredPosts.length > 0 ? "mt-16 border-t border-[#1F1B14]/12 pt-16" : ""}`}
          >
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className={`${monoLabel} text-[#B0573F]`}>The archive</div>
                <h2
                  id="all-notes"
                  className={`${serif} mt-1 text-3xl leading-none sm:text-[36px]`}
                >
                  All notes.
                </h2>
              </div>
              <span className={`${monoLabel} text-[#15110C]/45`}>
                Places, products &amp; patterns
              </span>
            </div>

            {searchComponent && <div className="mb-8">{searchComponent}</div>}

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} basePath={basePath} />
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] border border-white/60 bg-[#FFFDF8] px-6 py-14 text-center shadow-[0_18px_50px_rgba(21,17,12,0.07)]">
                <h3 className={`${serif} text-3xl`}>No notes found.</h3>
                <p className="mt-3 text-sm text-[#1F1B14]/62">
                  Try another search or clear the filters.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
