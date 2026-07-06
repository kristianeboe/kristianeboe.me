import { type Metadata } from 'next'

import { CareerTimeline } from '@/components/CareerTimeline'
import { Card } from '@/components/spotlight/Card'
import { Section } from '@/components/spotlight/Section'
import { SimpleLayout } from '@/components/spotlight/SimpleLayout'
import { career } from '@/data/career'

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

const competencies = [
  {
    title: 'System design & architecture',
    description:
      'Mapping how the pieces of a system fit together, across a lot of different products and teams.',
  },
  {
    title: 'Frontend and design',
    description:
      'React and Next.js day to day. Tailwind CSS for styling, and a preference for flat, functional design over decoration.',
  },
  {
    title: 'APIs and databases',
    description:
      'Node.js and TypeScript on the backend, tRPC or REST for APIs, Postgres or MongoDB depending on the shape of the data.',
  },
  {
    title: 'DevOps & cloud',
    description:
      'CI/CD as table stakes. Comfortable with serverless and standard cloud infrastructure.',
  },
]

const education = [
  {
    title: 'MSc in Computer Science & Artificial Intelligence',
    place: 'Norwegian University of Science and Technology (NTNU), Trondheim',
    period: '2013 – 2018',
    description:
      'Specialization in artificial intelligence and recommendation systems. Thesis on AI-based apartment matching.',
  },
  {
    title: 'Study Abroad / Exchange',
    place: 'University of Melbourne, Australia',
    period: '2015 – 2016',
    description: 'One year abroad as part of the NTNU degree.',
  },
]

export const metadata: Metadata = {
  title: 'Resume',
  description:
    "Kristian Elset Bø's career history, technical background, and education.",
}

export default function Resume() {
  return (
    <SimpleLayout
      title="Resume"
      intro="Career history, technical background, and education — the long version of what's on the about and projects pages."
    >
      <div className="space-y-20">
        <Section title="Key competencies">
          <ul role="list" className="space-y-10">
            {competencies.map((item) => (
              <Card as="li" key={item.title}>
                <Card.Title as="h3">{item.title}</Card.Title>
                <Card.Description>{item.description}</Card.Description>
              </Card>
            ))}
          </ul>
        </Section>

        <Section title="Career">
          <CareerTimeline entries={career} />
          <p className="mt-10 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
            Before all that: national service in the Norwegian Armed Forces
            (2012), a Fulbright leadership program in the US (2011), and a few
            summers behind the register at Norsk Folkemuseum.
          </p>
        </Section>

        <Section title="Education">
          <ul role="list" className="space-y-10">
            {education.map((item) => (
              <Card as="li" key={item.title}>
                <Card.Title as="h3">{item.title}</Card.Title>
                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.place} · {item.period}
                </p>
                <Card.Description>{item.description}</Card.Description>
              </Card>
            ))}
          </ul>
        </Section>

        <div className="flex">
          <a
            href="/downloads/kristian-elset-boe-cv.pdf"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-500 hover:text-teal-600"
          >
            <DownloadIcon className="h-4 w-4" />
            Download as PDF
          </a>
        </div>
      </div>
    </SimpleLayout>
  )
}
