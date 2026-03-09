import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type ModelMessage } from "ai";

const INTERVIEW_COACH_SYSTEM_PROMPT = `You are an expert interview coach helping someone prepare for their upcoming interview. Your goal is to help them practice articulating their experiences clearly and confidently.

## Your Approach
- Warm and encouraging, but also honest and constructive
- Ask one question at a time, then provide brief feedback
- Help them structure answers using frameworks like STAR (Situation, Task, Action, Result)
- Keep responses SHORT - this is practice, not a lecture

## Information to Gather
1. What role are they interviewing for?
2. What company or type of company?
3. Their relevant experience level
4. Any specific questions they want to practice?

## How to Coach
- After they answer, give 1-2 sentences of specific feedback
- Highlight what they did well
- Suggest one concrete improvement
- Then move to the next question or follow-up

## Example Opening
"Hey! I'm here to help you nail your upcoming interview. What role are you preparing for?"`;

interface UIMessagePart {
  type: string;
  text?: string;
}

interface UIMessage {
  role: string;
  parts?: UIMessagePart[];
}

/**
 * POST /api/voice-v2/chat
 *
 * Streaming text chat endpoint for the interview coach demo.
 * Uses Anthropic Claude with the interview coach system prompt baked in.
 */
export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: UIMessage[] };

    // Transform UIMessage format to ModelMessage format
    const modelMessages: ModelMessage[] = messages.map((msg: UIMessage) => {
      const content =
        msg.parts
          ?.filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("") || "";

      return {
        role: msg.role as "user" | "assistant",
        content,
      };
    });

    const result = streamText({
      model: anthropic("claude-sonnet-4-5"),
      messages: modelMessages,
      system: INTERVIEW_COACH_SYSTEM_PROMPT,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[voice-v2/chat] API error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Failed to process chat",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
