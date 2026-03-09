/**
 * Single Platform Caption API Route
 *
 * Streams a caption for one platform. Use 3 useObject hooks on the frontend
 * to stream all platforms in parallel.
 */

import { anthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import { z } from "zod";

const twitterSchema = z.object({
  caption: z.string().describe("A concise, engaging tweet (max 280 chars)"),
  hashtags: z.array(z.string()).describe("2-3 relevant hashtags"),
});

const linkedinSchema = z.object({
  caption: z.string().describe("A professional LinkedIn post (2-3 paragraphs)"),
  callToAction: z.string().describe("A clear call to action"),
});

const instagramSchema = z.object({
  caption: z
    .string()
    .describe("An engaging Instagram caption with personality"),
  hashtags: z.array(z.string()).describe("5-8 relevant hashtags"),
  emojis: z.array(z.string()).describe("2-4 emojis to use"),
});

const platformInstructions = {
  twitter:
    "Keep it punchy, clever, and under 280 characters. Be witty and engaging.",
  linkedin:
    "Write a professional, thought-provoking post. Include a clear call to action.",
  instagram:
    "Create an engaging, personality-driven caption with emojis and hashtags.",
} as const;

type Platform = "twitter" | "linkedin" | "instagram";

export async function POST(request: Request) {
  const { content, platform } = (await request.json()) as {
    content: string;
    platform: Platform;
  };

  if (!content || !platform) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  const instructions = platformInstructions[platform];
  const prompt = `Generate a ${platform} post for this content. ${instructions}

CONTENT:
${content}`;

  // Handle each platform separately to satisfy TypeScript
  if (platform === "twitter") {
    const result = streamText({
      model: anthropic("claude-haiku-4-5"),
      output: Output.object({ schema: twitterSchema }),
      prompt,
    });
    return result.toTextStreamResponse();
  }

  if (platform === "linkedin") {
    const result = streamText({
      model: anthropic("claude-haiku-4-5"),
      output: Output.object({ schema: linkedinSchema }),
      prompt,
    });
    return result.toTextStreamResponse();
  }

  if (platform === "instagram") {
    const result = streamText({
      model: anthropic("claude-haiku-4-5"),
      output: Output.object({ schema: instagramSchema }),
      prompt,
    });
    return result.toTextStreamResponse();
  }

  return new Response(JSON.stringify({ error: "Invalid platform" }), {
    status: 400,
  });
}
