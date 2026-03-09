import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { InterviewCoachDemo } from "./_components/InterviewCoachDemo";

/**
 * Voice + Chat Demo v2
 *
 * A production-quality voice+chat implementation featuring:
 * - 8-state GlowingOrb with audio reactivity
 * - Full-screen voice overlay when speaking
 * - Unified message state between voice and chat
 * - Multi-agent architecture (extraction + story agents)
 * - Interview coach persona for demo
 */
export default function VoiceChatV2Demo() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Voice + Chat Demo v2</h1>
        <p className="text-muted-foreground">
          Production-quality voice+chat implementation with immersive UX. Try
          the Interview Coach to practice for your next interview.
        </p>
      </div>

      {/* Key Concepts Card */}
      <Card className="border-primary mb-8">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">Voice Overlay UX</h3>
            <p className="text-muted-foreground text-sm">
              When voice is active, a full-screen overlay with the GlowingOrb
              takes over. This provides an immersive, focused voice conversation
              experience without the distraction of scrolling messages. The chat
              transcript continues to accumulate in the background.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">8-State Orb</h3>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              <li>
                <strong>Idle (Blue):</strong> Ready to start
              </li>
              <li>
                <strong>Connecting (Amber):</strong> Establishing WebRTC
                connection
              </li>
              <li>
                <strong>Connected (Green):</strong> Session active
              </li>
              <li>
                <strong>Listening (Cyan):</strong> Detecting user speech with
                audio reactivity
              </li>
              <li>
                <strong>Processing (Orange):</strong> Transcribing user input
              </li>
              <li>
                <strong>Speaking (Violet):</strong> AI is responding
              </li>
              <li>
                <strong>Error (Red):</strong> Connection issue
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Unified Message State</h3>
            <p className="text-muted-foreground text-sm">
              Both voice and chat share a single <code>UIMessage[]</code> state.
              When you switch between modes, the full conversation history is
              preserved and the agent has complete context. Voice transcripts
              are written to the unified state as they finalize.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">800ms Grace Period</h3>
            <p className="text-muted-foreground text-sm">
              After the AI transcript completes, the orb stays in
              &quot;speaking&quot; state for 800ms. This accounts for audio
              playback lag and provides smoother visual transitions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Agent Architecture */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Multi-Agent Architecture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            This demo showcases a multi-agent pattern where the primary
            conversation agent is augmented by specialized background agents
            that process the conversation in real-time.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Extraction Agent</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Runs automatically after each assistant message (with 3s
                debounce and 5s minimum gap). Uses Claude Haiku with structured
                outputs via <code>generateObject()</code>.
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-xs">
                <li>Target role and company</li>
                <li>Years of experience</li>
                <li>Key skills mentioned</li>
                <li>Salary expectations</li>
                <li>Location preferences</li>
                <li>Interview stage</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Story Agent</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Generates a candidate summary on-demand. Uses Claude Sonnet with
                streaming via <code>streamText()</code>. Combines extracted
                structured data with full conversation context.
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-xs">
                <li>5-8 sentence summary</li>
                <li>Third-person narrative</li>
                <li>Highlights strengths</li>
                <li>Notes areas for improvement</li>
              </ul>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="mb-2 text-sm font-medium">API Endpoints</h4>
            <ul className="space-y-1 font-mono text-xs">
              <li>
                <code>POST /api/voice/token</code> - OpenAI Realtime token
              </li>
              <li>
                <code>POST /api/voice/chat</code> - Chat with interview coach
              </li>
              <li>
                <code>POST /api/voice/extract</code> - Structured data
                extraction
              </li>
              <li>
                <code>POST /api/voice/story</code> - Candidate summary
                generation
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Demo */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Try It Out</h2>
        <InterviewCoachDemo />
      </section>

      {/* Code Examples */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Voice + Chat Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            {`import { useState } from "react";
import type { UIMessage } from "ai";
import {
  useVoiceSession,
  GlowingOrb,
  ChatInputBar,
  MessageList,
  VoiceOverlay,
} from "@/components/voice-chat";

function MyChat() {
  const [messages, setMessages] = useState<UIMessage[]>([]);

  const voice = useVoiceSession({
    systemPrompt: "You are a helpful assistant.",
    messages,
    setMessages,
  });

  return (
    <div className="relative h-[500px]">
      {/* Voice overlay when active */}
      {voice.state !== "idle" && (
        <VoiceOverlay
          state={voice.state}
          audioLevel={voice.audioLevel}
          messages={voice.messages}
          onStop={voice.stopSession}
        />
      )}

      {/* Normal chat interface */}
      <MessageList messages={messages} />
      <ChatInputBar
        onSend={sendMessage}
        onStartVoice={voice.startSession}
        onStopVoice={voice.stopSession}
        isVoiceActive={voice.state !== "idle"}
      />
    </div>
  );
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Extraction Example */}
      <Card>
        <CardHeader>
          <CardTitle>Extraction Schema Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            {`import { z } from "zod";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import {
  interviewExtractionSchema,
  formatTranscriptForExtraction,
  calculateCompleteness,
  type ExtractedInterviewData,
} from "@/components/voice-chat";

// Extract structured data from conversation
const { object } = await generateObject({
  model: anthropic("claude-haiku-4-5"),
  schema: interviewExtractionSchema,
  prompt: formatTranscriptForExtraction(messages),
});

// Calculate profile completeness (0-100)
const completeness = calculateCompleteness(object);

// Access extracted fields
console.log(object.targetRole);      // "Senior Frontend Engineer"
console.log(object.keySkills);       // ["React", "TypeScript", "Node.js"]
console.log(object.salaryExpectation); // "$150k-180k"`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
