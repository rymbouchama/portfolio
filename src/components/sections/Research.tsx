import { BookOpen, FileText } from "lucide-react";
import { Cover } from "@/components/ui/Cover";
import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";
import { findImageAnyExt } from "@/lib/images";

export function Research({ t }: { t: Dictionary }) {
  const cosi = findImageAnyExt("cosi-2026");
  const [thesis, paper] = t.research.items;

  return (
    <section id="research" aria-labelledby="research-title" className="py-20 sm:py-24">
      <div className={container}>
        <SectionHeading id="research-title" eyebrow={t.research.eyebrow} title={t.research.title} />

        <ul className="grid gap-5 md:grid-cols-2">
          <Reveal as="li" className="card card-hover flex flex-col p-6 sm:p-7">
            <span className="bg-btn mb-5 inline-flex size-12 items-center justify-center rounded-2xl text-white">
              <BookOpen aria-hidden="true" className="size-6" />
            </span>
            <p className="text-sm font-semibold text-link">{thesis.kind}</p>
            <h3 className="mt-2 text-xl font-semibold">{thesis.title}</h3>
            <p className="mt-3 text-muted">{thesis.text}</p>
          </Reveal>

          <Reveal as="li" delay={0.06} className="card card-hover flex flex-col p-3">
            <Cover
              image={cosi}
              alt={paper.imageAlt ?? ""}
              ratio="video"
              fit="contain"
              sizes="(min-width: 768px) 540px, 100vw"
              placeholder={t.placeholder}
            />
            <div className="px-3 pt-5 pb-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-link">
                <FileText aria-hidden="true" className="size-4" />
                {paper.kind}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{paper.title}</h3>
              <p className="mt-3 text-muted">{paper.text}</p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
