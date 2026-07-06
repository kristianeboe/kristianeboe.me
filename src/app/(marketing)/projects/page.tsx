import { type Metadata } from 'next'

import { CareerTimeline } from '@/components/CareerTimeline'
import { Card } from '@/components/spotlight/Card'
import { SimpleLayout } from '@/components/spotlight/SimpleLayout'

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DownloadIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 0 1 .75.75v11.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 15a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V18a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V18a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  )
}

const projects = [
  {
    name: 'Homi',
    description:
      'AI-powered home search that matches buyers with properties based on lifestyle fit, not just filters. Built to solve the problem I first tackled in my NTNU thesis.',
    link: { href: 'https://homi.ai', label: 'homi.ai' },
    stats: [
      { value: '250+', label: 'Organic signups' },
      { value: '2024', label: 'Broker pilots' },
    ],
    caseStudy: 'https://boe.ventures/work/homi',
  },
  {
    name: 'SwipeStats',
    description:
      'Turn your Tinder and Hinge data exports into real analytics. Understand your dating patterns, match rates, and conversation stats. Used by hundreds of thousands of people.',
    link: { href: 'https://swipestats.io', label: 'swipestats.io' },
    stats: [
      { value: '10K+', label: 'Data uploads' },
      { value: '15K+', label: 'Reddit community' },
    ],
    caseStudy: 'https://boe.ventures/work/swipestats',
  },
  {
    name: 'Boe Ventures',
    description:
      'My product holding company. Where ideas become products, and products find their market. Home to Homi, SwipeStats, and whatever comes next.',
    link: { href: 'https://boe.ventures', label: 'boe.ventures' },
  },
  {
    name: 'Jetpack',
    description:
      'A production-ready Next.js SaaS starter with auth, database, payments, email, and AI built in. The template I wish I had when starting every new project.',
    link: { href: 'https://github.com/kristianeboe/jetpack', label: 'github.com' },
  },
  {
    name: 'Wander',
    description:
      'Series B vacation rental platform reimagining what it means to travel. I joined as Lead Growth Engineer to help scale the product and engineering teams.',
    link: { href: 'https://wander.com', label: 'wander.com' },
  },
]

