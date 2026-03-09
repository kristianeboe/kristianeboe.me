import { NextResponse } from "next/server";

/**
 * Test API route for triggering server-side errors
 *
 * Only available in development mode.
 * Used to test server-side error tracking via instrumentation.ts
 */
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 },
    );
  }

  // Throw an intentional error for testing
  throw new Error("Test server error: Intentional error for testing error tracking");
}

export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 },
    );
  }

  // Throw a different error type for testing
  const nullValue: string | null = null;
  // @ts-expect-error - Intentional error for testing
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  return NextResponse.json({ result: nullValue.toUpperCase() });
}
