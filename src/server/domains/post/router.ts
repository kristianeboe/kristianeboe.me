import { z } from "zod";
import { and, eq } from "drizzle-orm";

import {
  protectedProcedure,
  publicProcedure,
} from "@/server/domains/procedure";
import { postTable } from "@/server/db/schema";

export const postRouter = {
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .handler(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // Get all posts (for demo purposes)
  all: publicProcedure.handler(async ({ context: ctx }) => {
    const posts = await ctx.db.query.postTable.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      limit: 50,
    });
    return posts;
  }),

  // Create a post
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .handler(async ({ context: ctx, input }) => {
      const [post] = await ctx.db
        .insert(postTable)
        .values({
          name: input.title,
          createdById: ctx.session.user.id,
        })
        .returning();

      return { ...post, description: input.description };
    }),

  // Delete a post
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context: ctx, input }) => {
      await ctx.db
        .delete(postTable)
        .where(
          and(
            eq(postTable.id, input.id),
            eq(postTable.createdById, ctx.session.user.id),
          ),
        );

      return { success: true };
    }),

  getLatest: protectedProcedure.handler(async ({ context: ctx }) => {
    const post = await ctx.db.query.postTable.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.handler(() => {
    return "you can now see this secret message!";
  }),
};
