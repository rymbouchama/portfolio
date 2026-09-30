import { Cover } from "@/components/ui/Cover";
import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";
import { findImageAnyExt } from "@/lib/images";

const IMAGES = ["biovatech", "techwaves"];

export function Leadership({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="leadership-title" className="py-20 sm:py-24">
      <div className={container}>
        <SectionHeading id="leadership-title" eyebrow={t.leadership.eyebrow} title={t.leadership.title} />
        <ul className="grid gap-5 md:grid-cols-2">
          {t.leadership.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.06} className="card card-hover flex flex-col p-3">
              <Cover
                image={findImageAnyExt(IMAGES[i])}
                alt={item.imageAlt}
                ratio="photo"
                sizes="(min-width: 768px) 540px, 100vw"
                placeholder={t.placeholder}
              />
              <div className="px-3 pt-5 pb-3">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-link">{item.role}</p>
                <p className="mt-3 text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
