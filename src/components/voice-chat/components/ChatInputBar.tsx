"use client";

import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { Loader2, Mic, MicOff, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatInputBarProps {
  /** Callback when user sends a message */
  onSend: (message: string) => void;
  /** Callback to start voice session */
  onStartVoice: () => void;
  /** Callback to stop voice session */
  onStopVoice: () => void;
  /** Whether voice session is currently active */
  isVoiceActive: boolean;
  /** Whether chat is currently streaming a response */
  isLoading?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Disable the input */
  disabled?: boolean;
  className?: string;
}

export function ChatInputBar({
  onSend,
  onStartVoice,
  onStopVoice,
  isVoiceActive,
  isLoading = false,
  placeholder = "Type a message...",
  disabled = false,
  className,
}: ChatInputBarProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled || isLoading) return;

    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceToggle = () => {
    if (isVoiceActive) {
      onStopVoice();
    } else {
      onStartVoice();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-background flex items-center gap-2 border-t p-4",
        className,
      )}
    >
      {/* Voice toggle button */}
      <Button
        type="button"
        variant={isVoiceActive ? "destructive" : "outline"}
        size="icon"
        onClick={handleVoiceToggle}
        disabled={disabled}
        className="shrink-0"
        title={isVoiceActive ? "Stop voice" : "Start voice"}
      >
        {isVoiceActive ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      {/* Text input */}
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isVoiceActive ? "Voice active..." : placeholder}
        disabled={disabled || isVoiceActive}
        className="flex-1"
      />

      {/* Send button */}
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || disabled || isLoading || isVoiceActive}
        className="shrink-0"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
