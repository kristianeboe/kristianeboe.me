import type { JSX, SVGProps } from "react";
import Link from "next/link";

const footerNavigation = {
  site: [
    { name: "Projects", href: "/projects" },
    { name: "Speaking", href: "/speaking" },
    { name: "Uses", href: "/uses" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/kristianeboe",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/kristianeboe",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/kristianeboe",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/kristianeboe",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-0 overflow-hidden bg-[#101816] px-6 pt-16 pb-8 text-[#FAF6EE] sm:pt-20 sm:pb-10 lg:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="grid grid-cols-1 gap-12 border-b border-white/12 pb-12 sm:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.1em] text-[#C88468] uppercase">
              <span className="grid size-8 place-items-center rounded-[7px] bg-[#FAF6EE] font-serif text-sm font-semibold tracking-normal text-[#101816] lowercase">
                kb
              </span>
              Kristian Elset Bø · Oslo, Norway
            </div>
            <p className="mt-7 max-w-xl text-3xl leading-[1.08] font-medium tracking-[-0.035em] text-[#FAF6EE] sm:text-5xl">
              Building useful software, then going somewhere worth writing
              about.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-[#C88468] px-5 py-2.5 text-sm font-semibold text-[#101816] transition hover:bg-[#D79578]"
            >
              Start a conversation →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <nav aria-label="Footer">
              <div className="font-mono text-[10px] tracking-[0.1em] text-[#C88468] uppercase">
                Explore
              </div>
              <ul className="mt-5 space-y-3">
                {footerNavigation.site.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#FAF6EE]/68 transition hover:text-[#FAF6EE]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-[#C88468] uppercase">
                Elsewhere
              </div>
              <ul className="mt-5 space-y-3">
                {footerNavigation.social.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2.5 text-sm text-[#FAF6EE]/68 transition hover:text-[#FAF6EE]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="size-4 text-[#FAF6EE]/45 transition group-hover:text-[#C88468]"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 font-mono text-[9px] tracking-[0.08em] text-[#FAF6EE]/38 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Kristian Elset Bø</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-[#FAF6EE]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[#FAF6EE]">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mx-2 mt-7 text-center text-[clamp(3.4rem,12vw,13rem)] leading-[0.82] font-semibold tracking-[-0.085em] whitespace-nowrap select-none sm:mt-10"
      >
        {/* px extends the background-paint box so the negative tracking
            doesn't leave the last glyph's ink outside it (bg-clip-text) */}
        <span className="bg-linear-to-b from-[#FAF6EE] via-[#BFC3B9] to-[#41504C] bg-clip-text px-[0.1em] text-transparent">
          kristianeboe
        </span>
      </div>
    </footer>
  );
}
