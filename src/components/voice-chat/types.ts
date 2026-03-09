import type { UIMessage } from "ai";

/**
 * Voice agent state machine states
 *
 * State transitions:
 * idle → connecting → connected ↔ listening ↔ speaking
 *                             ↘ processing ↗
 *                     error (any state)
 */
export type VoiceAgentState =
  | "idle"
  | "connecting"
  | "connected"
  | "listening"
  | "speaking"
  | "processing"
  | "error";

/**
 * Internal transcript message format used by voice session
 */
export interface TranscriptMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** Whether the transcript is finalized (used for AI speaking detection) */
  isFinal?: boolean;
}

/**
 * Audio level normalized to 0-1 range
 */
export type AudioLevel = number;

/**
 * Options for useVoiceSession hook
 */
export interface UseVoiceSessionOptions {
  /** System prompt for the voice agent */
  systemPrompt: string;
  /** OpenAI voice name (verse, ash, coral, sage, etc.) */
  voice?: string;
  /** Auto-start voice session on mount */
  autoStart?: boolean;
  /** Error callback */
  onError?: (error: Error) => void;
  /** Unified message state (for reading conversation history) */
  messages: UIMessage[];
  /** Setter for unified message state (for writing transcripts) */
  setMessages: React.Dispatch<React.SetStateAction<UIMessage[]>>;
}

/**
 * Return type for useVoiceSession hook
 */
export interface UseVoiceSessionReturn {
  /** Current voice agent state */
  state: VoiceAgentState;
  /** Transcript messages from voice session */
  messages: TranscriptMessage[];
  /** Start voice session */
  startSession: () => Promise<void>;
  /** Stop voice session */
  stopSession: () => void;
  /** Whether microphone is muted */
  isMuted: boolean;
  /** Toggle microphone mute */
  toggleMute: (muted: boolean) => void;
  /** Current audio level (0-1) for visualization */
  audioLevel: AudioLevel;
}

/**
 * OpenAI Realtime API event interface
 */
export interface RealtimeEvent {
  type: string;
  transcript?: string;
  delta?: string;
  item_id?: string;
  response_id?: string;
  error?: {
    message?: string;
    code?: string;
  };
}

/**
 * Session token response from our API
 */
export interface SessionResponse {
  sessionToken?: string;
  needsAuth?: boolean;
  error?: string;
}
