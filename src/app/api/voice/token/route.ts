import { NextResponse } from "next/server";

import { getSession } from "@/server/better-auth/server";
import { env } from "@/env";

interface OpenAISessionResponse {
  client_secret?: {
    value: string;
  };
}

/**
 * POST /api/voice-v2/token
 *
 * Creates an ephemeral token for OpenAI Realtime API voice sessions.
 * Requires authentication via Better Auth.
 *
 * @returns sessionToken for WebRTC connection
 */
export async function POST() {
  try {
    // Authenticate user
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized", needsAuth: true },
        { status: 401 },
      );
    }

    // Request ephemeral token from OpenAI
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "verse",
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[voice-v2/token] OpenAI API error:", error);
      return NextResponse.json(
        { error: "Failed to create voice session" },
        { status: response.status },
      );
    }

    const data = (await response.json()) as OpenAISessionResponse;

    // Return in the format expected by useVoiceSession
    return NextResponse.json({
      sessionToken: data.client_secret?.value,
    });
  } catch (error) {
    console.error("[voice-v2/token] Failed to create voice token:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create voice session",
      },
      { status: 500 },
    );
  }
}
