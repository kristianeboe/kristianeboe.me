/**
 * Stream Captions API Route
 *
 * Streams 3 social media captions simultaneously using AI SDK's streamText with Output.object().
 * Each caption is streamed as a partial object, allowing real-time UI updates.
 */

import { anthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import { z } from "zod";

const socialMediaCaptionsSchema = z.object({
  twitter: z.object({
    caption: z.string().describe("A concise, engaging tweet (max 280 chars)"),
    hashtags: z.array(z.string()).describe("2-3 relevant hashtags"),
    tone: z
      .string()
      .describe("The tone of the caption (e.g., witty, professional, casual)"),
  }),
  linkedin: z.object({
    caption: z
      .string()
      .describe("A professional LinkedIn post (2-3 paragraphs)"),
    callToAction: z.string().describe("A clear call to action"),
    tone: z
      .string()
      .describe(
        "The tone of the caption (e.g., thought-leadership, storytelling)",
      ),
  }),
  instagram: z.object({
    caption: z
      .string()
      .describe("An engaging Instagram caption with personality"),
    hashtags: z.array(z.string()).describe("5-8 relevant hashtags"),
    emojis: z.array(z.string()).describe("2-4 emojis to use"),
    tone: z
      .string()
      .describe(
        "The tone of the caption (e.g., fun, inspirational, aesthetic)",
      ),
  }),
});

export type SocialMediaCaptions = z.infer<typeof socialMediaCaptionsSchema>;

interface StreamCaptionsRequest {
  topic: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StreamCaptionsRequest;
    const { topic } = body;

    if (!topic || topic.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Topic is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = streamText({
      model: anthropic("claude-sonnet-4-5"),
      output: Output.object({
        schema: socialMediaCaptionsSchema,
      }),
      prompt: `Generate engaging social media captions for the following topic: "${topic}"

Create unique, platform-optimized content for each social network:

1. Twitter/X: Keep it punchy, clever, and under 280 characters. Use 2-3 hashtags.

2. LinkedIn: Write a professional, thought-provoking post that would resonate with industry professionals. Include a clear call to action.

3. Instagram: Create an engaging, personality-driven caption. Include relevant emojis and 5-8 hashtags.

Make each caption feel authentic to its platform while maintaining a consistent message about the topic.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[stream-captions] Error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate captions",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
