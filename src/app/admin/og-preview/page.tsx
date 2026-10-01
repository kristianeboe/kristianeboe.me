/* eslint-disable @next/next/no-img-element -- Show the exact sharing image at preview sizes. */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { blogImageUrl } from "@/lib/blog-og";
import { getSession } from "@/server/better-auth/server";
import { posts } from ".velite";

export const metadata = {
  title: "Sharing images | Kristian Elset Bø",
  robots: { index: false, follow: false },
};

export default async function OgPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    const session = await getSession();
    if (!session?.user) redirect("/signin?callbackUrl=%2Fadmin%2Fog-preview");
    if (session.user.email.toLowerCase() !== "kristian.e.boe@gmail.com")
      notFound();
  }
  const articles = posts
    .filter((post) => post.isPublished && post.slug !== "showcase")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <main className="min-h-screen bg-[#FAF6EE] px-6 py-12 text-[#1F1B14]">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[#B0573F]">
          ← Back to site
        </Link>
        <h1 className="mt-8 text-4xl font-semibold">Sharing images</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6">
          Every published article uses its landscape card when shared. Open an
          image to save it. Set socialImage or ogTitle in the article
          frontmatter to change its photo or sharing copy.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {articles.map((post) => (
            <article
              key={post.slug}
              className="min-w-0 rounded-2xl border border-[#1F1B14]/10 bg-white p-5"
            >
              <h2 className="mb-4 text-lg font-semibold">
                <Link href={post.permalink}>{post.h1}</Link>
              </h2>
              <a href={blogImageUrl(post)} target="_blank" rel="noreferrer">
                <img
                  src={blogImageUrl(post)}
                  alt={post.h1}
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="w-full rounded-lg"
                />
              </a>
              <div className="mt-4 flex items-end gap-4">
                <a
                  href={blogImageUrl(post, true)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-1/3 shrink-0"
                >
                  <img
                    src={blogImageUrl(post, true)}
                    alt={`${post.h1}, square format`}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="w-full rounded-lg"
                  />
                </a>
                <div className="text-sm text-[#1F1B14]/65">
                  <p>1200 × 630 for link previews</p>
                  <p className="mt-2">1200 × 1200 for social posts</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
