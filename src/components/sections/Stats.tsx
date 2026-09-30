import { Reveal } from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

export function Stats({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="stats-title" className="border-y border-line bg-bg-deep">
      <h2 id="stats-title" className="sr-only">
        {t.stats.title}
      </h2>
      <dl className={`${container} grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-12`}>
        {t.stats.items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.05} className="flex flex-col-reverse gap-1 border-l-2 border-link/60 pl-4">
            <dt className="text-sm text-muted">{item.label}</dt>
            <dd className="font-heading text-3xl font-bold tabular-nums sm:text-4xl">
              <span className="text-gradient">{item.value}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
