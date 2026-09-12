import { expect, test } from "bun:test";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RPCHandler } from "@orpc/server/fetch";
import { createRouterClient, type RouterClient } from "@orpc/server";
import { z } from "zod";
import type { DomainContext } from "./context";
import { DomainError } from "./error";
import { publicProcedure, protectedProcedure } from "./procedure";

const context = { session: null } as DomainContext;
test("RPC round trips dates and business errors", async () => {
  const router = {
    echo: publicProcedure
      .input(z.object({ at: z.date() }))
      .handler(({ input }) => input),
    missing: publicProcedure.handler(() => {
      throw new DomainError({ code: "NOT_FOUND", message: "Record missing" });
    }),
  };
  const handler = new RPCHandler(router);
  const client: RouterClient<typeof router> = createORPCClient(
    new RPCLink({
      url: "http://localhost/api/domain",
      fetch: async (request, init) => {
        const { response } = await handler.handle(new Request(request, init), {
          prefix: "/api/domain",
          context,
        });
        return response ?? new Response(null, { status: 404 });
      },
    }),
  );
  const at = new Date("2026-09-11T12:00:00Z");
  expect(await client.echo({ at })).toEqual({ at });
  await expect(client.missing()).rejects.toMatchObject({
    code: "NOT_FOUND",
    message: "Record missing",
  });
});
test("protected procedures reject anonymous calls before executing", async () => {
  let executed = false;
  const router = {
    secure: protectedProcedure.handler(({ context }) => {
      executed = true;
      return context.session.user.id;
    }),
  };
  const client = createRouterClient(router, { context });
  await expect(client.secure()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  expect(executed).toBe(false);
});
