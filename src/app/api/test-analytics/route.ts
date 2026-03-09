import { NextResponse } from "next/server";
import {
  trackServerEvent,
  identifyServerUser,
} from "@/server/services/analytics.service";

/**
 * Test endpoint to verify analytics tracking works
 *
 * GET /api/test-analytics
 *
 * This endpoint demonstrates:
 * - Server-side event tracking
 * - User identification
 * - Type-safe event properties
 */
export async function GET() {
  // Test user ID
  const testUserId = "test-user-123";

  // Track a test event (OAuth signup)
  trackServerEvent(testUserId, "user_signed_up", {
    method: "oauth",
    provider: "google",
    email: "test@example.com",
  });

  // Identify the test user
  identifyServerUser(testUserId, {
    email: "test@example.com",
    name: "Test User",
  });

  return NextResponse.json({
    success: true,
    message: "Analytics test completed",
    instructions: [
      "Check server logs for 🔵 and ✅ emojis",
      "Check PostHog dashboard for events",
      "Check Vercel Analytics dashboard",
    ],
  });
}
