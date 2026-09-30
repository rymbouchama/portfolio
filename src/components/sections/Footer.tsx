import { ArrowUp, Download, Mail } from "lucide-react";
import { BinaryRain } from "@/components/BinaryRain";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionHeading";
import { contact, CV_FILENAME, CV_PATH } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ t }: { t: Dictionary }) {
  const f = t.footer;
  const linkClass =
    "flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface/80 px-5 py-3 backdrop-blur-sm transition-colors hover:border-link";

  return (
    // "ink" keeps the footer dark in both themes, with the binary rain behind it.
    <footer id="contact" aria-labelledby="contact-title" className="ink relative isolate overflow-hidden">
      <BinaryRain className="-z-10" />
      <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 h-80 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />

      <div className={`${container} py-20 sm:py-28`}>
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-link uppercase">{f.eyebrow}</p>
          <h2 id="contact-title" className="text-5xl font-bold sm:text-7xl">
            <span className="text-gradient">{f.title}</span>
          </h2>
          <p className="mt-5 text-lg text-muted">{f.text}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <li className="sm:col-span-2 lg:col-span-2">
              <a href={`mailto:${contact.email}`} className={linkClass}>
                <Mail aria-hidden="true" className="size-5 shrink-0 text-link" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{f.email}</span>
                  <span className="block text-sm font-medium [overflow-wrap:anywhere]">{contact.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noreferrer" className={linkClass}>
                <GithubIcon className="shrink-0 text-link" />
                <span className="font-medium">GitHub</span>
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                <LinkedinIcon className="shrink-0 text-link" />
                <span className="font-medium">LinkedIn</span>
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </li>
            <li>
              <a href={CV_PATH} download={CV_FILENAME} className={linkClass}>
                <Download aria-hidden="true" className="size-5 shrink-0 text-link" />
                <span className="font-medium">{f.cvLink}</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-muted`}>
          <p>
            © {new Date().getFullYear()} Rym Ines Bouchama. {f.rights}
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 hover:text-fg">
            <ArrowUp aria-hidden="true" className="size-4" />
            {f.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
