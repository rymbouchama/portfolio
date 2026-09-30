import Image from "next/image";
import { DermoscanArt } from "@/components/art/DermoscanArt";
import { SignLanguageArt } from "@/components/art/SignLanguageArt";
import { Cover } from "@/components/ui/Cover";
import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import { TechLogo } from "@/components/ui/TechLogo";
import { projects, type ProjectMeta } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { findImageAnyExt } from "@/lib/images";
import { Featured } from "./Featured";

const CARD_SIZES = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw";

function ProjectCard({ meta, t, index }: { meta: ProjectMeta; t: Dictionary; index: number }) {
  const copy = t.projects.items[meta.id];
  const image = meta.cover.map(findImageAnyExt).find(Boolean) ?? null;
  const inset = meta.inset ? findImageAnyExt(meta.inset) : null;
  const insetAlt = "altInset" in copy ? copy.altInset : "";
  const usesArt = !image && meta.art;

  const art =
    meta.art === "signLanguage" ? (
      <SignLanguageArt label={copy.alt} />
    ) : meta.art === "dermoscan" ? (
      <DermoscanArt label={copy.alt} />
    ) : undefined;

  return (
    <Reveal as="li" delay={(index % 3) * 0.06} className="card card-hover flex flex-col overflow-hidden p-3">
      <Cover image={image} alt={copy.alt} sizes={CARD_SIZES} placeholder={t.placeholder} fallback={art}>
        {usesArt && (
          <span className="absolute top-3 left-3 rounded-full border border-line bg-surface/85 px-2.5 py-1 text-xs font-medium backdrop-blur">
            {t.projects.illustration}
          </span>
        )}
        {inset && (
          // Mobile screenshot shown whole (never cropped), inset in the cover.
          <div className="absolute right-3 bottom-3 h-[62%] overflow-hidden rounded-lg border-2 border-white/80 shadow-xl shadow-black/30">
            <Image
              src={inset.src}
              alt={insetAlt}
              width={inset.width}
              height={inset.height}
              sizes="140px"
              className="h-full w-auto object-contain"
            />
          </div>
        )}
      </Cover>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className="text-sm font-semibold text-link tabular-nums">{copy.date}</p>
        <h4 className="mt-1 font-heading text-xl font-semibold">{copy.title}</h4>
        <p className="text-sm font-medium text-muted">{copy.subtitle}</p>

        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-link">
          {copy.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {meta.stack.map((id) => (
            <TechLogo key={id} id={id} size={18} showLabel className="rounded-full border border-line px-2.5 py-1" />
          ))}
          {copy.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Projects({ t }: { t: Dictionary }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-bg-deep py-20 sm:py-24">
      <div className={container}>
        <SectionHeading id="projects-title" eyebrow={t.projects.eyebrow} title={t.nav.projects} />
        <Featured t={t} />

        <h3 className="mt-16 mb-8 text-2xl font-bold sm:text-3xl">{t.projects.title}</h3>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((meta, i) => (
            <ProjectCard key={meta.id} meta={meta} t={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
