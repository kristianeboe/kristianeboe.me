import { notFound } from "next/navigation";

import { BlogArticle } from "@/components/blog/BlogArticle";
import { env } from "@/env";
import { AUTHORS } from "@/lib/blog-authors";
import { posts } from ".velite";

export const dynamic = "force-static";

export function generateStaticParams() {
  return posts
    .filter((post) => post.isPublished)
    .map((post) => ({ slug: post.slug }));
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

function isHidden(post: (typeof posts)[number] | undefined) {
  return (
    !post ||
    (env.NODE_ENV === "production" &&
      (!post.isPublished || post.slug === "showcase"))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (isHidden(post) || !post) return {};

  const ogImageUrl = post.socialImage
    ? post.socialImage
    : `/api/og/blog?title=${encodeURIComponent(post.metaTitle)}&description=${encodeURIComponent(post.metaDescription || "")}`;

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
        { url: ogImageUrl, width: 1200, height: 630, alt: post.metaTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (isHidden(post) || !post) notFound();

  return <BlogArticle post={post} />;
}
