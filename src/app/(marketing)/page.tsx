import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";

import { cn } from "@/lib/utils";
import { getTravelPosts } from "@/lib/travel-nav";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Kristian Elset Bø — Software for freedom, outcomes, and stories",
  description:
    "Norwegian founder and engineer in Oslo. Building Homi (AI home search), SwipeStats, and other tools for deciding where to live, who to meet, and how to move.",
};

const serif = "font-[family-name:var(--font-newsreader)] tracking-[-0.015em]";
const monoLabel = "font-mono text-[11px] uppercase tracking-[0.08em]";

const glass =
  "rounded-[20px] border border-white/55 bg-[#FAF6EE]/80 shadow-[0_24px_60px_rgba(21,17,12,0.18),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-lg";
const glassSolid =
  "rounded-[20px] border border-white/55 bg-[#FFFDF8] shadow-[0_24px_60px_rgba(21,17,12,0.12),inset_0_1px_0_rgba(255,255,255,0.5)]";
const glassDark =
  "rounded-[20px] border border-white/10 bg-[#15110C]/65 text-[#FAF6EE] shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-lg";

function TopographicLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1280 660"
      preserveAspectRatio="none"
    >
      <g fill="none" stroke="#1F4D3C" strokeWidth="1">
        <path
          opacity="0.1"
          d="M-20,600 C200,540 340,620 560,560 S940,600 1300,520"
        />
        <path
          opacity="0.12"
          d="M-20,560 C220,490 380,580 620,510 S980,560 1300,470"
        />
        <path
          opacity="0.14"
          d="M-20,515 C240,445 420,540 680,462 S1020,520 1300,420"
        />
        <path
          opacity="0.16"
          d="M-20,470 C260,400 460,500 730,415 S1060,478 1300,372"
        />
        <path
          opacity="0.17"
          d="M-20,425 C280,358 500,458 775,370 S1090,436 1300,326"
        />
        <path
          opacity="0.16"
          d="M-20,380 C300,318 540,414 815,326 S1115,392 1300,282"
        />
        <path
          opacity="0.14"
          d="M-20,335 C320,280 575,370 850,284 S1140,348 1300,240"
        />
        <path
          opacity="0.12"
          d="M-20,290 C340,244 608,326 882,244 S1160,304 1300,200"
        />
        <path
          opacity="0.1"
          d="M-20,246 C360,210 638,282 910,206 S1178,260 1300,162"
        />
      </g>
      <circle cx="1064" cy="212" r="4" fill="#1F4D3C" opacity="0.55" />
      <circle
        cx="1064"
        cy="212"
        r="10"
        fill="none"
        stroke="#1F4D3C"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function Hero() {
  const featuredTravel = getTravelPosts()[0];

  return (
    <section className="bg-[#F3EFE5] px-4 py-4 sm:px-6 sm:py-6">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[24px] bg-[#F3EFE5] pb-5 sm:pb-6">
        <TopographicLines />
        <div className="relative mx-auto grid max-w-[1080px] grid-cols-1 gap-7 px-6 pt-7 pb-3 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:pt-10">
          <div
            className={cn(
              glass,
              "flex flex-col justify-between p-8 text-[#15110C] sm:p-10 lg:p-11",
            )}
          >
            <div>
              <div className={cn(monoLabel, "mb-4 text-[#1F4D3C]")}>
                Norwegian digital nomad
              </div>
              <h1
                className={cn(
                  serif,
                  "text-5xl leading-[1.02] sm:text-6xl lg:text-[58px]",
                )}
              >
                Software for more freedom, better outcomes, and{" "}
                <em className="text-[#1F4D3C] italic">stories worth telling</em>
                .
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#15110C]/62">
                I&apos;m Kristian Elset Bø — I build products like{" "}
                <strong className="font-semibold text-[#15110C]">Homi</strong>{" "}
                and{" "}
                <strong className="font-semibold text-[#15110C]">
                  SwipeStats
                </strong>
                , write about travel and nomad life, and follow the experiments
                that make work feel lighter, choices feel clearer, and life a
                bit more fun.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-[#15110C] px-6 py-3 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#15110C]/85"
              >
                See the work →
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-[#15110C]/16 px-6 py-3 text-sm font-semibold text-[#15110C] transition hover:bg-[#15110C]/5"
              >
                Read the journal
              </Link>
            </div>
          </div>

          <div className={cn(glass, "flex min-h-[470px] flex-col p-2")}>
            <div className="relative min-h-64 flex-1 overflow-hidden rounded-[14px] bg-[#1F1B14]">
              <Image
                src="/images/home/profile.jpg"
                alt="Kristian Elset Bø"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
                priority
              />
              <span
                className={cn(
                  monoLabel,
                  "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-3 pt-8 pb-2.5 text-[9px] text-[#FAF6EE]/80",
                )}
              >
                Portrait · Golden Gate
              </span>
            </div>
            <div className="divide-y divide-[#15110C]/10 px-3 pt-3 pb-1">
              <a
                href="https://www.homi.so"
                className="group block py-2 first:pt-0 last:pb-0"
              >
                <span className={cn(monoLabel, "text-[9px] text-[#1F4D3C]")}>
                  Featured project
                </span>
                <div
                  className={cn(
                    serif,
                    "mt-0.5 text-[16px] leading-snug text-[#15110C]",
                  )}
                >
                  Homi{" "}
                  <em className="text-[#1F4D3C] italic">
                    — home search for the life you want to build.
                  </em>
                </div>
              </a>
              {featuredTravel && (
                <Link
                  href={`/blog/${featuredTravel.slug}`}
                  className="group block py-2 first:pt-0 last:pb-0"
                >
                  <span className={cn(monoLabel, "text-[9px] text-[#1F4D3C]")}>
                    Featured travel guide
                  </span>
                  <div
                    className={cn(
                      serif,
                      "mt-0.5 text-[16px] leading-snug text-[#15110C]",
                    )}
                  >
                    {featuredTravel.h1} — {featuredTravel.h1Subtitle}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="bg-[#FAF6EE] px-6 py-16 sm:py-22 lg:px-8">
      <div
        className={cn(
          glassSolid,
          "mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14",
        )}
      >
        <div>
          <div className={cn(monoLabel, "mb-3.5 text-[#B0573F]")}>
            The main bet
          </div>
          <h2
            className={cn(
              serif,
              "text-4xl leading-[0.98] text-[#15110C] sm:text-6xl lg:text-7xl",
            )}
          >
            Homi — find a place that fits the life you want.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#15110C]">
            A home search should start with the life you&apos;re trying to
            build, not just another filter panel. Homi helps people{" "}
            <strong>collect, compare, collaborate</strong>, and eventually let
            AI agents scout in the background while they go do something better.
          </p>
          <div
            className={cn(
              serif,
              "mt-6 rounded-[14px] bg-[#1F4D3C]/8 px-5 py-4 text-[22px] leading-snug text-[#1F4D3C] italic",
            )}
          >
            The bet: better home-search support means more freedom to move well,
            choose well, and spend less of your life refreshing listings.
          </div>
          <a
            href="https://www.homi.so"
            className="mt-6 inline-block rounded-full bg-[#1F4D3C] px-6 py-3 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#1F4D3C]/90"
          >
            Visit www.homi.so →
          </a>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[#15110C]/10 bg-[#FAF6EE] shadow-[0_24px_70px_rgba(21,17,12,0.18)] ring-1 ring-white/75">
          <Image
            src="/images/projects/homi-homepage.png"
            alt="Homi homepage screenshot"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-24px_60px_rgba(21,17,12,0.04)]" />
        </div>
      </div>
    </section>
  );
}

function Travel() {
  const trips = getTravelPosts();

  return (
    <section className="overflow-hidden bg-[#FAF6EE] px-6 pt-2 pb-16 sm:pb-22 lg:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className={cn(serif, "text-4xl text-[#15110C] sm:text-5xl")}>
            Also, I travel. <em className="text-[#B0573F] italic">A lot.</em>
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#15110C] hover:text-[#1F4D3C]"
          >
            All travel guides →
          </Link>
        </div>
        <p className="mb-9 max-w-xl text-base text-[#15110C]/62">
          Working guides from places I&apos;ve actually lived and worked — real
          costs, real itineraries, zero &ldquo;hidden gem&rdquo; listicles.
        </p>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
          {trips.map((trip) => (
            <Link
              key={trip.slug}
              href={`/blog/${trip.slug}`}
              className={cn(
                glassSolid,
                "block p-3.5 transition-transform hover:-translate-y-1",
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[12px]">
                {trip.thumbnail && (
                  <Image
                    src={trip.thumbnail}
                    alt={trip.h1}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="px-2.5 pt-4 pb-2">
                <div className="flex items-baseline justify-between">
                  <h3 className={cn(serif, "text-3xl text-[#15110C]")}>
                    {trip.h1}
                  </h3>
                  {trip.readingTime && (
                    <span
                      className={cn(monoLabel, "text-[10px] text-[#B0573F]")}
                    >
                      {trip.readingTime} min
                    </span>
                  )}
                </div>
                {trip.h1Subtitle && (
                  <p className="mt-2 text-sm leading-relaxed text-[#15110C]/62">
                    {trip.h1Subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    name: "SwipeStats",
    status: "Long-running",
    year: "2017–",
    accent: "text-[#1F4D3C]",
    image: "/images/projects/swipestats.png",
    desc: "Dating-app analytics. Tinder/Hinge data exports turned into real benchmarks — making opaque platform behavior measurable.",
    href: "https://swipestats.io",
  },
  {
    name: "Homi",
    status: "Main bet",
    year: "2024–",
    accent: "text-[#1F4D3C]",
    image: "/images/projects/homi-homepage.png",
    desc: "AI home search with memory. A collaborative workspace for finding places that actually fit the life people are trying to build.",
    href: "https://www.homi.so",
  },
  {
    name: "Hydra",
    status: "Prototype",
    year: "2026–",
    accent: "text-[#B0573F]",
    image: "/images/projects/hydra.png",
    desc: "A local browser-session bridge for reading conversations across Slack, iMessage, LinkedIn, and more without platform APIs.",
    href: "https://hydra-eta-three.vercel.app/",
  },
  {
    name: "Promad.life",
    status: "Experiment",
    year: "2024–",
    accent: "text-[#B0573F]",
    image: "/images/projects/promad-life.png",
    desc: "A community for professional digital nomads earning meaningful income while designing flexible lives.",
    href: "https://promad.life",
  },
  {
    name: "Boe Ventures",
    status: "Holding co",
    year: "Since 2021",
    accent: "text-[#1F4D3C]",
    image: "/images/projects/boe-ventures.png",
    desc: "The product holding company. Where experiments and side bets live before they grow up.",
    href: "https://boe.ventures",
  },
  {
    name: "What's next?",
    status: "Get in touch",
    year: "Email",
    accent: "text-[#B0573F]",
    image: "/favicon.svg",
    desc: "Working on something around homes, agents, growth, data, freedom, or better outcomes? Send a note.",
    href: "mailto:kristian.e.boe@gmail.com",
    cta: "Get in touch →",
    logoCard: true,
  },
];

function Projects() {
  return (
    <section className="bg-linear-to-b from-[#FAF6EE] to-[#F0E9DA] px-6 pt-2 pb-16 sm:pb-22 lg:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h2
            className={cn(
              serif,
              "text-4xl leading-[0.95] text-[#15110C] sm:text-5xl",
            )}
          >
            Selected <span className="block">work</span>
          </h2>
          <span className={cn(monoLabel, "text-[#15110C]/62")}>
            Bets, long runs &amp; experiments
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className={cn(glassSolid, "flex flex-col gap-3.5 p-6")}
            >
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#15110C]",
                  project.logoCard &&
                    "flex items-center justify-center bg-[#15110C]",
                )}
              >
                <Image
                  src={project.image}
                  alt={
                    project.logoCard
                      ? "Kristian Elset Bø kb mark"
                      : `${project.name} website screenshot`
                  }
                  fill={!project.logoCard}
                  width={project.logoCard ? 88 : undefined}
                  height={project.logoCard ? 88 : undefined}
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className={
                    project.logoCard
                      ? "h-22 w-22 rounded-[18px] shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                      : "object-cover object-top"
                  }
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#15110C]/70 to-transparent p-4">
                  <span className={cn(monoLabel, "text-[10px] text-white/85")}>
                    {project.name}
                  </span>
                </div>
              </div>
              <div
                className={cn(monoLabel, "flex justify-between text-[10px]")}
              >
                <span className={cn("font-semibold", project.accent)}>
                  {project.status}
                </span>
                <span className="text-[#15110C]/62">{project.year}</span>
              </div>
              <h3
                className={cn(
                  serif,
                  "text-[32px] leading-[1.05] text-[#15110C]",
                )}
              >
                {project.name}
              </h3>
              <p className="text-sm leading-relaxed text-[#15110C]/62">
                {project.desc}
              </p>
              <a
                href={project.href}
                className="mt-auto text-[13px] font-semibold text-[#15110C] hover:text-[#1F4D3C]"
              >
                {project.cta ?? "Open card →"}
              </a>
            </article>
          ))}
        </div>
        <div
          className={cn(
            glassSolid,
            "mt-6 grid grid-cols-1 items-center gap-7 p-6 lg:grid-cols-[1fr_2fr_200px]",
          )}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#15110C]">
            <Image
              src="/images/projects/wander.png"
              alt="Wander website screenshot"
              fill
              sizes="(min-width: 1024px) 28vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#15110C]/70 to-transparent p-4">
              <span className={cn(monoLabel, "text-[10px] text-white/85")}>
                Wander
              </span>
            </div>
          </div>
          <div>
            <div
              className={cn(monoLabel, "mb-2 text-[10px] text-[#15110C]/62")}
            >
              Day job · current
            </div>
            <h3 className={cn(serif, "text-3xl text-[#15110C] sm:text-4xl")}>
              Wander · Lead Growth Engineer
            </h3>
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#15110C]/62">
              Series B vacation-rentals company. Travel, growth systems, and the
              unglamorous work that compounds — connects back to the broader
              theme of mobility and matching.
            </p>
          </div>
          <a
            href="https://wander.com"
            className="rounded-full bg-[#15110C] px-5 py-2.5 text-center text-[13px] font-semibold text-[#FAF6EE] transition hover:bg-[#15110C]/85 lg:justify-self-end"
          >
            Read more →
          </a>
        </div>
      </div>
    </section>
  );
}

const themes = [
  ["Housing", "The logistics of moving lives."],
  ["Data", "Opaque platform behavior, made measurable."],
  ["AI agents", "Software that does the legwork."],
  ["Mobility", "Multi-country lives, flexible calendars."],
];

function Themes() {
  return (
    <section className="bg-[#F0E9DA] px-6 py-16 sm:py-22 lg:px-8">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div>
          <div className={cn(monoLabel, "mb-3.5 text-[#B0573F]")}>
            What I keep returning to
          </div>
          <h2
            className={cn(
              serif,
              "text-4xl leading-none text-[#15110C] sm:text-5xl",
            )}
          >
            Tools for better decisions and more freedom.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
          {themes.map(([title, desc], i) => (
            <div key={title} className={cn(glassSolid, "p-6")}>
              <div className={cn(monoLabel, "text-[10px] text-[#15110C]/62")}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className={cn(serif, "mt-1.5 mb-2 text-3xl text-[#15110C]")}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#15110C]/62">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const speakingEngagements = [
  {
    year: "2017",
    event: "Lean Startup · Storebrand",
    topic: "How teams can make room for experimentation.",
  },
  {
    year: "2018",
    event: "Abakus graduation dinner · NTNU",
    topic:
      "A motivational send-off for computer-science graduates and families.",
  },
  {
    year: "2019",
    event: "EdgeX · Netlight",
    topic: "Google Search Engine Optimization.",
  },
  {
    year: "2020–21",
    event: "Lunsj / Scales",
    topic: "Founder talks on building startups in public.",
  },
  {
    year: "2022",
    event: "Solana Hacker House · Stockholm",
    topic: "Building in the Solana ecosystem.",
  },
  {
    year: "2024",
    event: "HackNight · GitHub",
    topic: "A night with the local builder community.",
  },
  {
    year: "2025–26",
    event: "Techfolk consulting & Bouvet",
    topic: "Agentic development for working teams.",
  },
  {
    year: "2026",
    event: "Tekna",
    topic: "Homi and a more human way to search for a home.",
  },
];

function Speaking() {
  return (
    <section className="bg-linear-to-b from-[#F0E9DA] to-[#3F4A4A] px-6 py-16 sm:py-22 lg:px-8">
      <div
        className={cn(glassDark, "mx-auto max-w-[1080px] p-7 sm:p-10 lg:p-12")}
      >
        <div className="mb-9 max-w-3xl">
          <div className={cn(monoLabel, "mb-3.5 text-[#B0573F]")}>On stage</div>
          <h2 className={cn(serif, "text-4xl leading-[0.98] sm:text-6xl")}>
            Talking about the work behind the work.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#FAF6EE]/70">
            From Lean Startup to agentic development, I share practical stories
            about building products, leading teams, and making ambitious ideas
            useful.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
              <Image
                src="/images/home/kristian-on-stage-lean-startup.webp"
                alt="Kristian Elset Bø speaking about Lean Startup at Storebrand"
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className={cn(monoLabel, "mt-3 text-[10px] text-[#FAF6EE]/55")}>
              Lean Startup · Storebrand · 2017
            </p>
          </div>
          <div className="flex flex-col">
            <ol>
              {speakingEngagements.map((engagement, i) => (
                <li
                  key={`${engagement.year}-${engagement.event}`}
                  className="relative grid grid-cols-[62px_1fr] gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <span
                    className={cn(
                      monoLabel,
                      "pt-0.5 text-[10px] text-[#B0573F]",
                    )}
                  >
                    {engagement.year}
                  </span>
                  <div className="relative border-l border-white/12 pl-5">
                    {i < speakingEngagements.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-5 -left-px h-[calc(100%+0.9rem)] w-px bg-white/12"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-[#B0573F] ring-4 ring-[#15110C]"
                    />
                    <h3 className={cn(serif, "text-[24px] leading-tight")}>
                      {engagement.event}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#FAF6EE]/65">
                      {engagement.topic}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/speaking"
              className="mt-8 inline-block self-start rounded-full bg-[#FAF6EE] px-5 py-2.5 text-[13px] font-semibold text-[#15110C] transition hover:bg-white"
            >
              Speaking topics &amp; details →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="bg-linear-to-b from-[#3F4A4A] to-[#1B2A2E] px-6 py-16 sm:py-22 lg:px-8">
      <div
        className={cn(glassDark, "mx-auto max-w-4xl p-10 text-center sm:p-14")}
      >
        <div
          className={cn(serif, "text-3xl leading-[1.25] italic sm:text-[44px]")}
        >
          &ldquo;The most important step a man can take is not the first step,
          neither the last step. It&apos;s the{" "}
          <span className="text-[#B0573F]">next step</span>.&rdquo;
        </div>
        <div className={cn(monoLabel, "mt-3.5 text-[#FAF6EE]/70")}>
          — Brandon Sanderson
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#FAF6EE] px-6 py-16 sm:py-22 lg:px-8">
      <div
        className={cn(
          glassSolid,
          "mx-auto grid max-w-5xl grid-cols-1 gap-9 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14",
        )}
      >
        <div>
          <div className={cn(monoLabel, "mb-3.5 text-[#B0573F]")}>About</div>
          <h2
            className={cn(
              serif,
              "text-4xl leading-[0.98] text-[#15110C] sm:text-6xl",
            )}
          >
            Still trying to help people find the right thing.
          </h2>
        </div>
        <div className="text-[17px] leading-relaxed text-[#15110C]/68">
          <p>
            I studied Computer Science at NTNU, where an AI-based apartment
            matching thesis gave me a problem I&apos;ve never really stopped
            thinking about.
          </p>
          <p className="mt-5">
            After years of consulting and building across Norway and Europe, the
            through-line is still the same: use technology to connect people
            with the right things at the right time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/resume"
              className="rounded-full bg-[#1F4D3C] px-5 py-2.5 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#1F4D3C]/90"
            >
              Full career history →
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#15110C]/16 px-5 py-2.5 text-sm font-semibold text-[#15110C] transition hover:bg-[#15110C]/5"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className={cn(newsreader.variable, "bg-[#FAF6EE]")}>
      <Hero />
      <Focus />
      <Travel />
      <Projects />
      <Themes />
      <Speaking />
      <Quote />
      <About />
    </div>
  );
}
