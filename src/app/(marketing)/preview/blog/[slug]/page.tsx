import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticle } from "@/components/blog/BlogArticle";
import { posts } from ".velite";

export const dynamic = "force-static";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const metadata: Metadata = {
  title: "Blog preview",
  robots: { index: false, follow: false, nocache: true },
};

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) notFound();

  return <BlogArticle post={post} preview />;
}
