import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";

import { posts as allPosts } from ".velite";
import { cn } from "@/lib/utils";
import { getTravelPosts } from "@/lib/travel-nav";

import { HomeHeader } from "./HomeHeader";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title:
    "Kristian Elset Bø — Software, stories, and the messy parts of modern life",
  description:
    "Norwegian founder and engineer in Oslo. Building Homi (AI home search), SwipeStats, and other tools for deciding where to live, who to meet, and how to move.",
};

// Direction E — "Card Tower" from the claude.ai/design kristianeboe.me project.
// Frosted-glass cards floating on a dawn-over-fjord gradient.
const serif = "font-[family-name:var(--font-newsreader)] tracking-[-0.015em]";
const monoLabel = "font-mono text-[11px] uppercase tracking-[0.08em]";

const glass =
  "rounded-[20px] border border-white/55 bg-[#FAF6EE]/80 shadow-[0_24px_60px_rgba(21,17,12,0.18),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-lg";
const glassSolid =
  "rounded-[20px] border border-white/55 bg-[#FFFDF8] shadow-[0_24px_60px_rgba(21,17,12,0.12),inset_0_1px_0_rgba(255,255,255,0.5)]";
const glassDark =
  "rounded-[20px] border border-white/10 bg-[#15110C]/65 text-[#FAF6EE] shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-lg";

const heroGradient = `
  radial-gradient(ellipse 90% 60% at 70% 0%, #F4D9B6 0%, transparent 55%),
  radial-gradient(ellipse 70% 50% at 30% 20%, #E8B486 0%, transparent 60%),
  radial-gradient(ellipse 80% 60% at 80% 60%, #A56B4A 0%, transparent 55%),
  radial-gradient(ellipse 100% 60% at 20% 100%, #1B2A2E 0%, transparent 60%),
  linear-gradient(180deg, #3F4A4A 0%, #1B2A2E 100%)
`;

