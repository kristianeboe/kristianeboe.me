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
import { Button } from "@/components/ui/button";
import clsx from "clsx";

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
      className="text-muted-foreground hover:text-foreground transition"
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
              "relative w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
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
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm">
        <strong className="text-foreground">{bold}</strong> {description}
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
    <div className="rounded-2xl border p-6">
      <h2 className="flex items-center text-sm font-semibold">
        <ArrowDown className="text-muted-foreground h-5 w-5" />
        <span className="ml-3">Timeline</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {roles.map((role) => (
          <li key={role.company} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border bg-white text-xs font-bold dark:bg-zinc-900">
              {role.company[0]}
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-muted-foreground text-xs">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd className="text-muted-foreground ml-auto text-xs">
                {role.period}
              </dd>
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
    <div className="mt-24 border-t pt-12 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none">
          {quotes.map((quote) => (
            <figure key={quote.author}>
              <blockquote className="text-muted-foreground text-lg italic leading-8">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="text-foreground mt-3 text-sm font-semibold">
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
    <div className="isolate">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 lg:px-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          <div className="relative h-32 w-32 flex-none overflow-hidden rounded-full md:h-40 md:w-40">
            <Image
              src="/images/home/profile.jpg"
              alt="Kristian Elset Bø"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Engineer, entrepreneur, and{" "}
              <span className="text-primary">explorer.</span>
            </h1>
            <p className="text-muted-foreground mt-6 text-base leading-7">
              I&apos;m Kristian — a Norwegian engineer building AI products that
              match people with the right things. From apartment matching
              algorithms to dating analytics to home search, I keep coming back
              to the same problem with better tools.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Oslo 🇳🇴 ↔ NYC 🇺🇸</span>
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

      {/* Photo strip */}
      <Photos />

      {/* Main content */}
      <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-8 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          {/* Left: Pillars */}
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                What I&apos;m about
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Four things that define how I move through the world.
              </p>
            </div>
            <Pillar
              title="🚀 Building"
              bold="Nothing beats creating something with your own hands."
              description="I'm fascinated with the power of the web, the possibilities it affords and the opportunities it creates. Currently: Homi (AI home search), SwipeStats (dating analytics), and more."
            />
            <Pillar
              title="🎤 Speaking"
              bold="Sharing knowledge is what moves the world forward."
              description="The rush of stepping onto the stage is always exhilarating. No matter how prepared I am, my heart is always beating a little quicker than normal. That's how I like it."
            />
            <Pillar
              title="👥 Leading"
              bold="I like to think I'm the guy in the bottom half of the picture."
              description="A fervent believer in servant leadership. I thrive on responsibility and helping the people around me succeed."
            />
            <Pillar
              title="🌏 Traveling"
              bold="The world is a big place, and I want to see as much of it as possible."
              description="Since 2013 I've done at least one big trip each year. Australia, Japan, New Zealand, Bali, America, Europe — these journeys help me recharge, refocus, and connect with amazing people."
            />

            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                Read the blog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Right: Resume + Newsletter */}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
            <div className="rounded-2xl border p-6">
              <h2 className="text-sm font-semibold">Current ventures</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://homi.ai"
                    className="group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary transition">
                        Homi
                      </div>
                      <div className="text-muted-foreground text-xs">
                        AI-powered home search
                      </div>
                    </div>
                    <ArrowRight className="text-muted-foreground h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://swipestats.io"
                    className="group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary transition">
                        SwipeStats
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Dating app analytics
                      </div>
                    </div>
                    <ArrowRight className="text-muted-foreground h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://boe.ventures"
                    className="group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium group-hover:text-primary transition">
                        Boe Ventures
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Product holding company
                      </div>
                    </div>
                    <ArrowRight className="text-muted-foreground h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quotes */}
      <Quotes />
    </div>
  );
}
