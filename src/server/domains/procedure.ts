import { os, ORPCError } from "@orpc/server";
import type { DomainContext } from "./context";
import { DomainError } from "./error";
export const publicProcedure = os
  .$context<DomainContext>()
  .use(async ({ next }) => {
    try {
      return await next();
    } catch (error) {
      if (error instanceof DomainError)
        throw new ORPCError(error.code, {
          message: error.message,
          cause: error,
        });
      throw error;
    }
  });
export const protectedProcedure = publicProcedure.use(({ context, next }) => {
  if (!context.session?.user) throw new ORPCError("UNAUTHORIZED");
  return next({ context: { session: context.session } });
});
export const adminProcedure = publicProcedure.use(({ context, next }) => {
  if (
    process.env.NODE_ENV !== "development" &&
    context.session?.user.email !== "kristian.e.boe@gmail.com"
  )
    throw new ORPCError("UNAUTHORIZED");
  return next();
});