function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: heroGradient }}
    >
      <Grain />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-7 px-6 pt-28 pb-14 sm:pt-32 sm:pb-20 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div
          className={cn(
            glass,
            "flex flex-col justify-between p-8 text-[#15110C] sm:p-11",
          )}
        >
          <div>
            <div className={cn(monoLabel, "mb-5 text-[#C9923D]")}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#C9923D] align-middle" />
              Currently · Oslo, Norway
            </div>
            <h1
              className={cn(
                serif,
                "text-5xl leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[84px]",
              )}
            >
              Software, stories, and the{" "}
              <em className="text-[#1F4D3C] italic">messy</em> parts of{" "}
              <em className="italic">modern life</em>.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#15110C]/62">
              I&apos;m Kristian Elset Bø — I build products like{" "}
              <strong className="font-semibold text-[#15110C]">Homi</strong> and{" "}
              <strong className="font-semibold text-[#15110C]">
                SwipeStats
              </strong>
              , write about travel and nomad life, and document the experiments
              that shape how I work, move, and think.
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

        <div className="flex flex-col gap-7">
          <div className={cn(glass, "flex-1 p-2")}>
            <div className="relative h-full min-h-60 overflow-hidden rounded-[14px]">
              <Image
                src="/images/home/profile.jpg"
                alt="Kristian Elset Bø"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className={cn(glassDark, "p-6")}>
            <div className={cn(monoLabel, "mb-3 text-[10px] text-[#C9923D]")}>
              Now playing
            </div>
            <div className={cn(serif, "text-[26px] leading-tight")}>
              Building <em className="text-[#C9923D] italic">Homi</em>.
            </div>
            <div className="mt-1.5 text-[13px] text-[#FAF6EE]/70">
              AI home search · pre-seed · year one.
            </div>
            <div className={cn(monoLabel, "mt-4 flex gap-3 text-[10px]")}>
              <span className="text-[#FAF6EE]/70">Oslo</span>
              <span className="text-[#C9923D]">—</span>
              <span className="text-[#FAF6EE]/70">since Sep &apos;25</span>
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
          "mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14",
        )}
      >
        <div>
          <div className={cn(monoLabel, "mb-3.5 text-[#C9923D]")}>
            The main bet
          </div>
          <h2
            className={cn(
              serif,
              "text-4xl leading-[0.98] text-[#15110C] sm:text-6xl lg:text-7xl",
            )}
          >
            Homi — find a home like a person with a broker.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#15110C]">
            Finding a home is fragmented: listings, spreadsheets, group chats,
            forwarded links. Homi is the intelligent layer on top — a place to{" "}
            <strong>collect, compare, collaborate</strong> — and eventually let
            AI agents scout for you.
          </p>
          <div
            className={cn(
              serif,
              "mt-6 rounded-[14px] bg-[#1F4D3C]/8 px-5 py-4 text-[22px] leading-snug text-[#1F4D3C] italic",
            )}
          >
            Privilege expansion — giving regular people the kind of home-search
            support usually reserved for those with brokers.
          </div>
          <a
            href="https://homi.ai"
            className="mt-6 inline-block rounded-full bg-[#1F4D3C] px-6 py-3 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#1F4D3C]/90"
          >
            Visit homi.ai →
          </a>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
          <Image
            src="/images/home/coding.jpg"
            alt="Building Homi"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Travel() {
  const trips = getTravelPosts();

  return (
    <section className="overflow-hidden bg-[#FAF6EE] px-6 pt-2 pb-16 sm:pb-22 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className={cn(serif, "text-4xl text-[#15110C] sm:text-5xl")}>
            Also, I travel. <em className="text-[#C9923D] italic">A lot.</em>
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
                      className={cn(monoLabel, "text-[10px] text-[#C9923D]")}
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
    name: "Promad.life",
    status: "Experiment",
    year: "2024–",
    accent: "text-[#C9923D]",
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
];

function Projects() {
  return (
    <section className="bg-linear-to-b from-[#FAF6EE] to-[#F0E9DA] px-6 pt-2 pb-16 sm:pb-22 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className={cn(serif, "text-4xl text-[#15110C] sm:text-5xl")}>
            Selected work
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#15110C]">
                <Image
                  src={project.image}
                  alt={`${project.name} website screenshot`}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-top"
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
                Open card →
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div>
          <div className={cn(monoLabel, "mb-3.5 text-[#C9923D]")}>
            What I keep returning to
          </div>
          <h2
            className={cn(
              serif,
              "text-4xl leading-none text-[#15110C] sm:text-5xl",
            )}
          >
            Tools for messy decisions in modern life.
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

function WritingSpeaking() {
  const posts = [...allPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 4);

  return (
    <section className="bg-linear-to-b from-[#F0E9DA] to-[#3F4A4A] px-6 py-16 sm:py-22 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className={cn(glassSolid, "p-7 sm:p-9")}>
          <div className={cn(monoLabel, "mb-3.5 text-[#C9923D]")}>
            Recent writing
          </div>
          <h2 className={cn(serif, "mb-6 text-4xl text-[#15110C]")}>
            From the journal
          </h2>
          <ul>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className={cn(
                  "grid grid-cols-[90px_1fr_60px] items-baseline gap-4 py-4",
                  i > 0 && "border-t border-[#15110C]/16",
                )}
              >
                <span className={cn(monoLabel, "text-[10px] text-[#C9923D]")}>
                  {post.category ?? post.tags?.[0] ?? "Notes"}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    serif,
                    "text-[22px] leading-snug text-[#15110C] hover:text-[#1F4D3C]",
                  )}
                >
                  {post.h1}
                </Link>
                <span
                  className={cn(
                    monoLabel,
                    "text-right text-[10px] text-[#15110C]/62",
                  )}
                >
                  {post.readingTime ? `${post.readingTime} min` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(glassDark, "flex flex-col p-7 sm:p-9")}>
          <div className={cn(monoLabel, "mb-3.5 text-[#C9923D]")}>On stage</div>
          <h2 className={cn(serif, "mb-4 text-4xl")}>
            Talks on AI, startups &amp; the unglamorous work.
          </h2>
          <div className="relative mb-4 aspect-[5/4] overflow-hidden rounded-[14px]">
            <Image
              src="/images/home/speaking.jpg"
              alt="Kristian speaking on stage"
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="text-[13px] leading-7 text-[#FAF6EE]/70">
            Nordic Startup Summit · 2024
            <br />
            ProductTank Oslo · 2024
            <br />
            NTNU Alumni Day · 2023
          </div>
          <Link
            href="/speaking"
            className="mt-auto inline-block self-start rounded-full bg-[#FAF6EE] px-5 py-2.5 pt-2.5 text-[13px] font-semibold text-[#15110C] transition hover:bg-white"
          >
            Topics &amp; testimonials →
          </Link>
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
          <span className="text-[#C9923D]">next step</span>.&rdquo;
        </div>
        <div className={cn(monoLabel, "mt-3.5 text-[#FAF6EE]/70")}>
          — Brandon Sanderson
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className={cn(newsreader.variable, "-mt-[84px] bg-[#FAF6EE]")}>
      {/* The homepage gets its own contained pill nav instead of the site's
          edge-to-edge header — hide the layout's <Header /> in favor of it. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `header:not(.hero-header) { display: none !important; }`,
        }}
      />
      <HomeHeader />
      <Hero />
      <Focus />
      <Travel />
      <Projects />
      <Themes />
      <WritingSpeaking />
      <Quote />
    </div>
  );
}
