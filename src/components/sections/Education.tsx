import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

export function Education({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="education-title" className="py-20 sm:py-24">
      <div className={container}>
        <SectionHeading id="education-title" eyebrow={t.education.eyebrow} title={t.education.title} />
        <ul className="grid gap-5 md:grid-cols-2">
          {t.education.items.map((item, i) => (
            <Reveal as="li" key={item.degree} delay={i * 0.06} className="card card-hover flex gap-4 p-6 sm:p-7">
              <span className="bg-btn inline-flex size-12 shrink-0 items-center justify-center rounded-2xl text-white">
                <GraduationCap aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-link tabular-nums">{item.date}</p>
                <h3 className="mt-1 text-lg font-semibold sm:text-xl">{item.degree}</h3>
                <p className="mt-1 text-muted">{item.school}</p>
                {item.note && <p className="mt-3 border-t border-line pt-3 text-sm text-muted">{item.note}</p>}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
