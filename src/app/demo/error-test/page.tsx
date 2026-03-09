"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Error testing page (dev only)
 *
 * Provides buttons to trigger different types of errors for testing
 * error tracking and error boundary functionality.
 */
export default function ErrorTestPage() {
  const [count, setCount] = useState(0);

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className="container mx-auto max-w-2xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              This page is only available in development mode.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const throwClientError = () => {
    throw new Error("Test client error: Intentional error for testing");
  };

  const throwAsyncError = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    throw new Error("Test async error: Intentional async error for testing");
  };

  const triggerTypeError = () => {
    const obj = null;
    // @ts-expect-error - This will throw TypeError
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return obj.property;
  };

  const triggerRangeError = () => {
    const arr: number[] = [];
    arr.length = -1; // Will throw RangeError
  };

  const testServerError = async () => {
    try {
      const response = await fetch("/api/test/error");
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Server error test:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto max-w-2xl space-y-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Error Testing (Development Only)</CardTitle>
          <CardDescription>
            Test error tracking and error boundary functionality. All errors are
            captured to PostHog.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Client-Side Errors</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={throwClientError} variant="destructive">
                Throw Client Error
              </Button>
              <Button onClick={() => throwAsyncError()} variant="destructive">
                Throw Async Error
              </Button>
              <Button onClick={triggerTypeError} variant="destructive">
                Trigger TypeError
              </Button>
              <Button onClick={triggerRangeError} variant="destructive">
                Trigger RangeError
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Server-Side Errors</h3>
            <div className="flex flex-wrap gap-2">
              <Button onClick={testServerError} variant="destructive">
                Test Server Error (API)
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">State Test</h3>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount(count + 1)}>
                Increment: {count}
              </Button>
              <Button onClick={() => setCount(0)} variant="outline">
                Reset
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              This verifies the error boundary doesn&apos;t interfere with
              normal state management.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <ol className="list-inside list-decimal space-y-1">
            <li>Open your browser&apos;s DevTools Console</li>
            <li>Open PostHog dashboard (if configured)</li>
            <li>Click any error button above</li>
            <li>
              Verify error appears in console with PostHog capture confirmation
            </li>
            <li>Check PostHog dashboard for the exception event</li>
            <li>Verify error boundary shows user-friendly error page</li>
            <li>Click &quot;Try again&quot; to reset the error boundary</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
