"use client";

/**
 * GlowingOrb
 *
 * An immersive visual representation of the voice agent state.
 * The orb pulses, glows, and reacts to audio levels to create
 * a more ambient conversation experience.
 */
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import type { AudioLevel, TranscriptMessage, VoiceAgentState } from "../types";

interface GlowingOrbProps {
  state: VoiceAgentState;
  audioLevel?: AudioLevel;
  /** Pass messages to detect if AI is still speaking (for state priority) */
  messages?: TranscriptMessage[];
  className?: string;
}

// State configuration with colors and labels
interface StateConfig {
  gradient: string;
  glowColor: string;
  animation: string;
  label: string;
}

const STATE_CONFIGS: Record<VoiceAgentState, StateConfig> = {
  idle: {
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0.2) 50%, rgba(59,130,246,0.1) 100%)",
    glowColor: "rgba(59, 130, 246, 0.4)",
    animation: "animate-pulse",
    label: "Ready to chat",
  },
  connecting: {
    gradient:
      "radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(245,158,11,0.25) 50%, rgba(245,158,11,0.1) 100%)",
    glowColor: "rgba(245, 158, 11, 0.4)",
    animation: "animate-spin-slow",
    label: "Connecting...",
  },
  connected: {
    gradient:
      "radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0.25) 50%, rgba(16,185,129,0.1) 100%)",
    glowColor: "rgba(16, 185, 129, 0.4)",
    animation: "animate-pulse",
    label: "Connected",
  },
  listening: {
    gradient:
      "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(59,130,246,0.3) 50%, rgba(59,130,246,0.1) 100%)",
    glowColor: "rgba(6, 182, 212, 0.5)",
    animation: "", // Dynamic based on audio level
    label: "Listening...",
  },
  speaking: {
    gradient:
      "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0.3) 50%, rgba(139,92,246,0.1) 100%)",
    glowColor: "rgba(139, 92, 246, 0.5)",
    animation: "animate-pulse",
    label: "Speaking",
  },
  processing: {
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0.25) 50%, rgba(249,115,22,0.1) 100%)",
    glowColor: "rgba(249, 115, 22, 0.4)",
    animation: "animate-pulse",
    label: "Thinking...",
  },
  error: {
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.25) 50%, rgba(239,68,68,0.1) 100%)",
    glowColor: "rgba(239, 68, 68, 0.4)",
    animation: "animate-pulse",
    label: "Connection error",
  },
};

export function GlowingOrb({
  state,
  audioLevel = 0,
  messages = [],
  className,
}: GlowingOrbProps) {
  // Track if we recently finished speaking (for smooth transition)
  const [recentlySpeaking, setRecentlySpeaking] = useState(false);

  // Check if the AI is still speaking (last assistant message is incomplete)
  const isAiStillSpeaking = useMemo(() => {
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    return lastAssistantMessage?.isFinal === false;
  }, [messages]);

  // When AI stops speaking, keep showing "speaking" for a short delay
  // This accounts for audio playback lag after transcript completes
  useEffect(() => {
    if (isAiStillSpeaking) {
      setRecentlySpeaking(true);
    } else if (recentlySpeaking) {
      const timer = setTimeout(() => {
        setRecentlySpeaking(false);
      }, 800); // Keep showing "speaking" for 800ms after transcript ends
      return () => clearTimeout(timer);
    }
  }, [isAiStillSpeaking, recentlySpeaking]);

  // Determine display state with priority:
  // 1. If AI is still speaking or recently finished, show "speaking"
  // 2. Map "connected" to "listening" for better UX
  const displayState = useMemo(() => {
    const shouldShowSpeaking = isAiStillSpeaking || recentlySpeaking;
    if (
      shouldShowSpeaking &&
      (state === "listening" || state === "connected")
    ) {
      return "speaking";
    }
    if (state === "connected") {
      return "listening";
    }
    return state;
  }, [state, isAiStillSpeaking, recentlySpeaking]);

  // Calculate dynamic scale based on audio level for listening state
  const dynamicScale = useMemo(() => {
    if (displayState === "listening") {
      // Scale from 1 to 1.3 based on audio level
      return 1 + audioLevel * 0.3;
    }
    return 1;
  }, [displayState, audioLevel]);

  const config = STATE_CONFIGS[displayState];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        className,
      )}
    >
      {/* Outer glow layers */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Largest blur layer */}
        <div
          className={cn(
            "absolute h-48 w-48 rounded-full opacity-40 blur-2xl transition-all duration-500",
            config.animation,
          )}
          style={{
            background: config.gradient,
            transform: `scale(${displayState === "listening" ? dynamicScale * 1.15 : 1})`,
          }}
        />
        {/* Medium blur layer */}
        <div
          className={cn(
            "absolute h-36 w-36 rounded-full opacity-60 blur-xl transition-all duration-300",
            config.animation,
          )}
          style={{
            background: config.gradient,
            transform: `scale(${displayState === "listening" ? dynamicScale * 1.1 : 1})`,
            animationDelay: "150ms",
          }}
        />
      </div>

      {/* Main orb */}
      <div
        className={cn(
          "relative z-10 flex h-28 w-28 items-center justify-center rounded-full shadow-2xl ring-2 ring-white/20 transition-all duration-200",
          config.animation,
        )}
        style={{
          background: config.gradient,
          transform: `scale(${dynamicScale})`,
          boxShadow: `
            0 0 40px 12px ${config.glowColor},
            0 0 60px 24px ${config.glowColor.replace("0.4", "0.2").replace("0.5", "0.25")},
            inset 0 0 40px ${config.glowColor}
          `,
        }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />

        {/* Center dot for focus */}
        <div
          className={cn(
            "h-3 w-3 rounded-full bg-white/80 shadow-lg transition-all duration-200",
            displayState === "speaking" && "animate-pulse",
            displayState === "processing" && "animate-ping",
          )}
          style={{
            boxShadow: "0 0 20px 5px rgba(255,255,255,0.5)",
          }}
        />
      </div>

      {/* Spacer to maintain layout */}
      <div className="mt-6" />

      {/* Particle effects for active states */}
      {(displayState === "listening" || displayState === "speaking") && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "absolute top-1/2 left-1/2 h-1 w-1 rounded-full",
                displayState === "listening"
                  ? "bg-blue-400/60"
                  : "bg-violet-400/60",
              )}
              style={{
                animation: `orb-particle-float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Inline keyframes for particle animation */}
      <style>{`
        @keyframes orb-particle-float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-70px) translateX(20px) scale(1.5);
            opacity: 0.8;
          }
          90% {
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
