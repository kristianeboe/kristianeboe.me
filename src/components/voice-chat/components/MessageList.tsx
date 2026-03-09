"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: UIMessage[];
  className?: string;
  /** Auto-scroll to bottom on new messages */
  autoScroll?: boolean;
}

export function MessageList({
  messages,
  className,
  autoScroll = true,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="space-y-4 p-4">
        {messages.map((message) => {
          // Extract text content from parts
          const textContent = message.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("");

          if (!textContent) return null;

          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                isUser ? "flex-row-reverse" : "flex-row",
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {isUser ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>

              {/* Message bubble */}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2",
                  isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                <div
                  className={cn(
                    "prose prose-sm max-w-none",
                    isUser ? "prose-invert" : "dark:prose-invert",
                  )}
                >
                  <ReactMarkdown
                    components={{
                      // Customize markdown rendering for chat context
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc pl-4 last:mb-0">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal pl-4 last:mb-0">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-black/10 px-1 py-0.5 text-sm dark:bg-white/10">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {textContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
