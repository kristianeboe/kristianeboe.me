import { DomainExamples } from "./domain-examples";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * DATA FETCHING BEST PRACTICES (oRPC)
 *
 * This demo showcases type-safe data fetching patterns using oRPC:
 * - Queries (fetching data)
 * - Mutations (creating/updating data)
 * - Optimistic updates
 * - Error handling
 * - Loading states
 * - Cache invalidation
 */

export default function DataFetchingDemo() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Data Fetching Demo (oRPC)</h1>
        <p className="text-muted-foreground">
          Type-safe API calls with oRPC, TanStack Query, and React 19 features
        </p>
      </div>

      {/* Pattern Explanation */}
      <Card className="border-primary mb-8">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">🎯 oRPC Benefits:</h3>
            <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-1 text-sm">
              <li>
                <strong>End-to-end type safety</strong> - TypeScript types
                shared between client and server
              </li>
              <li>
                <strong>No code generation</strong> - Types inferred
                automatically
              </li>
              <li>
                <strong>Excellent DX</strong> - Autocomplete, type checking,
                refactoring support
              </li>
              <li>
                <strong>Built on React Query</strong> - Caching, refetching,
                optimistic updates
              </li>
              <li>
                <strong>No API routes needed</strong> - Direct function calls
                with type safety
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">✅ Best Practices:</h3>
            <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-1 text-sm">
              <li>Use queries for GET operations (data fetching)</li>
              <li>Use mutations for POST/PUT/DELETE (data modification)</li>
              <li>Implement optimistic updates for instant feedback</li>
              <li>Handle loading and error states appropriately</li>
              <li>Invalidate queries after mutations to refetch data</li>
              <li>Use suspense mode for simpler loading states</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* oRPC Examples */}
      <DomainExamples />

      {/* Code Pattern */}
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Code Pattern</h2>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">
              1. Define oRPC Router (Server)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
              {`// src/server/domains/post/router.ts
import { protectedProcedure } from "@/server/domains/procedure";

export const postRouter = {
  getLatest: protectedProcedure.handler(({ context }) =>
    context.db.query.postTable.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    }),
  ),
};`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              2. Use oRPC in Client Component
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
              {`"use client";
import { useQuery } from "@tanstack/react-query";
import { useDomain } from "@/lib/domain-react";

export function PostList() {
  const domain = useDomain();
  const { data, isPending } = useQuery(domain.post.all.queryOptions());
  if (isPending) return <p>Loading...</p>;
  return data?.map(post => <p key={post.id}>{post.name}</p>);
}`}
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
