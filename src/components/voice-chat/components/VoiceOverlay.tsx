"use client";

import { Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { AudioLevel, TranscriptMessage, VoiceAgentState } from "../types";
import { GlowingOrb } from "./GlowingOrb";

interface VoiceOverlayProps {
  state: VoiceAgentState;
  audioLevel: AudioLevel;
  messages: TranscriptMessage[];
  onStop: () => void;
  className?: string;
}

/**
 * Full-screen voice overlay
 *
 * Shows a centered orb when voice is active, hiding the chat interface
 * to provide a focused voice conversation experience.
 */
export function VoiceOverlay({
  state,
  audioLevel,
  messages,
  onStop,
  className,
}: VoiceOverlayProps) {
  // Get status text based on state
  const getStatusText = () => {
    switch (state) {
      case "connecting":
        return "Connecting...";
      case "connected":
      case "listening":
        return "Listening...";
      case "speaking":
        return "Speaking...";
      case "processing":
        return "Thinking...";
      case "error":
        return "Connection error";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "bg-background absolute inset-0 z-10 flex flex-col items-center justify-center",
        className,
      )}
    >
      {/* Main orb */}
      <div className="flex flex-1 items-center justify-center">
        <GlowingOrb
          state={state}
          audioLevel={audioLevel}
          messages={messages}
          className="h-64 w-64"
        />
      </div>

      {/* Status and controls */}
      <div className="flex flex-col items-center gap-4 pb-8">
        {/* Status text */}
        <p className="text-muted-foreground animate-pulse text-sm">
          {getStatusText()}
        </p>

        {/* Stop button */}
        <Button
          variant="destructive"
          size="lg"
          onClick={onStop}
          className="gap-2"
        >
          <Square className="h-4 w-4 fill-current" />
          End Voice
        </Button>
      </div>
    </div>
  );
}
