import type { Post } from ".velite";

export function blogImageUrl(post: Pick<Post, "slug">, square = false) {
  const query = new URLSearchParams({ slug: post.slug, v: "1" });
  if (square) query.set("format", "square");
  return `/api/og/blog?${query}`;
}
