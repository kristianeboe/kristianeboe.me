import { posts } from ".velite";

// Trip order for the Travel dropdown — matches the order guides were written in,
// not publish date (Australia + Japan share a publishedAt from batch-import day).
const TRAVEL_SLUG_ORDER = ["bali", "australia-east-coast", "japan"];

export function getTravelNavigation() {
  return posts
    .filter((post) => post.isPublished && post.tags.includes("travel"))
    .sort(
      (a, b) =>
        TRAVEL_SLUG_ORDER.indexOf(a.slug) - TRAVEL_SLUG_ORDER.indexOf(b.slug),
    )
    .map((post) => ({
      name: post.h1,
      href: `/blog/${post.slug}`,
      description: post.h1Subtitle,
    }));
}
