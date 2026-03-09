/**
 * Voice Extract API Route
 *
 * Extracts structured interview candidate data from conversation transcript
 * using the Vercel AI SDK's Output.object() for structured outputs.
 */

import { NextResponse } from "next/server";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";

import {
  interviewExtractionSchema,
  formatTranscriptForExtraction,
  createExtractionPrompt,
  parseExtractionResponse,
} from "@/components/voice-chat/lib/extraction";
import { extractRequestSchema } from "@/lib/schemas/transcript";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { messages, previousData } = extractRequestSchema.parse(body);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
    }

    // Format transcript for the AI
    const transcript = formatTranscriptForExtraction(messages);
    const userPrompt = createExtractionPrompt(transcript);

    // Add context about previous extraction if available
    const systemPrompt = previousData
      ? `You are extracting interview candidate information from a coaching conversation.
         Previous extraction found these values (update or add to them as needed):
         ${JSON.stringify(previousData, null, 2)}

         Focus on SPECIFIC details mentioned in the conversation.`
      : `You are extracting interview candidate information from a coaching conversation.

         Focus on specific details that were explicitly mentioned or strongly implied.
         Only fill in fields where you have reasonable confidence from the conversation.`;

    console.log(
      "[extract] Extracting from transcript:",
      transcript.slice(0, 200) + "...",
    );

    // Use AI SDK's generateObject for structured extraction
    const aiStartTime = Date.now();
    const { object } = await generateObject({
      model: anthropic("claude-haiku-4-5"),
      schema: interviewExtractionSchema,
      system: systemPrompt,
      prompt: userPrompt,
    });

    console.log(
      `[extract] Complete in ${Date.now() - aiStartTime}ms:`,
      Object.keys(object).filter(
        (k) => object[k as keyof typeof object] != null,
      ).length,
      "fields",
    );

    // Parse the extraction result
    const result = parseExtractionResponse(object);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[extract] Error:", error);

    return NextResponse.json(
      {
        error: "Extraction failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