const career = [
  {
    role: 'Founder',
    company: 'Homi',
    period: 'Oct 2025 – Present',
    location: 'Oslo',
    description:
      'Building a collaborative home search tool that replaces messy group chats and spreadsheets with one shared workspace — AI that actually reads the listings.',
    tags: ['Artificial Intelligence', 'Next.js', 'tRPC'],
  },
  {
    role: 'Founding Engineer',
    company: 'Wordware (YC S24)',
    period: 'Aug 2024 – Jul 2025',
    location: 'San Francisco',
    description:
      'Helped design and scale the product and infrastructure through a $30M seed round. Built parts of the typed multimodal runtime powering structured AI workflows across text, PDFs, images, and audio, and supported company-wide SOC 2 Type I & II compliance.',
    tags: ['Artificial Intelligence', 'TypeScript'],
  },
  {
    role: 'Lead Engineer',
    company: 'Matcha',
    period: 'Mar 2023 – May 2024',
    description:
      'A platform for professionals and communities investing in growing their network in a focused way.',
    tags: ['Next.js', 'Prisma ORM'],
  },
  {
    role: 'Senior Software Engineer → Dev Team Lead → Engineering Manager',
    company: 'Holaplex',
    period: 'Nov 2021 – Jan 2023',
    location: 'Remote',
    description:
      'Grew from IC into managing the engineering team over 15 months, working on distributed systems and Solana-based infrastructure.',
    tags: ['Distributed Systems', 'Solana', 'TypeScript'],
  },
  {
    role: 'Co-Founder & CTO (Acquired)',
    company: 'Scales',
    period: 'Mar 2020 – May 2022',
    location: 'Palo Alto',
    description:
      'Enterprise software for designing and automating employee engagement programs. Connected 1,000+ people worldwide across 3,000+ program interactions during private beta, averaging a 4.8/5 experience score.',
  },
  {
    role: 'Product Lead',
    company: 'Husleie.no',
    period: 'Jul 2019 – Feb 2020',
    location: 'Oslo',
    description:
      'Digitising the landlord–tenant relationship. Facilitated specs and process across the org alongside serial entrepreneurs and industry veterans.',
  },
  {
    role: 'Consultant',
    company: 'Netlight',
    period: 'Sep 2018 – Jul 2019',
    location: 'Oslo / Berlin',
    description:
      'Client work at VG/Schibsted (partner integration API, an article recommendation system, GDPR-compliant consent handling) and at Klarna Bank in Berlin, preparing the merchant onboarding flow for its US launch.',
    tags: ['Recommendation Systems', 'MySQL', 'Next.js'],
  },
  {
    role: 'Digital Manager / Digital Consultant',
    company: 'Crux Advisers',
    period: 'Jan 2017 – Oct 2018',
    location: 'Oslo',
    description:
      'Led digitalization efforts, introducing new communication software and moving the company into the cloud.',
  },
  {
    role: 'Consultant',
    company: 'Junior Consulting',
    period: 'Oct 2016 – Dec 2017',
    location: 'Trondheim',
    description:
      "Norway's first student-owned consultancy. Managed projects building the website for startup incubator ArkwrightX and for DHT Corporate Services.",
  },
  {
    role: 'Founder',
    company: 'I.D.A.I Solutions',
    period: 'Jun 2014 – Oct 2017',
    description:
      'My own part-time shop through university, building websites with a focus on interaction design and tailored analytics.',
  },
  {
    role: 'Scrum Master',
    company: 'Capra Consulting',
    period: 'Jun 2017 – Aug 2017',
    location: 'Oslo',
    description:
      "Ran a seven-week summer internship program as Scrum Master for a team of seven, building a full-stack app for an international shipping startup client.",
  },
  {
    role: 'Software Engineer, Innovation Intern',
    company: 'Storebrand',
    period: 'Jun 2016 – Aug 2016',
    description:
      'Built an MVP web app with a multidisciplinary team using Lean Startup methods, presented to the board and later released to market.',
    tags: ['MeteorJS', 'Lean Startup'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'pantree co',
    period: 'Feb 2016 – Jun 2016',
    location: 'Melbourne',
    description:
      'Part-time mobile-first web development during my exchange at the University of Melbourne.',
  },
  {
    role: 'Software Developer Intern',
    company: 'dSAFE',
    period: 'Jun 2015 – Dec 2015',
    description:
      "Rewrote a critical piece of enterprise software from C# to Python, improving its architecture along the way.",
    tags: ['Python', 'C#'],
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description: "Things I've built — from AI home search to dating analytics.",
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've built trying to match people with what they're looking for."
      intro="I keep coming back to the same core problem with better tools each time. Some of these are live products, some are experiments, and some are templates I built so the next project starts faster."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            {project.stats && (
              <div className="relative z-10 mt-4 flex gap-6">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      {stat.value}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
            {project.caseStudy && (
              <a
                href={project.caseStudy}
                className="relative z-20 mt-2 text-sm font-medium text-teal-500 hover:text-teal-600"
              >
                Read the full case study →
              </a>
            )}
          </Card>
        ))}
      </ul>

      <div className="mt-24 sm:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Career
          </h2>
          <a
            href="/downloads/kristian-elset-boe-cv.pdf"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-500 hover:text-teal-600"
          >
            <DownloadIcon className="h-4 w-4" />
            Download CV (PDF)
          </a>
        </div>
        <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          The long version — consulting, startups, an acquisition, and the
          jobs that got me here.
        </p>
        <div className="mt-10">
          <CareerTimeline entries={career} />
        </div>
        <p className="mt-10 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
          Before all that: national service in the Norwegian Armed Forces
          (2012), a Fulbright leadership program in the US (2011), and a few
          summers behind the register at Norsk Folkemuseum.
        </p>
      </div>
    </SimpleLayout>
  )
}
