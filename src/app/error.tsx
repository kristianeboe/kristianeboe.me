"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";

/**
 * Route-level error boundary
 *
 * Catches errors in route segments and displays a user-friendly error page.
 * Captures errors to PostHog for monitoring.
 *
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Capture error to PostHog
    if (env.NEXT_PUBLIC_POSTHOG_KEY) {
      try {
        posthog.capture("$exception", {
          $exception_message: error.message,
          $exception_type: error.name,
          $exception_stack_trace: error.stack,
          error_digest: error.digest,
        });
        console.error("❌ [Error Boundary] Error captured to PostHog:", error);
      } catch (captureError) {
        console.error(
          "❌ [Error Boundary] Failed to capture error:",
          captureError,
        );
      }
    } else {
      console.error("❌ [Error Boundary] Error occurred:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            We encountered an error while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground text-sm">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="text-muted-foreground text-xs">
              Error ID: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={() => reset()} className="flex-1">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="flex-1"
          >
            Go home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
