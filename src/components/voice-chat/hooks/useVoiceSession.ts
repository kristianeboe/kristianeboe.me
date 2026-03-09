import type { UIMessage } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  RealtimeEvent,
  SessionResponse,
  TranscriptMessage,
  UseVoiceSessionOptions,
  UseVoiceSessionReturn,
  VoiceAgentState,
} from "../types";
import { useAudioLevel } from "./useAudioLevel";

/**
 * Hook for managing OpenAI Realtime voice sessions
 *
 * Handles WebRTC connection, audio streaming, and transcript management.
 * Integrates with a unified message state shared with chat.
 */
export function useVoiceSession({
  systemPrompt,
  voice = "verse",
  autoStart = false,
  onError,
  messages: unifiedMessages,
  setMessages: setUnifiedMessages,
}: UseVoiceSessionOptions): UseVoiceSessionReturn {
  // Voice state
  const [state, setState] = useState<VoiceAgentState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);

  // WebRTC refs
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Audio level for visualization
  const audioLevel = useAudioLevel(localStreamRef.current);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (audioElementRef.current) {
      audioElementRef.current.srcObject = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Helper to write finalized transcript message to unified state
  const writeToUnified = useCallback(
    (transcriptMsg: TranscriptMessage) => {
      const uiMessage: UIMessage = {
        id: transcriptMsg.id,
        role: transcriptMsg.role,
        parts: [{ type: "text", text: transcriptMsg.content }],
      };

      setUnifiedMessages((prev) => {
        // Check if message already exists
        const existingIdx = prev.findIndex((m) => m.id === uiMessage.id);
        if (existingIdx >= 0) {
          // Update existing message
          const updated = [...prev];
          updated[existingIdx] = uiMessage;
          return updated;
        }
        // Append new message
        return [...prev, uiMessage];
      });
    },
    [setUnifiedMessages],
  );

  // Handle Realtime API events
  const handleRealtimeEvent = useCallback(
    (event: RealtimeEvent) => {
      switch (event.type) {
        case "session.created":
          console.log("[VoiceSession] Session created");
          setState("connected");
          break;

        case "session.updated":
          console.log("[VoiceSession] Session updated");
          break;

        case "input_audio_buffer.speech_started":
          setState("listening");
          break;

        case "input_audio_buffer.speech_stopped":
          setState("processing");
          break;

        case "conversation.item.input_audio_transcription.completed":
          if (event.transcript) {
            const transcript = event.transcript;
            const itemId =
              event.item_id ||
              `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

            const userMessage: TranscriptMessage = {
              id: itemId,
              role: "user",
              content: transcript,
              timestamp: new Date(),
              isFinal: true,
            };

            setMessages((prev) => {
              const existingIdx = prev.findIndex((m) => m.id === itemId);
              if (existingIdx >= 0) {
                const updated = [...prev];
                updated[existingIdx] = {
                  ...updated[existingIdx]!,
                  content: transcript,
                  isFinal: true,
                };
                return updated;
              }

              // Insert before any incomplete assistant messages
              const firstIncompleteAssistantIdx = prev.findIndex(
                (m) => m.role === "assistant" && !m.isFinal,
              );

              if (firstIncompleteAssistantIdx >= 0) {
                return [
                  ...prev.slice(0, firstIncompleteAssistantIdx),
                  userMessage,
                  ...prev.slice(firstIncompleteAssistantIdx),
                ];
              }

              return [...prev, userMessage];
            });

            // Write finalized user message to unified state
            writeToUnified(userMessage);
          }
          break;

        case "response.audio_transcript.delta":
          setState("speaking");
          if (event.delta) {
            const delta = event.delta;
            const itemId = event.item_id;
            setMessages((prev) => {
              if (itemId) {
                const existingIdx = prev.findIndex((m) => m.id === itemId);
                if (existingIdx >= 0) {
                  const updated = [...prev];
                  updated[existingIdx] = {
                    ...updated[existingIdx]!,
                    content: updated[existingIdx]!.content + delta,
                  };
                  return updated;
                }
                const newMessage: TranscriptMessage = {
                  id: itemId,
                  role: "assistant",
                  content: delta,
                  timestamp: new Date(),
                  isFinal: false,
                };
                return [...prev, newMessage];
              }
              // Fallback: append to last incomplete assistant message
              const lastIdx = prev.length - 1;
              const last = prev[lastIdx];
              if (last?.role === "assistant" && !last.isFinal) {
                const updated = [...prev];
                updated[lastIdx] = {
                  ...last,
                  content: last.content + delta,
                };
                return updated;
              }
              const newMessage: TranscriptMessage = {
                id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                role: "assistant",
                content: delta,
                timestamp: new Date(),
                isFinal: false,
              };
              return [...prev, newMessage];
            });
          }
          break;

        case "response.audio_transcript.done":
          if (event.transcript) {
            const transcript = event.transcript;
            const itemId = event.item_id;

            // Create the message outside setMessages so we can write it to unified
            const assistantMessage: TranscriptMessage = {
              id:
                itemId ||
                `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              role: "assistant",
              content: transcript,
              timestamp: new Date(),
              isFinal: true,
            };

            setMessages((prev) => {
              if (itemId) {
                const existingIdx = prev.findIndex((m) => m.id === itemId);
                if (existingIdx >= 0) {
                  const updated = [...prev];
                  updated[existingIdx] = {
                    ...updated[existingIdx]!,
                    content: transcript,
                    isFinal: true,
                  };
                  return updated;
                }
                return [...prev, assistantMessage];
              }
              // Fallback: mark last assistant message as final
              const lastIdx = prev.length - 1;
              const last = prev[lastIdx];
              if (last?.role === "assistant" && !last.isFinal) {
                const updated = [...prev];
                updated[lastIdx] = {
                  ...last,
                  content: transcript,
                  isFinal: true,
                };
                return updated;
              }
              return prev;
            });

            // Write finalized assistant message to unified state
            writeToUnified(assistantMessage);
          }
          setState("connected");
          break;

        case "response.done":
          setState("connected");
          break;

        case "error":
          console.error("[VoiceSession] API error:", event.error);
          setState("error");
          onError?.(
            new Error(event.error?.message ?? "Voice connection error"),
          );
          break;
      }
    },
    [writeToUnified, onError],
  );

  // Start voice session
  const startSession = useCallback(async () => {
    try {
      setState("connecting");

      // Get ephemeral token from our API
      const sessionResponse = await fetch("/api/voice/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "openai" }),
      });

      const sessionData: SessionResponse =
        (await sessionResponse.json()) as SessionResponse;

      if (!sessionResponse.ok) {
        if (sessionData.needsAuth) {
          throw new Error("Please sign in to use voice features");
        }
        throw new Error(sessionData.error ?? "Failed to create session");
      }

      const { sessionToken } = sessionData;

      if (!sessionToken) {
        throw new Error("No session token received");
      }

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 24000,
        },
      });
      localStreamRef.current = stream;

      // Create peer connection
      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      // Set up audio output
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElementRef.current = audioEl;

      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0] ?? null;
      };

      // Add microphone track
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        pc.addTrack(audioTrack, stream);
      }

      // Create data channel for events
      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;

      dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data as string) as RealtimeEvent;
          handleRealtimeEvent(event);
        } catch (error) {
          console.error("[VoiceSession] Failed to parse event:", error);
        }
      };

      dc.onopen = () => {
        console.log("[VoiceSession] Data channel opened");

        // Configure session
        const sessionConfig = {
          type: "session.update",
          session: {
            instructions: systemPrompt,
            voice,
            input_audio_transcription: {
              model: "whisper-1",
            },
            turn_detection: {
              type: "server_vad",
              threshold: 0.7,
              prefix_padding_ms: 300,
              silence_duration_ms: 700,
            },
          },
        };
        dc.send(JSON.stringify(sessionConfig));

        // Inject conversation history if provided
        if (unifiedMessages.length > 0) {
          console.log(
            `[VoiceSession] Injecting ${unifiedMessages.length} messages into voice session`,
          );

          for (const msg of unifiedMessages) {
            // Extract text content from message parts
            const textContent = msg.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("");

            if (!textContent.trim()) continue;

            // Create conversation item for this message
            const conversationItem = {
              type: "conversation.item.create",
              item: {
                type: "message",
                role: msg.role === "user" ? "user" : "assistant",
                content: [
                  {
                    type: msg.role === "user" ? "input_text" : "text",
                    text: textContent,
                  },
                ],
              },
            };

            dc.send(JSON.stringify(conversationItem));
          }

          // After injecting history, continue the conversation naturally
          const continueConversation = {
            type: "response.create",
            response: {
              modalities: ["text", "audio"],
              instructions:
                "Continue the conversation naturally based on the context. Keep your response brief and conversational.",
            },
          };
          dc.send(JSON.stringify(continueConversation));
        } else {
          // No history - trigger greeting for new conversation
          const triggerGreeting = {
            type: "response.create",
            response: {
              modalities: ["text", "audio"],
              instructions:
                "Greet the user briefly and warmly. Keep it to 1-2 sentences max. Be curious and friendly.",
            },
          };
          dc.send(JSON.stringify(triggerGreeting));
        }
      };

      dc.onclose = () => {
        console.log("[VoiceSession] Data channel closed");
        if (state !== "idle") {
          setState("idle");
        }
      };

      // Create and set local offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to OpenAI Realtime API
      const sdpResponse = await fetch(
        "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/sdp",
          },
          body: offer.sdp,
        },
      );

      if (!sdpResponse.ok) {
        throw new Error("Failed to connect to OpenAI Realtime");
      }

      // Set remote answer
      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({
        type: "answer",
        sdp: answerSdp,
      });
    } catch (error) {
      console.error("[VoiceSession] Failed to start session:", error);
      const err =
        error instanceof Error
          ? error
          : new Error("Failed to start voice session");
      setState("error");
      cleanup();
      onError?.(err);
    }
  }, [
    cleanup,
    handleRealtimeEvent,
    state,
    systemPrompt,
    voice,
    onError,
    unifiedMessages,
  ]);

  // Stop voice session
  const stopSession = useCallback(() => {
    cleanup();
    setState("idle");
  }, [cleanup]);

  // Auto-start if requested
  const hasAutoStartedRef = useRef(false);
  useEffect(() => {
    if (autoStart && !hasAutoStartedRef.current && state === "idle") {
      hasAutoStartedRef.current = true;
      console.log("[VoiceSession] Auto-starting voice session");
      setTimeout(() => {
        void startSession();
      }, 300);
    }
  }, [autoStart, state, startSession]);

  // Toggle mute
  const toggleMute = useCallback((muted: boolean) => {
    setIsMuted(muted);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !muted;
      });
    }
  }, []);

  return {
    state,
    messages,
    startSession,
    stopSession,
    isMuted,
    toggleMute,
    audioLevel,
  };
}
