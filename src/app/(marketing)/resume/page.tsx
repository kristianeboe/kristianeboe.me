import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newsreader } from "next/font/google";

import { career } from "@/data/career";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
});

const serif = "font-[family-name:var(--font-newsreader)] tracking-[-0.015em]";
const monoLabel = "font-mono text-[11px] uppercase tracking-[0.08em]";

function DownloadIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 0 1 .75.75v11.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 15a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V18a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V18a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}

const competencies = [
  {
    title: "System design & architecture",
    description:
      "Mapping how the pieces of a system fit together, across a lot of different products and teams.",
  },
  {
    title: "Frontend and design",
    description:
      "React and Next.js day to day. Tailwind CSS for styling, and a preference for flat, functional design over decoration.",
  },
  {
    title: "APIs and databases",
    description:
      "Node.js and TypeScript on the backend, tRPC or REST for APIs, Postgres or MongoDB depending on the shape of the data.",
  },
  {
    title: "DevOps & cloud",
    description:
      "CI/CD as table stakes. Comfortable with serverless and standard cloud infrastructure.",
  },
];

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Kristian Elset Bø's career history, technical background, and education.",
};

export default function Resume() {
  return (
    <main className={`${newsreader.variable} bg-[#FAF6EE] text-[#1F1B14]`}>
      <section className="border-b border-[#1F1B14]/10 bg-[#F1EBDD] px-6 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-[1080px]">
          <div className={`${monoLabel} mb-4 text-[#B0573F]`}>Resume</div>
          <h1
            className={`${serif} max-w-3xl text-5xl leading-[0.98] sm:text-7xl`}
          >
            The long version of the work behind the work.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#1F1B14]/65">
            Career history, technical range, and the projects that taught me how
            to build products people actually use.
          </p>
          <a
            href="/downloads/kristian-elset-boe-cv.pdf"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1F1B14] px-5 py-2.5 text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#1F1B14]/85"
          >
            <DownloadIcon className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-22">
        <div className="mx-auto max-w-[1080px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[20px] border border-white/60 bg-[#FFFDF8] p-6 shadow-[0_18px_50px_rgba(21,17,12,0.07)]"
              >
                <span className={`${monoLabel} text-[10px] text-[#B0573F]`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className={`${serif} mt-2 text-[27px] leading-tight`}>
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#1F1B14]/62">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <div>
              <div className={`${monoLabel} mb-3.5 text-[#B0573F]`}>Career</div>
              <h2 className={`${serif} text-5xl leading-[0.98]`}>
                A career built across consulting, startups, and the messy
                middle.
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#1F1B14]/65">
                From early product work in Norway and Europe to founding teams,
                AI products, and the systems that make growth repeatable.
              </p>
              <Link
                href="/projects"
                className="mt-6 inline-block text-sm font-semibold text-[#1F4D3C] hover:text-[#B0573F]"
              >
                Selected projects →
              </Link>
            </div>
            <ol>
              {career.map((entry, index) => (
                <li
                  key={`${entry.company}-${entry.period}`}
                  className="grid grid-cols-[84px_1fr] gap-4 border-t border-[#1F1B14]/12 py-5 first:pt-0"
                >
                  <span
                    className={`${monoLabel} pt-1 text-[10px] text-[#B0573F]`}
                  >
                    {entry.period}
                  </span>
                  <div>
                    <h3 className={`${serif} text-2xl leading-tight`}>
                      {entry.role}
                      <span className="text-[#1F4D3C]"> · {entry.company}</span>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#1F1B14]/62">
                      {entry.description}
                    </p>
                    {index === career.length - 1 && (
                      <p className="mt-4 text-sm leading-relaxed text-[#1F1B14]/50">
                        Before all that: national service in the Norwegian Armed
                        Forces, a Fulbright leadership program, and a few
                        summers behind the register at Norsk Folkemuseum.
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#1B2A2E] px-6 py-16 text-[#FAF6EE] lg:px-8 lg:py-22">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className={`${monoLabel} mb-3.5 text-[#B0573F]`}>
              PDF resume
            </div>
            <h2 className={`${serif} text-5xl leading-[0.98] sm:text-6xl`}>
              One page. <em className="text-[#B0573F]">No scavenger hunt.</em>
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#FAF6EE]/70">
              A clean, printable snapshot for people who want the receipts
              without opening sixteen tabs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/downloads/kristian-elset-boe-cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF6EE] px-5 py-2.5 text-sm font-semibold text-[#1F1B14] transition hover:bg-white"
              >
                <DownloadIcon className="h-4 w-4" />
                Download PDF
              </a>
              <a
                href="/downloads/kristian-elset-boe-cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-[#FAF6EE] transition hover:bg-white/10"
              >
                Open full size →
              </a>
            </div>
            <p className={`${monoLabel} mt-8 text-[10px] text-[#FAF6EE]/45`}>
              Updated July 2026 · one-page PDF
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[640px]">
            <div className="absolute -inset-8 -z-0 rounded-full bg-[#B0573F]/20 blur-3xl" />
            <div className="relative rotate-[1.5deg] rounded-[12px] bg-[#FAF6EE] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.42)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/images/resume/kristian-elset-boe-cv.png"
                alt="Preview of Kristian Elset Bø's one-page resume"
                width={1488}
                height={2105}
                sizes="(min-width: 1024px) 48vw, 90vw"
                className="h-auto w-full rounded-[7px]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
