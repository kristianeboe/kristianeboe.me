/**
 * Voice Story API Route
 *
 * Generates a personalized candidate summary/story from the conversation
 * using the Vercel AI SDK's streamText for real-time streaming.
 */

import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

import {
  formatTranscriptForExtraction,
  type ExtractedInterviewData,
} from "@/components/voice-chat/lib/extraction";
import { storyRequestSchema } from "@/lib/schemas/transcript";

const SYSTEM_PROMPT = `You are helping create a candidate profile summary for someone preparing for job interviews.

Based on their coaching conversation, write a short, compelling summary (5-8 sentences, ~100-120 words) that captures:

**What to include:**
- Their target role and why they're pursuing it
- Key strengths and relevant experience
- What makes them unique as a candidate
- Any specific areas they're working to improve
- Their career goals or motivations if mentioned

**Tone:**
- Professional but personable
- Confident without being boastful
- Specific rather than generic

Write in third person ("They are..." or use their name if known). Use short paragraphs.

This summary could be used for:
- Helping them articulate their value proposition
- Identifying talking points for interviews
- Tracking their interview prep progress

Output ONLY the candidate summary, no meta-commentary.`;

function buildUserPrompt(
  transcript: string,
  extractedData: ExtractedInterviewData,
): string {
  const dataContext = Object.entries(extractedData)
    .filter(([_, value]) => value != null && value !== "")
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `- ${key}: ${value.join(", ")}`;
      }
      return `- ${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`;
    })
    .join("\n");

  return `## Coaching Conversation Transcript
${transcript}

## Extracted Candidate Information
${dataContext || "No structured data extracted yet."}

Generate a personalized candidate summary based on this conversation.`;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { messages, extractedData } = storyRequestSchema.parse(body);

    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Format transcript for the AI
    const transcript = formatTranscriptForExtraction(messages);

    console.log(
      "[story] Generating candidate summary from transcript:",
      transcript.slice(0, 200) + "...",
    );

    // Use streamText for real-time streaming
    const result = streamText({
      model: anthropic("claude-sonnet-4-5"),
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(transcript, extractedData),
    });

    // Return as text stream for simple consumption
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[story] Error:", error);

    return new Response(
      JSON.stringify({
        error: "Story generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
