import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

export function Journey({ t }: { t: Dictionary }) {
  return (
    <section id="journey" aria-labelledby="journey-title" className="bg-bg-deep py-20 sm:py-24">
      <div className={container}>
        <SectionHeading id="journey-title" eyebrow={t.journey.eyebrow} title={t.journey.title} />

        <ol className="relative ml-3 border-l-2 border-line sm:ml-[7.5rem]">
          {t.journey.years.map((y, i) => (
            <Reveal as="li" key={y.year} delay={i * 0.05} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className="bg-btn absolute top-1.5 -left-[9px] size-4 rounded-full ring-4 ring-bg-deep"
              />
              <h3 className="font-heading text-2xl font-bold tabular-nums sm:absolute sm:top-0 sm:-left-[7.5rem] sm:w-24 sm:text-right">
                <span className="text-gradient">{y.year}</span>
              </h3>
              <ul className="mt-3 space-y-2 sm:mt-0">
                {y.items.map((item) => (
                  <li key={item} className="card px-4 py-3 text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
