import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { BinaryRain } from "@/components/BinaryRain";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionHeading";
import { contact, CV_FILENAME, CV_PATH } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { findImageAnyExt } from "@/lib/images";

export function Hero({ t }: { t: Dictionary }) {
  const photo = findImageAnyExt("photo");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Binary rain only when the page is dark */}
      <BinaryRain darkOnly className="-z-10 opacity-70" />
      <div aria-hidden="true" className="dot-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" />

      <div className={`${container} grid items-center gap-12 pt-10 pb-16 sm:pt-16 md:grid-cols-[1.15fr_1fr] md:pb-24`}>
        <Reveal className="order-2 md:order-1">
          <p className="mb-5 inline-flex rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-semibold tracking-wider text-link uppercase backdrop-blur">
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" className="text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
            <span className="block text-2xl font-medium text-muted sm:text-3xl">{t.hero.hello}</span>
            <span className="text-gradient">{t.hero.name}</span>
          </h1>
          <p className="mt-4 font-heading text-xl font-semibold sm:text-2xl">{t.hero.role}</p>
          <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">{t.hero.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="bg-btn inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-[filter] hover:brightness-110"
            >
              {t.hero.ctaProjects}
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface/70 px-6 font-semibold backdrop-blur transition-colors hover:border-link"
            >
              <Download aria-hidden="true" className="size-4" />
              {t.cv.download}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub ${t.a11y.newTab}`}
              className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <GithubIcon />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`LinkedIn ${t.a11y.newTab}`}
              className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <LinkedinIcon />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-square w-60 sm:w-72 lg:w-[22rem]">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
            <div aria-hidden="true" className="bg-btn absolute inset-0 rounded-full opacity-90" />
            <div className="absolute inset-[4px] overflow-hidden rounded-full bg-surface">
              {photo ? (
                <Image
                  src={photo.src}
                  alt={t.hero.photoAlt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 288px, 240px"
                  // Framed on the face: anchored at the top and slightly zoomed at display time only.
                  className="origin-[50%_18%] scale-[1.35] object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-heading text-6xl font-bold text-gradient">RB</div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
