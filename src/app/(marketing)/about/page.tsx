import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/spotlight/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/spotlight/SocialIcons'

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Kristian Elset Bø — a Norwegian engineer building AI products from Oslo and NYC.",
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src="/images/home/profile.jpg"
              alt="Kristian Elset Bø"
              width={800}
              height={800}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I&apos;m Kristian. I build things that match people with what they&apos;re looking for.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I grew up in Norway fascinated by two things: how the world works
              and how to make it better. That curiosity led me to study Computer
              Science at NTNU, where I wrote my master&apos;s thesis on AI-based
              apartment matching — a problem I&apos;ve never really stopped thinking
              about.
            </p>
            <p>
              After graduating I spent years consulting and building at companies
              across Norway and Europe — Netlight, Schibsted, Antler — before
              going deep on my own ventures. The through-line has always been the
              same: use technology to connect people with the right things, at
              the right time.
            </p>
            <p>
              Today I run{' '}
              <a
                href="https://homi.ai"
                className="text-teal-500 hover:text-teal-600"
              >
                Homi
              </a>
              , an AI-powered home search platform, and{' '}
              <a
                href="https://swipestats.io"
                className="text-teal-500 hover:text-teal-600"
              >
                SwipeStats
              </a>
              , which turns your dating app data into real insights. I&apos;m also
              the Lead Growth Engineer at{' '}
              <a
                href="https://wander.com"
                className="text-teal-500 hover:text-teal-600"
              >
                Wander
              </a>
              , a Series B vacation rentals company. I split my time between
              Oslo and New York.
            </p>
            <p>
              Outside of building, I speak at conferences about product and
              engineering, travel as much as I can, and try to be the kind of
              leader I&apos;d want to work for. I believe in servant leadership,
              shipping fast, and always taking the next step.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/kristianeboe" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://instagram.com/kristianeboe"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/kristianeboe"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/kristianeboe"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:kristian@boe.ventures"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              kristian@boe.ventures
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
