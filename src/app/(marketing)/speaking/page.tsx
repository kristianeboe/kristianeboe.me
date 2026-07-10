import { type Metadata } from 'next'

import { Card } from '@/components/spotlight/Card'
import { Section } from '@/components/spotlight/Section'
import { SimpleLayout } from '@/components/spotlight/SimpleLayout'

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,
  event,
  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    "I speak about building products with AI, growth engineering, and the lessons learned from running multiple startups simultaneously.",
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I speak about building, shipping, and the unglamorous parts of startups."
      intro="I love getting on stage to talk about the things I've learned building products — the useful, funny, annoying, and occasionally expensive parts that usually get cut from the polished version. If you'd like me to speak at your event, reach out."
    >
      <div className="space-y-20">
        <SpeakingSection title="Conferences">
          <Appearance
            href="#"
            title="Building AI products that people actually use"
            description="How we approached AI integration in Homi without falling into the trap of adding AI for AI's sake. Practical lessons on product-market fit in the AI era."
            event="Nordic Startup Summit, 2024"
            cta="Watch video"
          />
          <Appearance
            href="#"
            title="From thesis to product: matching algorithms in the real world"
            description="My NTNU master's thesis on AI-based apartment matching became the foundation for two companies. This is the honest story of that journey."
            event="NTNU Alumni Day, 2023"
            cta="Watch video"
          />
          <Appearance
            href="#"
            title="Growth engineering at scale: lessons from Series B"
            description="What changes when you go from scrappy startup growth tactics to building growth infrastructure for a company with real users and real stakes."
            event="ProductTank Oslo, 2024"
            cta="Watch video"
          />
        </SpeakingSection>
        <SpeakingSection title="Podcasts">
          <Appearance
            href="#"
            title="Running multiple startups without losing your mind"
            description="How I structure my time across Homi, SwipeStats, and Wander. The honest answer involves a lot of async communication and ruthless prioritization."
            event="Founders Unfiltered, 2024"
            cta="Listen to podcast"
          />
          <Appearance
            href="#"
            title="SwipeStats: when a side project goes viral"
            description="The story of how SwipeStats went from a weekend experiment to something used by hundreds of thousands of people, and what I learned about building in public."
            event="Side Project Stories, 2023"
            cta="Listen to podcast"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
