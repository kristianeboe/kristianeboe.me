"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { Streamdown } from "streamdown";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const socialMediaCaptionsSchema = z.object({
  twitter: z.object({
    caption: z.string(),
    hashtags: z.array(z.string()),
    tone: z.string(),
  }),
  linkedin: z.object({
    caption: z.string(),
    callToAction: z.string(),
    tone: z.string(),
  }),
  instagram: z.object({
    caption: z.string(),
    hashtags: z.array(z.string()),
    emojis: z.array(z.string()),
    tone: z.string(),
  }),
});

export default function StreamObjectDemo() {
  const [topic, setTopic] = useState(
    "launching a new AI-powered productivity app",
  );

  const { object, submit, isLoading, error } = useObject({
    api: "/api/demos/stream-captions",
    schema: socialMediaCaptionsSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      submit({ topic });
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Stream Object Demo</h1>
        <p className="text-muted-foreground">
          Generate 3 social media captions simultaneously using AI SDK&apos;s{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-sm">
            streamText + Output.object()
          </code>{" "}
          and render them with{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-sm">
            Streamdown
          </code>
          .
        </p>
      </div>

      {/* Key Concepts */}
      <Card className="border-primary mb-8">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">Streaming Structured Objects</h3>
            <p className="text-muted-foreground text-sm">
              The AI SDK&apos;s <code>streamText</code> with{" "}
              <code>Output.object()</code> generates structured data while
              streaming partial results. This enables real-time UI updates as
              the AI generates content field by field.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">useObject Hook</h3>
            <p className="text-muted-foreground text-sm">
              The <code>useObject</code> hook from <code>@ai-sdk/react</code>{" "}
              handles the client-side consumption of streamed objects,
              automatically updating the partial object as new data arrives.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Streamdown</h3>
            <p className="text-muted-foreground text-sm">
              A drop-in replacement for react-markdown optimized for AI
              streaming. The <code>isAnimating</code> prop shows a visual caret
              indicator during generation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Input Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Captions</CardTitle>
          <CardDescription>
            Enter a topic to generate platform-specific social media captions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" loading={isLoading}>
              Generate
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive mb-8">
          <CardContent className="pt-6">
            <p className="text-destructive">Error: {error.message}</p>
          </CardContent>
        </Card>
      )}

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Twitter Card */}
        <CaptionCard
          platform="Twitter/X"
          icon="𝕏"
          isLoading={isLoading}
          hasContent={!!object?.twitter}
        >
          {object?.twitter && (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                  Caption
                </label>
                <Streamdown isAnimating={isLoading}>
                  {object.twitter.caption ?? ""}
                </Streamdown>
              </div>
              {object.twitter.hashtags &&
                object.twitter.hashtags.length > 0 && (
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                      Hashtags
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {object.twitter.hashtags.map((tag, i) =>
                        tag ? (
                          <span
                            key={i}
                            className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm"
                          >
                            #{tag}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}
              {object.twitter.tone && (
                <div>
                  <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                    Tone
                  </label>
                  <span className="bg-muted rounded px-2 py-0.5 text-sm">
                    {object.twitter.tone}
                  </span>
                </div>
              )}
            </div>
          )}
        </CaptionCard>

        {/* LinkedIn Card */}
        <CaptionCard
          platform="LinkedIn"
          icon="in"
          isLoading={isLoading}
          hasContent={!!object?.linkedin}
        >
          {object?.linkedin && (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                  Caption
                </label>
                <Streamdown isAnimating={isLoading}>
                  {object.linkedin.caption ?? ""}
                </Streamdown>
              </div>
              {object.linkedin.callToAction && (
                <div>
                  <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                    Call to Action
                  </label>
                  <p className="text-primary text-sm font-medium">
                    {object.linkedin.callToAction}
                  </p>
                </div>
              )}
              {object.linkedin.tone && (
                <div>
                  <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                    Tone
                  </label>
                  <span className="bg-muted rounded px-2 py-0.5 text-sm">
                    {object.linkedin.tone}
                  </span>
                </div>
              )}
            </div>
          )}
        </CaptionCard>

        {/* Instagram Card */}
        <CaptionCard
          platform="Instagram"
          icon="📸"
          isLoading={isLoading}
          hasContent={!!object?.instagram}
        >
          {object?.instagram && (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                  Caption
                </label>
                <Streamdown isAnimating={isLoading}>
                  {object.instagram.caption ?? ""}
                </Streamdown>
              </div>
              {object.instagram.emojis &&
                object.instagram.emojis.length > 0 && (
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                      Emojis
                    </label>
                    <span className="text-2xl">
                      {object.instagram.emojis.join(" ")}
                    </span>
                  </div>
                )}
              {object.instagram.hashtags &&
                object.instagram.hashtags.length > 0 && (
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                      Hashtags
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {object.instagram.hashtags.map((tag, i) =>
                        tag ? (
                          <span
                            key={i}
                            className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm"
                          >
                            #{tag}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}
              {object.instagram.tone && (
                <div>
                  <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                    Tone
                  </label>
                  <span className="bg-muted rounded px-2 py-0.5 text-sm">
                    {object.instagram.tone}
                  </span>
                </div>
              )}
            </div>
          )}
        </CaptionCard>
      </div>

      {/* Code Example */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            {`// API Route (route.ts)
import { anthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import { z } from "zod";

const schema = z.object({
  twitter: z.object({
    caption: z.string(),
    hashtags: z.array(z.string()),
  }),
  linkedin: z.object({
    caption: z.string(),
    callToAction: z.string(),
  }),
  instagram: z.object({
    caption: z.string(),
    hashtags: z.array(z.string()),
  }),
});

export async function POST(request: Request) {
  const { topic } = await request.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    output: Output.object({ schema }),
    prompt: \`Generate captions for: \${topic}\`,
  });

  return result.toTextStreamResponse();
}

// Client Component
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Streamdown } from "streamdown";

function Demo() {
  const { object, submit, isLoading } = useObject({
    api: "/api/demos/stream-captions",
    schema,
  });

  return (
    <div>
      <button onClick={() => submit({ topic: "My topic" })}>
        Generate
      </button>

      {object?.twitter && (
        <Streamdown isAnimating={isLoading}>
          {object.twitter.caption}
        </Streamdown>
      )}
    </div>
  );
}`}
          </pre>
        </CardContent>
      </Card>

      {/* V3: Parallel Streaming Section */}
      <Separator className="my-12" />
      <ParallelStreamingDemo />
    </div>
  );
}

function CaptionCard({
  platform,
  icon,
  isLoading,
  hasContent,
  children,
}: {
  platform: string;
  icon: string;
  isLoading: boolean;
  hasContent: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-sm">
            {icon}
          </span>
          {platform}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {!hasContent && !isLoading && (
          <p className="text-muted-foreground text-sm italic">
            Click &quot;Generate&quot; to create a caption
          </p>
        )}
        {!hasContent && isLoading && (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Generating...
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// V3: Parallel Streaming Demo (Simple - 3 useObject hooks)
// =============================================================================

const twitterSchema = z.object({
  caption: z.string(),
  hashtags: z.array(z.string()),
});

const linkedinSchema = z.object({
  caption: z.string(),
  callToAction: z.string(),
});

const instagramSchema = z.object({
  caption: z.string(),
  hashtags: z.array(z.string()),
  emojis: z.array(z.string()),
});

const defaultContent = `We just launched AppName 2.0 - a complete rebuild of our analytics platform!

New features include:
- AI-powered insights that provide actionable recommendations
- Enhanced data visualization and reporting
- Beautiful new dashboard with advanced comparisons
- Export your data in multiple formats

We've helped over 50,000 users understand their data and make better decisions. The new AI features use Claude to analyze patterns and provide personalized insights.

Try it free at yourapp.io`;

function ParallelStreamingDemo() {
  const [content, setContent] = useState(defaultContent);

  // 3 independent useObject hooks - each manages its own stream
  const twitter = useObject({
    api: "/api/demos/stream-caption",
    schema: twitterSchema,
  });

  const linkedin = useObject({
    api: "/api/demos/stream-caption",
    schema: linkedinSchema,
  });

  const instagram = useObject({
    api: "/api/demos/stream-caption",
    schema: instagramSchema,
  });

  const isAnyLoading =
    twitter.isLoading || linkedin.isLoading || instagram.isLoading;

  const handleGenerate = () => {
    if (!content.trim()) return;

    // Fire all 3 requests - they run in parallel automatically
    twitter.submit({ content, platform: "twitter" });
    linkedin.submit({ content, platform: "linkedin" });
    instagram.submit({ content, platform: "instagram" });
  };

  return (
    <div>
      {/* V3 Header */}
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold">
          V3: Parallel Streaming (Simple)
        </h2>
        <p className="text-muted-foreground">
          Three separate{" "}
          <code className="bg-muted rounded px-1 text-sm">useObject</code>{" "}
          hooks, each calling the same endpoint with a different platform. All 3
          streams run <strong>in parallel</strong> - no complex backend
          multiplexing needed.
        </p>
      </div>

      {/* How it Works */}
      <Card className="border-primary mb-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            {`// 3 independent hooks
const twitter = useObject({ api: "/api/demos/stream-caption", schema: twitterSchema });
const linkedin = useObject({ api: "/api/demos/stream-caption", schema: linkedinSchema });
const instagram = useObject({ api: "/api/demos/stream-caption", schema: instagramSchema });

// Fire all 3 - they stream in parallel
const handleGenerate = () => {
  twitter.submit({ content, platform: "twitter" });
  linkedin.submit({ content, platform: "linkedin" });
  instagram.submit({ content, platform: "instagram" });
};`}
          </pre>
        </CardContent>
      </Card>

      {/* Content Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Paste Your Content</CardTitle>
          <CardDescription>
            Enter the content you want to turn into social media posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your blog post, announcement, or any content here..."
            className="min-h-[150px]"
            disabled={isAnyLoading}
          />
          <Button onClick={handleGenerate} loading={isAnyLoading}>
            Generate All (Parallel)
          </Button>
        </CardContent>
      </Card>

      {/* Error Display */}
      {(twitter.error ?? linkedin.error ?? instagram.error) && (
        <Card className="border-destructive mb-8">
          <CardContent className="pt-6">
            <p className="text-destructive">
              Error:{" "}
              {twitter.error?.message ??
                linkedin.error?.message ??
                instagram.error?.message}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Twitter Card */}
        <CaptionCard
          platform="Twitter/X"
          icon="𝕏"
          isLoading={twitter.isLoading}
          hasContent={!!twitter.object}
        >
          {twitter.object && (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                  Caption
                </label>
                <Streamdown isAnimating={twitter.isLoading}>
                  {twitter.object.caption ?? ""}
                </Streamdown>
              </div>
              {twitter.object.hashtags &&
                twitter.object.hashtags.length > 0 && (
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                      Hashtags
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {twitter.object.hashtags.map((tag, i) =>
                        tag ? (
                          <span
                            key={i}
                            className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm"
                          >
                            #{tag}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </CaptionCard>

        {/* LinkedIn Card */}
        <CaptionCard
          platform="LinkedIn"
          icon="in"
          isLoading={linkedin.isLoading}
          hasContent={!!linkedin.object}
        >
          {linkedin.object && (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                  Caption
                </label>
                <Streamdown isAnimating={linkedin.isLoading}>
                  {linkedin.object.caption ?? ""}
                </Streamdown>
              </div>
              {linkedin.object.callToAction && (
                <div>
                  <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                    Call to Action
                  </label>
                  <p className="text-primary text-sm font-medium">
                    {linkedin.object.callToAction}
                  </p>
                </div>
              )}
            </div>
          )}
        </CaptionCard>

        {/* Instagram Card */}
        <CaptionCard
          platform="Instagram"
          icon="📸"
          isLoading={instagram.isLoading}
          hasContent={!!instagram.object}
        >
          {instagram.object && (
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                  Caption
                </label>
                <Streamdown isAnimating={instagram.isLoading}>
                  {instagram.object.caption ?? ""}
                </Streamdown>
              </div>
              {instagram.object.emojis &&
                instagram.object.emojis.length > 0 && (
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                      Emojis
                    </label>
                    <span className="text-2xl">
                      {instagram.object.emojis.join(" ")}
                    </span>
                  </div>
                )}
              {instagram.object.hashtags &&
                instagram.object.hashtags.length > 0 && (
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs font-medium uppercase">
                      Hashtags
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {instagram.object.hashtags.map((tag, i) =>
                        tag ? (
                          <span
                            key={i}
                            className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm"
                          >
                            #{tag}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </CaptionCard>
      </div>
    </div>
  );
}
