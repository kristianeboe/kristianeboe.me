export interface CareerEntry {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  tags?: string[];
}

export const career: CareerEntry[] = [
  {
    role: "Founder",
    company: "Homi",
    period: "Oct 2025 to Present",
    location: "Oslo",
    description:
      "Building a collaborative home search tool that replaces messy group chats and spreadsheets with one shared workspace and AI that actually reads the listings.",
    tags: ["Artificial Intelligence", "Next.js", "tRPC"],
  },
  {
    role: "Founding Engineer",
    company: "Wordware (YC S24)",
    period: "Aug 2024 to Jul 2025",
    location: "San Francisco",
    description:
      "Helped design and scale the product and infrastructure through a $30M seed round. Built parts of the typed multimodal runtime powering structured AI workflows across text, PDFs, images, and audio, and supported company-wide SOC 2 Type I & II compliance.",
    tags: ["Artificial Intelligence", "TypeScript"],
  },
  {
    role: "Lead Engineer",
    company: "Matcha",
    period: "Mar 2023 to May 2024",
    description:
      "A platform for professionals and communities investing in growing their network in a focused way.",
    tags: ["Next.js", "Prisma ORM"],
  },
  {
    role: "Senior Software Engineer → Dev Team Lead → Engineering Manager",
    company: "Holaplex",
    period: "Nov 2021 to Jan 2023",
    location: "Remote",
    description:
      "Grew from IC into managing the engineering team over 15 months, working on distributed systems and Solana-based infrastructure.",
    tags: ["Distributed Systems", "Solana", "TypeScript"],
  },
  {
    role: "Co-Founder & CTO (Acquired)",
    company: "Scales",
    period: "Mar 2020 to May 2022",
    location: "Palo Alto",
    description:
      "Enterprise software for designing and automating employee engagement programs. Connected 1,000+ people worldwide across 3,000+ program interactions during private beta, averaging a 4.8/5 experience score.",
  },
  {
    role: "Product Lead",
    company: "Husleie.no",
    period: "Jul 2019 to Feb 2020",
    location: "Oslo",
    description:
      "Digitising the landlord-tenant relationship. Facilitated specs and process across the org alongside serial entrepreneurs and industry veterans.",
  },
  {
    role: "Consultant",
    company: "Netlight",
    period: "Sep 2018 to Jul 2019",
    location: "Oslo / Berlin",
    description:
      "Client work at VG/Schibsted (partner integration API, an article recommendation system, GDPR-compliant consent handling) and at Klarna Bank in Berlin, preparing the merchant onboarding flow for its US launch.",
    tags: ["Recommendation Systems", "MySQL", "Next.js"],
  },
  {
    role: "Digital Manager / Digital Consultant",
    company: "Crux Advisers",
    period: "Jan 2017 to Oct 2018",
    location: "Oslo",
    description:
      "Led digitalization efforts, introducing new communication software and moving the company into the cloud.",
  },
  {
    role: "Consultant",
    company: "Junior Consulting",
    period: "Oct 2016 to Dec 2017",
    location: "Trondheim",
    description:
      "Norway's first student-owned consultancy. Managed projects building the website for startup incubator ArkwrightX and for DHT Corporate Services.",
  },
  {
    role: "Founder",
    company: "I.D.A.I Solutions",
    period: "Jun 2014 to Oct 2017",
    description:
      "My own part-time shop through university, building websites with a focus on interaction design and tailored analytics.",
  },
  {
    role: "Scrum Master",
    company: "Capra Consulting",
    period: "Jun 2017 to Aug 2017",
    location: "Oslo",
    description:
      "Ran a seven-week summer internship program as Scrum Master for a team of seven, building a full-stack app for an international shipping startup client.",
  },
  {
    role: "Software Engineer, Innovation Intern",
    company: "Storebrand",
    period: "Jun 2016 to Aug 2016",
    description:
      "Built an MVP web app with a multidisciplinary team using Lean Startup methods, presented to the board and later released to market.",
    tags: ["MeteorJS", "Lean Startup"],
  },
  {
    role: "Software Engineer Intern",
    company: "pantree co",
    period: "Feb 2016 to Jun 2016",
    location: "Melbourne",
    description:
      "Part-time mobile-first web development during my exchange at the University of Melbourne.",
  },
  {
    role: "Software Developer Intern",
    company: "dSAFE",
    period: "Jun 2015 to Dec 2015",
    description:
      "Rewrote a critical piece of enterprise software from C# to Python, improving its architecture along the way.",
    tags: ["Python", "C#"],
  },
];
