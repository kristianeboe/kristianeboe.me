import { type Metadata } from "next";

import { Card } from "@/components/spotlight/Card";
import { Section } from "@/components/spotlight/Section";
import { SimpleLayout } from "@/components/spotlight/SimpleLayout";

const talks = [
  {
    href: "https://www.tekna.no/en/past-events/51000/lunch-and-learn-from-prompt-to-product-51904/",
    title: "From prompt to product",
    event: "Tekna Lunch & Learn · Jan 2026",
    description:
      "How to build AI products that actually work in production — structured output with the AI SDK, long-running processes in the UI, browser agents, and combining email with AI. Everything I learned shipping Homi.",
    cta: "View event",
  },
  {
    href: "https://www.rebel.no/arrangementer/fagkveld-techfolk-2025",
    title: "From prompt to product in Homi.so",
    event: "Fagkveld @ Rebel Oslo, Techfolk · Nov 2025",
    description:
      "Practical AI in a modern web stack, for a room full of Oslo developers. The unpolished version, with live product and pizza.",
    cta: "View event",
  },
  {
    href: "https://abakus.no/events/1947-lightning-talks",
    title: "9 ways to travel",
    event: "Lightning Talks, Abakus · NTNU, 2017",
    description:
      "A ten-minute lightning talk on nine very different ways to see the world — the early version of an obsession that never went away.",
    cta: "View event",
  },
];

const appearances = [
  {
    href: "https://www.youtube.com/watch?v=t-piD6TR6vY",
    title: "Homi AI home hunting",
    event: "AI Julekalender, day 4 · Dec 2025",
    description:
      "The first live demo of Homi's new AI engine — natural conversation, profile building, and digging through the housing market — for Daniel Westervik's Norwegian AI advent calendar.",
    cta: "Watch on YouTube",
  },
  {
    href: "https://www.youtube.com/watch?v=0UQWfFZLZWU",
    title: "How a solo founder builds with AI",
    event: "Relentlessly · Dec 2025",
    description:
      "On building Homi alone: raising a pre-seed, what people misunderstand about solo founders, pitching at Slush, and whether AI should post on social media for you.",
    cta: "Watch on YouTube",
  },
  {
    href: "https://open.spotify.com/episode/1M0lfg3mYW61wIVFlgRFLm",
    title: "The death of SaaS, Twitter virality, and the Beijing 996",
    event: "Venture Capital in Scandinavia · Mar 2025",
    description:
      "An inside look at Wordware's blockbuster $30M seed round as employee number five: YC demo day, US versus Scandinavian working and fundraising culture, and whether Norway is ambitious enough.",
    cta: "Listen on Spotify",
  },
  {
    href: "https://open.spotify.com/episode/1VjynVyWaDJRuk90owi0vg",
    title: "Å jobbe i AI-hypens sentrum i den heteste YC-startupen",
    event: "Støttehjulet · Feb 2025",
    description:
      "An hour and forty minutes on the road from NTNU to San Francisco: being a founding engineer at Wordware (YC S24) while the AI wave crested, Silicon Valley culture, and what I'd tell aspiring founders.",
    cta: "Listen on Spotify",
  },
];

const press = [
  {
    href: "https://www.kode24.no/artikkel/homi-grunderen-bruker-helt-sykt-mye-ki/251810",
    outlet: "kode24 · Dec 2025",
    title: "Homi-gründeren bruker «helt sykt mye» KI",
    description:
      "Ukas koder: on building Homi solo with an absurd amount of AI, and the TypeScript stack that makes it possible.",
  },
  {
    href: "https://www.shifter.no/nyheter/disse-skal-pa-europas-storste-startup-event-i-ar-plutselig-skulle-halve-nettverket-mitt/436381",
    outlet: "Shifter · Nov 2025",
    title: "Disse skal på Europas største startup-event i år",
    description:
      "On heading to Slush when half my network suddenly was going — and the invitation to pitch Homi on stage that sealed it.",
  },
  {
    href: "https://www.shifter.no/nyheter/hopper-av-milliardeventyr-i-usa-og-satser-alt-pa-egen-startup/428085",
    outlet: "Shifter · Oct 2025",
    title: "Hopper av milliardeventyr i USA og satser alt på egen startup",
    description:
      "Why I left Wordware after the billion-dollar valuation to go all-in on Homi.",
  },
  {
    href: "https://www.shifter.no/nyheter/norske-grndere-med-nokkelroller-i-en-av-y-combinators-heteste-startups/364281",
    outlet: "Shifter · Nov 2024",
    title: "Norske gründere med nøkkelroller i en av Y Combinators heteste startups",
    description:
      "On being one of two Norwegians with key roles at Wordware after one of YC's largest seed rounds ever.",
  },
  {
    href: "https://www.shifter.no/nyheter/mesh-tar-over-startupen-til-utvist-grnder-na-far-han-bli-i-norge/247849",
    outlet: "Shifter · May 2022",
    title: "Mesh tar over startupen til utvist gründer — nå får han bli i Norge",
    description:
      "When Mesh took over Scales — my technical baby — and my co-founder got to stay in Norway.",
  },
  {
    href: "https://www.shifter.no/kristian-elset-bo-alt-for-mange-darlige-ideer-blir-investert-i-av-folk-uten-peiling-pa-teknologi/216527",
    outlet: "Shifter · Jul 2021",
    title:
      "«Alt for mange dårlige ideer blir investert i av folk uten peiling på teknologi»",
    description:
      "A profile interview from the month I took the Scales team to Lofoten for a workation.",
  },
  {
    href: "https://www.khrono.no/utveksling-ntnu-internasjonalisering/faerre-norske-studenter-reiser-pa-utveksling/159042",
    outlet: "Khrono · Mar 2016",
    title: "Færre norske studenter reiser på utveksling",
    description:
      "Quoted as an NTNU student on exchange in Melbourne, telling everyone else to go too.",
  },
];

