"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import {
  Briefcase,
  Building2,
  DollarSign,
  Loader2,
  MapPin,
  Mic,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  useVoiceSession,
  GlowingOrb,
  ChatInputBar,
  MessageList,
  VoiceOverlay,
  type TranscriptMessage,
} from "@/components/voice-chat";
import {
  type ExtractedInterviewData,
  calculateCompleteness,
} from "@/components/voice-chat/lib/extraction";

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
5. Their location preference or salary expectations (if relevant)

## How to Coach
- After they answer, give 1-2 sentences of specific feedback
- Highlight what they did well
- Suggest one concrete improvement
- Then move to the next question or follow-up

## Example Opening
"Hey! I'm here to help you nail your upcoming interview. What role are you preparing for?"`;

export function InterviewCoachDemo() {
  // Unified message state
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Extraction state
  const [extractedData, setExtractedData] = useState<ExtractedInterviewData>(
    {},
  );
  const [isExtracting, setIsExtracting] = useState(false);
  const lastExtractionRef = useRef<number>(0);
  const extractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Story state
  const [story, setStory] = useState("");
  const [isStreamingStory, setIsStreamingStory] = useState(false);

  // Voice session
  const voice = useVoiceSession({
    systemPrompt: INTERVIEW_COACH_SYSTEM_PROMPT,
    messages,
    setMessages,
  });

  const isVoiceActive = voice.state !== "idle";
  const completeness = calculateCompleteness(extractedData);

  // Convert UIMessage to TranscriptMessage for extraction
  const convertToTranscriptMessages = useCallback((): TranscriptMessage[] => {
    return messages.map((msg, index) => ({
      id: msg.id,
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join(""),
      timestamp: new Date(Date.now() - (messages.length - index) * 1000),
      isFinal: true,
    }));
  }, [messages]);

  // Extract data from conversation
  const extractFromMessages = useCallback(
    async (msgs: TranscriptMessage[]) => {
      const now = Date.now();
      if (now - lastExtractionRef.current < 5000) {
        return;
      }

      if (msgs.length < 2) {
        return;
      }

      lastExtractionRef.current = now;
      setIsExtracting(true);

      try {
        const response = await fetch("/api/voice/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: msgs,
            previousData: extractedData,
          }),
        });

        if (!response.ok) {
          console.warn("Extraction failed:", response.status);
          return;
        }

        const result = (await response.json()) as {
          success: boolean;
          data?: ExtractedInterviewData;
        };
        if (result.success && result.data) {
          setExtractedData((prev) => ({ ...prev, ...result.data }));
        }
      } catch (error) {
        console.error("Extraction error:", error);
      } finally {
        setIsExtracting(false);
      }
    },
    [extractedData],
  );

  // Schedule extraction after messages update
  const scheduleExtraction = useCallback(
    (msgs: TranscriptMessage[]) => {
      if (extractionTimeoutRef.current) {
        clearTimeout(extractionTimeoutRef.current);
      }

      extractionTimeoutRef.current = setTimeout(() => {
        void extractFromMessages(msgs);
      }, 3000);
    },
    [extractFromMessages],
  );

  // Trigger extraction when messages change
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      const transcriptMessages = convertToTranscriptMessages();
      scheduleExtraction(transcriptMessages);
    }
  }, [messages, convertToTranscriptMessages, scheduleExtraction]);

  // Generate story
  const generateStory = useCallback(async () => {
    if (messages.length < 4) return;

    setIsStreamingStory(true);
    setStory("");

    try {
      const transcriptMessages = convertToTranscriptMessages();
      const response = await fetch("/api/voice/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: transcriptMessages,
          extractedData,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let storyContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        storyContent += chunk;
        setStory(storyContent);
      }
    } catch (error) {
      console.error("Story generation error:", error);
    } finally {
      setIsStreamingStory(false);
    }
  }, [messages, extractedData, convertToTranscriptMessages]);

  // Send a chat message
  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: UIMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        parts: [{ type: "text", text }],
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/voice/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let assistantContent = "";
        const assistantId = `assistant-${Date.now()}`;

        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            parts: [{ type: "text", text: "" }],
          },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantContent += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, parts: [{ type: "text", text: assistantContent }] }
                : msg,
            ),
          );
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [messages],
  );

  // Empty state
  if (messages.length === 0 && !isVoiceActive) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex h-[500px] flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-4">
              <div className="flex h-40 w-40 items-center justify-center">
                <GlowingOrb state="idle" />
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-semibold">
                  Practice with your Interview Coach
                </h3>
                <p className="text-muted-foreground max-w-md text-sm">
                  Get real-time feedback on your interview answers. Practice
                  articulating your experiences clearly and confidently.
                </p>
                <Button
                  size="lg"
                  onClick={voice.startSession}
                  className="gap-2"
                >
                  <Mic className="h-4 w-4" />
                  Start Voice Practice
                </Button>
                <p className="text-muted-foreground text-xs">
                  or type below to chat
                </p>
              </div>
            </div>
            <ChatInputBar
              onSend={sendMessage}
              onStartVoice={voice.startSession}
              onStopVoice={voice.stopSession}
              isVoiceActive={isVoiceActive}
              isLoading={isLoading}
              placeholder="Type to start practicing..."
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Active conversation state with side panels
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Main chat area */}
      <Card className="overflow-hidden lg:col-span-2">
        <CardContent className="p-0">
          <div className="relative flex h-[500px] flex-col">
            {isVoiceActive && (
              <VoiceOverlay
                state={voice.state}
                audioLevel={voice.audioLevel}
                messages={voice.messages}
                onStop={voice.stopSession}
              />
            )}
            <MessageList messages={messages} className="flex-1" />
            <ChatInputBar
              onSend={sendMessage}
              onStartVoice={voice.startSession}
              onStopVoice={voice.stopSession}
              isVoiceActive={isVoiceActive}
              isLoading={isLoading}
              placeholder="Type your answer..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Right sidebar with extraction and story */}
      <div className="space-y-4">
        {/* Extracted Data Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Candidate Profile
              </CardTitle>
              {isExtracting && (
                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
              )}
            </div>
            <Progress value={completeness} className="h-1.5" />
          </CardHeader>
          <CardContent className="space-y-3">
            {extractedData.targetRole && (
              <div className="flex items-start gap-2">
                <Briefcase className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">
                    {extractedData.targetRole}
                  </p>
                  {extractedData.yearsExperience && (
                    <p className="text-muted-foreground text-xs">
                      {extractedData.yearsExperience} years experience
                    </p>
                  )}
                </div>
              </div>
            )}

            {(extractedData.targetCompany || extractedData.companyType) && (
              <div className="flex items-start gap-2">
                <Building2 className="text-muted-foreground mt-0.5 h-4 w-4" />
                <p className="text-sm">
                  {extractedData.targetCompany || extractedData.companyType}
                  {extractedData.industry && (
                    <span className="text-muted-foreground">
                      {" "}
                      · {extractedData.industry}
                    </span>
                  )}
                </p>
              </div>
            )}

            {extractedData.location && (
              <div className="flex items-start gap-2">
                <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
                <p className="text-sm">{extractedData.location}</p>
              </div>
            )}

            {extractedData.salaryExpectation && (
              <div className="flex items-start gap-2">
                <DollarSign className="text-muted-foreground mt-0.5 h-4 w-4" />
                <p className="text-sm">{extractedData.salaryExpectation}</p>
              </div>
            )}

            {extractedData.keySkills && extractedData.keySkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {extractedData.keySkills.slice(0, 5).map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}

            {Object.keys(extractedData).length === 0 && (
              <p className="text-muted-foreground py-4 text-center text-sm">
                Start chatting to build your profile...
              </p>
            )}
          </CardContent>
        </Card>

        {/* Story Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Candidate Summary
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateStory}
                disabled={isStreamingStory || messages.length < 4}
                className="h-7 px-2"
              >
                {isStreamingStory ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {story ? (
              <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                {story}
              </p>
            ) : (
              <p className="text-muted-foreground py-4 text-center text-sm">
                {messages.length < 4
                  ? "Have a few more exchanges to generate a summary..."
                  : "Click refresh to generate your candidate summary"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
