import { auth } from "@/server/better-auth";
import { db } from "@/server/db";
export async function createDomainContext(options: { headers: Headers }) {
  const session = await auth.api.getSession({ headers: options.headers });
  return { db, session, authApi: auth.api, ...options };
}
export type DomainContext = Awaited<ReturnType<typeof createDomainContext>>;
