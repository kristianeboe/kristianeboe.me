import type { RouterClient } from "@orpc/server";
import { postRouter } from "./post/router";
import { userRouter } from "./user/router";
import { blobRouter } from "./blob/router";
import { newsletterRouter } from "./newsletter/router";
import { orgRouter } from "./org/router";
export const domainRouter = {
  post: postRouter,
  user: userRouter,
  blob: blobRouter,
  newsletter: newsletterRouter,
  org: orgRouter,
};
export type DomainRouter = typeof domainRouter;
export type DomainClient = RouterClient<DomainRouter>;
