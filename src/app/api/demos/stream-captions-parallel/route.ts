/**
 * Parallel Stream Captions API Route (V3)
 *
 * Two-phase approach:
 * 1. First AI call generates a content strategy and 3 platform-specific prompts
 * 2. Three parallel streams generate captions simultaneously
 *
 * Returns a multiplexed stream with platform-prefixed chunks.
 */

import { anthropic } from "@ai-sdk/anthropic";
import { generateObject, streamText, Output } from "ai";
import { z } from "zod";

// Schema for the strategy generation (phase 1)
const strategySchema = z.object({
  coreMessage: z.string().describe("The central message/theme to convey"),
  keyPoints: z.array(z.string()).describe("2-3 key points to emphasize"),
  twitterPrompt: z
    .string()
    .describe("Specific instructions for the Twitter caption"),
  linkedinPrompt: z
    .string()
    .describe("Specific instructions for the LinkedIn post"),
  instagramPrompt: z
    .string()
    .describe("Specific instructions for the Instagram caption"),
});

// Schema for individual platform captions
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

export type Strategy = z.infer<typeof strategySchema>;
export type TwitterCaption = z.infer<typeof twitterSchema>;
export type LinkedInCaption = z.infer<typeof linkedinSchema>;
export type InstagramCaption = z.infer<typeof instagramSchema>;

interface ParallelCaptionsRequest {
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ParallelCaptionsRequest;
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Phase 1: Generate content strategy and platform-specific prompts
    console.log("[parallel-captions] Phase 1: Generating strategy...");
    const { object: strategy } = await generateObject({
      model: anthropic("claude-haiku-4-5"),
      schema: strategySchema,
      prompt: `Analyze the following content and create a social media content strategy.

CONTENT:
${content}

Create:
1. A core message that captures the essence
2. 2-3 key points to emphasize across all platforms
3. Platform-specific instructions that will guide individual caption generation:
   - Twitter: Focus on being punchy, clever, max 280 chars
   - LinkedIn: Professional, thought-leadership tone, include call to action
   - Instagram: Personality-driven, visual-friendly, emoji-friendly

The platform prompts should be detailed enough that each can be used independently to generate a great caption.`,
    });

    console.log(
      "[parallel-captions] Strategy generated:",
      strategy.coreMessage,
    );

    // Phase 2: Launch 3 parallel streams
    const baseContext = `
CORE MESSAGE: ${strategy.coreMessage}
KEY POINTS: ${strategy.keyPoints.join(", ")}
ORIGINAL CONTENT: ${content}
`;

    // Create a multiplexed stream that combines all three platform streams
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // Send strategy first so client knows generation is starting
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "strategy", data: strategy })}\n\n`,
          ),
        );

        // Launch all three streams in parallel (streamText is sync - returns immediately)
        const streams = [
          // Twitter stream
          streamText({
            model: anthropic("claude-haiku-4-5"),
            output: Output.object({ schema: twitterSchema }),
            prompt: `${baseContext}

PLATFORM INSTRUCTIONS: ${strategy.twitterPrompt}

Generate a Twitter/X caption based on the above. Be punchy, clever, and under 280 characters.`,
          }),

          // LinkedIn stream
          streamText({
            model: anthropic("claude-haiku-4-5"),
            output: Output.object({ schema: linkedinSchema }),
            prompt: `${baseContext}

PLATFORM INSTRUCTIONS: ${strategy.linkedinPrompt}

Generate a LinkedIn post based on the above. Be professional and thought-provoking. Include a clear call to action.`,
          }),

          // Instagram stream
          streamText({
            model: anthropic("claude-haiku-4-5"),
            output: Output.object({ schema: instagramSchema }),
            prompt: `${baseContext}

PLATFORM INSTRUCTIONS: ${strategy.instagramPrompt}

Generate an Instagram caption based on the above. Be engaging and personality-driven. Include emojis and hashtags.`,
          }),
        ];

        const platforms = ["twitter", "linkedin", "instagram"] as const;

        // Process all streams concurrently
        const streamPromises = streams.map(async (result, index) => {
          const platform = platforms[index];
          try {
            for await (const partialObject of result.partialOutputStream) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "partial", platform, data: partialObject })}\n\n`,
                ),
              );
            }
            // Send completion signal for this platform
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "complete", platform })}\n\n`,
              ),
            );
          } catch (error) {
            console.error(
              `[parallel-captions] Error in ${platform} stream:`,
              error,
            );
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "error", platform, error: String(error) })}\n\n`,
              ),
            );
          }
        });

        // Wait for all streams to complete
        await Promise.all(streamPromises);

        // Signal end of all streams
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`),
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[parallel-captions] Error:", error);

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
