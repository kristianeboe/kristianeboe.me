"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  ArrowDown,
  MapPin,
} from "lucide-react";
import clsx from "clsx";
import { HeroBeam } from "@/components/effects/HeroBeam";
import { MouseSpotlight } from "@/components/effects/MouseSpotlight";
import { GlowButton } from "@/components/effects/GlowButton";
import { ElectricBorder } from "@/components/effects/ElectricBorder";

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-zinc-400 transition hover:text-white"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

function Photos() {
  const images = [
    { src: "/images/home/leading.jpg", alt: "Leading" },
    { src: "/images/home/speaking.jpg", alt: "Speaking" },
    { src: "/images/home/coding.jpg", alt: "Coding" },
    { src: "/images/home/traveling.jpg", alt: "Traveling" },
  ];

  const rotations = ["rotate-2", "-rotate-2", "rotate-2", "-rotate-2"];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, i) => (
          <div
            key={image.src}
            className={clsx(
              "relative w-44 flex-none overflow-hidden rounded-xl bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[i % rotations.length],
            )}
          >
            <div className="aspect-9/10">
              <Image
                src={image.src}
                alt={image.alt}
                width={720}
                height={800}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pillar({
  title,
  bold,
  description,
}: {
  title: string;
  bold: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
        {title}
      </h3>
      <p className="text-sm text-zinc-400">
        <strong className="text-zinc-200">{bold}</strong> {description}
      </p>
    </div>
  );
}

function Resume() {
  const roles = [
    {
      company: "Boe Ventures",
      title: "Founder & Engineer",
      period: "2019 — Present",
      description: "Homi, SwipeStats, Promad.life",
    },
    {
      company: "Wander",
      title: "Lead Growth Engineer",
      period: "2024 — Present",
      description: "Series B vacation rentals",
    },
    {
      company: "Netlight / Schibsted / Antler",
      title: "Engineering & Consulting",
      period: "2017 — 2023",
      description: "Full-stack, product, and growth",
    },
    {
      company: "NTNU",
      title: "MSc Computer Science",
      period: "2013 — 2018",
      description: "AI-based apartment matching thesis",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/50 p-6">
      <h2 className="flex items-center text-sm font-semibold text-zinc-100">
        <ArrowDown className="h-5 w-5 text-zinc-500" />
        <span className="ml-3">Timeline</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {roles.map((role) => (
          <li key={role.company} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs font-bold text-zinc-300">
              {role.company[0]}
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-200">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-400">{role.title}</dd>
              <dt className="sr-only">Date</dt>
              <dd className="ml-auto text-xs text-zinc-500">{role.period}</dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Quotes() {
  const quotes = [
    {
      text: "The most important step a man can take is not the first step, neither the last step. It's the next step.",
      author: "Dalinar Kholin",
    },
    {
      text: "I shall either find a way, or make one.",
      author: "Hannibal Barca",
    },
  ];

  return (
    <div className="mt-24 border-t border-zinc-800 pt-12 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none">
          {quotes.map((quote) => (
            <figure key={quote.author}>
              <blockquote className="text-lg italic leading-8 text-zinc-400">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-zinc-200">
                — {quote.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="isolate bg-zinc-950 text-zinc-100">
      {/* Hero with beam effect */}
      <div className="relative overflow-hidden">
        <HeroBeam
          color="0, 200, 255"
          intensity={0.5}
          beamWidth={140}
          speed={0.8}
          className="pointer-events-none"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-8 lg:px-8">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
            <div className="relative h-32 w-32 flex-none overflow-hidden rounded-full ring-2 ring-cyan-500/30 md:h-40 md:w-40">
              <Image
                src="/images/home/profile.jpg"
                alt="Kristian Elset Bø"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Engineer, entrepreneur, and{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  explorer.
                </span>
              </h1>
              <p className="mt-6 text-base leading-7 text-zinc-400">
                I&apos;m Kristian — a Norwegian engineer building AI products
                that match people with the right things. From apartment matching
                algorithms to dating analytics to home search, I keep coming
                back to the same problem with better tools.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                <MapPin className="h-4 w-4" />
                <span>Oslo &#x1f1f3;&#x1f1f4; &#x2194; NYC &#x1f1fa;&#x1f1f8;</span>
              </div>
              <div className="mt-6 flex gap-6">
                <SocialLink
                  href="https://github.com/kristianeboe"
                  icon={Github}
                  label="GitHub"
                />
                <SocialLink
                  href="https://linkedin.com/in/kristianeboe"
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://instagram.com/kristianeboe"
                  icon={Instagram}
                  label="Instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo strip with spotlight reveal */}
      <MouseSpotlight
        radius={250}
        intensity={0.8}
        overlayOpacity={0.75}
        softness={0.5}
      >
        <Photos />
      </MouseSpotlight>

      {/* Main content */}
      <div className="mx-auto mt-24 max-w-7xl px-6 md:mt-28 lg:px-8">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          {/* Left: Pillars */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
                What I&apos;m about
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Four things that define how I move through the world.
              </p>
            </div>
            <Pillar
              title="&#x1f680; Building"
              bold="Nothing beats creating something with your own hands."
              description="I'm fascinated with the power of the web, the possibilities it affords and the opportunities it creates. Currently: Homi (AI home search), SwipeStats (dating analytics), and more."
            />
            <Pillar
              title="&#x1f3a4; Speaking"
              bold="Sharing knowledge is what moves the world forward."
              description="The rush of stepping onto the stage is always exhilarating. No matter how prepared I am, my heart is always beating a little quicker than normal. That's how I like it."
            />
            <Pillar
              title="&#x1f465; Leading"
              bold="I like to think I'm the guy in the bottom half of the picture."
              description="A fervent believer in servant leadership. I thrive on responsibility and helping the people around me succeed."
            />
            <Pillar
              title="&#x1f30f; Traveling"
              bold="The world is a big place, and I want to see as much of it as possible."
              description="Since 2013 I've done at least one big trip each year. Australia, Japan, New Zealand, Bali, America, Europe — these journeys help me recharge, refocus, and connect with amazing people."
            />

            <Link href="/blog">
              <GlowButton
                variant="outline"
                glowColor="rgba(0, 200, 255, 0.4)"
                glowRadius={120}
                className="gap-2 border-zinc-700 text-zinc-200 hover:border-cyan-500/50 hover:text-white"
              >
                Read the blog <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </Link>
          </div>

          {/* Right: Resume + Ventures */}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
            <ElectricBorder
              colorA="0, 220, 255"
              colorB="0, 180, 200"
              intensity={0.5}
              speed={0.8}
              borderRadius={16}
            >
              <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/50 p-6">
                <h2 className="text-sm font-semibold text-zinc-100">
                  Current ventures
                </h2>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href="https://homi.ai"
                      className="group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-medium text-zinc-200 transition group-hover:text-cyan-400">
                          Homi
                        </div>
                        <div className="text-xs text-zinc-500">
                          AI-powered home search
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-600 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://swipestats.io"
                      className="group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-medium text-zinc-200 transition group-hover:text-cyan-400">
                          SwipeStats
                        </div>
                        <div className="text-xs text-zinc-500">
                          Dating app analytics
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-600 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://boe.ventures"
                      className="group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-medium text-zinc-200 transition group-hover:text-cyan-400">
                          Boe Ventures
                        </div>
                        <div className="text-xs text-zinc-500">
                          Product holding company
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-600 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  </li>
                </ul>
              </div>
            </ElectricBorder>
          </div>
        </div>
      </div>

      {/* Quotes */}
      <Quotes />
    </div>
  );
}
