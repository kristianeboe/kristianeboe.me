import { Suspense } from "react";

import { env } from "@/env";

import { posts as allPosts } from ".velite";
import { BlogPageContent } from "./BlogPageContent";

const ogImageUrl = `${env.NEXT_PUBLIC_BASE_URL}/api/og/blog?title=${encodeURIComponent("Writing")}&description=${encodeURIComponent("Notes and travel guides from Kristian Elset Bø")}`;

export const metadata = {
  title: "Writing",
  description: "Notes and travel guides from Kristian Elset Bø.",
  keywords: ["travel", "blog", "kristian elset bø"],
  openGraph: {
    title: "Writing | Kristian Elset Bø",
    description: "Notes and travel guides from Kristian Elset Bø.",
    type: "website",
    url: "/blog",
    siteName: "kristianeboe.me",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Writing | Kristian Elset Bø",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Kristian Elset Bø",
    description: "Notes and travel guides from Kristian Elset Bø.",
    images: [ogImageUrl],
  },
  alternates: {
    types: {
      "application/rss+xml": "/blog/feed.xml",
    },
  },
};

export default function BlogPage() {
  const publishedPosts = allPosts
    .filter((post) => post.isPublished)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  // Drafts (publishedAt in the future) are only listed outside of
  // production, so they can be found and reviewed without publishing them.
  // Sorted by title rather than their placeholder publishedAt, and kept
  // after the real posts so they don't crowd out actual content.
  const draftPosts =
    env.NODE_ENV === "production"
      ? []
      : allPosts
          .filter((post) => !post.isPublished)
          .sort((a, b) => a.h1.localeCompare(b.h1));

  const sortedPosts = [...publishedPosts, ...draftPosts];

  // Manually specify featured post slugs (up to 3)
  const FEATURED_SLUGS = [
    "together-we-could-hinge-prompt",
    "tinder-statistics",
    "best-rizz-pickup-lines",
  ];

  return (
    <Suspense fallback={<div className="container py-12">Loading...</div>}>
      <BlogPageContent
        allPosts={sortedPosts}
        featuredSlugs={FEATURED_SLUGS}
        title="Writing"
        description="Notes and travel guides, published and (locally) in progress."
      />
    </Suspense>
  );
}
