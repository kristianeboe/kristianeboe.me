import { type Metadata } from "next";

import { Card } from "@/components/spotlight/Card";
import { Section } from "@/components/spotlight/Section";
import { SimpleLayout } from "@/components/spotlight/SimpleLayout";

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Software I use, gear I rely on, and tools I actually recommend.",
};

export default function Uses() {
  return (
    <SimpleLayout
      eyebrow="Uses"
      title="Software I use, gear I rely on, and tools I actually recommend."
      intro={
        "People ask what I use to build and stay productive. Here's the honest answer: the stuff that's actually on my desk and in my dock, not a sponsored list."
      }
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title='MacBook Pro 14", M3 Pro (2023)'>
            The M-series chips changed everything. I can run local AI models,
            spin up Docker containers, and have 40 browser tabs open without the
            fans ever turning on. I don&apos;t miss Intel at all.
          </Tool>
          <Tool title='LG UltraWide 34" Monitor'>
            One wide screen beats two monitors for me. Enough room to have a
            code editor, terminal, and browser side by side without any window
            juggling.
          </Tool>
          <Tool title="Keychron Q1 Keyboard">
            Mechanical keyboard with a satisfying thock. Took some getting used
            to but I type faster and more accurately than I ever did on a laptop
            keyboard.
          </Tool>
          <Tool title="Herman Miller Aeron Chair">
            The tax on sitting at a desk for eight hours a day. Worth every
            penny once your back stops complaining.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Development">
          <Tool title="Cursor" href="https://cursor.sh">
            AI-first code editor built on VS Code. The tab completion and inline
            chat are genuinely magical. It&apos;s the first tool that made me
            feel like AI is actually augmenting my thinking rather than just
            autocompleting boilerplate.
          </Tool>
          <Tool title="Claude Code" href="https://claude.ai/code">
            For longer, more complex tasks where I want an agent to do real work
            in my codebase. Built this site with it.
          </Tool>
          <Tool title="Warp" href="https://warp.dev">
            A terminal that doesn&apos;t feel like 1987. AI command suggestions
            and shared runbooks make it way more useful than iTerm2 ever was for
            me.
          </Tool>
          <Tool title="TablePlus" href="https://tableplus.com">
            The best database GUI. Works with Postgres, MySQL, SQLite, Redis,
            whatever you&apos;re running. Has saved me from building a thousand
            admin interfaces over the years.
          </Tool>
          <Tool title="Bun" href="https://bun.sh">
            Faster installs, faster test runs, faster everything. I&apos;ve
            switched all my projects over and haven&apos;t looked back.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Design">
          <Tool title="Figma" href="https://figma.com">
            The obvious choice. I use it for design, wireframes, and as a
            virtual whiteboard when thinking through product flows. The
            collaboration features are the real killer feature.
          </Tool>
          <Tool title="Shadcn/UI" href="https://ui.shadcn.com">
            Not exactly a design tool, but it&apos;s how I build UIs. Copy-paste
            components that are actually well-designed and fully customizable.
            Pairs perfectly with Tailwind.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Productivity">
          <Tool title="Raycast" href="https://raycast.com">
            Replaced Spotlight and Alfred for me. The extension ecosystem is
            huge and the AI features are actually integrated sensibly. I use it
            for clipboard history, window management, and quick calculations
            dozens of times a day.
          </Tool>
          <Tool title="Linear" href="https://linear.app">
            Issue tracking that doesn&apos;t get in your way. Fast, opinionated,
            and beautiful. The keyboard shortcuts alone make it worth it.
          </Tool>
          <Tool title="Notion" href="https://notion.so">
            Docs, wikis, and light project management across my ventures. Not
            perfect for everything, but it&apos;s where team knowledge lives.
          </Tool>
          <Tool title="Cal.com" href="https://cal.com">
            Open-source Calendly alternative. I host it myself and it connects
            directly to Google Calendar. No unnecessary subscription fees.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