const writingAndElsewhere = [
  {
    href: "https://www.finansavisen.no/finans/2025/05/22/8265725/gi-innovasjon-norge-nye-spilleregler",
    outlet: "Finansavisen · May 2025",
    title: "Gi Innovasjon Norge nye spilleregler",
    description:
      "An op-ed on giving Innovasjon Norge rules that actually reward value creation, written from San Francisco.",
  },
  {
    href: "https://medium.com/juniorconsulting/rutiner-utfordringer-og-muligheter-i-den-nye-arbeidshverdagen-219edc0a382f",
    outlet: "Junior Consulting on Medium · Mar 2020",
    title: "Rutiner, utfordringer og muligheter i den nye arbeidshverdagen",
    description:
      "An early-pandemic essay on remote work routines, written before working from anywhere was the plan all along.",
  },
  {
    href: "https://www.founder-hub.com/",
    outlet: "Founders Hub Oslo · 2026",
    title: "Resident at Founders Hub",
    description:
      "Building Homi from the top floor of Mesh Youngstorget, alongside a crew of Norwegian AI founders. Ship or leave.",
  },
];

function AppearanceGrid({
  title,
  items,
}: {
  title: string;
  items: typeof talks;
}) {
  return (
    <Section title={title}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <Card as="article" key={item.href}>
            <Card.Title as="h3" href={item.href} target="_blank">
              {item.title}
            </Card.Title>
            <Card.Eyebrow decorate>{item.event}</Card.Eyebrow>
            <Card.Description>{item.description}</Card.Description>
            <Card.Cta>{item.cta}</Card.Cta>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function MediaList({
  title,
  items,
}: {
  title: string;
  items: typeof press;
}) {
  return (
    <Section title={title}>
      <ul className="divide-y divide-[#1F1B14]/10">
        {items.map((item) => (
          <li key={item.href} className="py-5 first:pt-0 last:pb-0">
            <p className="font-mono text-[10px] tracking-[0.08em] text-[#B0573F] uppercase">
              {item.outlet}
            </p>
            <h3 className="mt-1.5 font-[family-name:var(--font-newsreader)] text-[22px] leading-snug tracking-[-0.015em] text-[#1F1B14]">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#1F4D3C]"
              >
                {item.title}
              </a>
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#1F1B14]/62">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export const metadata: Metadata = {
  title: "Speaking & media",
  description:
    "Talks, podcasts, and press coverage — building products with AI, life at a YC startup in Silicon Valley, and the honest parts of running Homi as a solo founder.",
};

export default function Speaking() {
  return (
    <SimpleLayout
      eyebrow="Speaking & media"
      title="I talk about building, shipping, and the unglamorous parts of startups."
      intro="On stage, on podcasts, and in the Norwegian tech press — mostly about building AI products that survive contact with production, and the honest parts that get cut from the polished version. If you'd like me to speak at your event, reach out."
    >
      <div className="space-y-16">
        <AppearanceGrid title="Talks" items={talks} />
        <AppearanceGrid title="Podcasts & video" items={appearances} />
        <MediaList title="In the media" items={press} />
        <MediaList title="Writing & elsewhere" items={writingAndElsewhere} />
      </div>
    </SimpleLayout>
  );
}
