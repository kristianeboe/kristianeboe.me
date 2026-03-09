// Types
export type {
  VoiceAgentState,
  TranscriptMessage,
  AudioLevel,
  UseVoiceSessionOptions,
  UseVoiceSessionReturn,
  RealtimeEvent,
  SessionResponse,
} from "./types";

// Hooks
export { useAudioLevel } from "./hooks/useAudioLevel";
export { useVoiceSession } from "./hooks/useVoiceSession";

// Components
export { GlowingOrb } from "./components/GlowingOrb";
export { ChatInputBar } from "./components/ChatInputBar";
export { MessageList } from "./components/MessageList";
export { VoiceOverlay } from "./components/VoiceOverlay";

// Extraction utilities (re-export for convenience)
export {
  interviewExtractionSchema,
  type ExtractedInterviewData,
  formatTranscriptForExtraction,
  createExtractionPrompt,
  parseExtractionResponse,
  calculateCompleteness,
} from "./lib/extraction";
