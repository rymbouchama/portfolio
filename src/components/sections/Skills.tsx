import type { CSSProperties } from "react";
import { BinaryRain } from "@/components/BinaryRain";
import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import { TechLogo } from "@/components/ui/TechLogo";
import { skillRows, type TechKey } from "@/content/tech";
import type { Dictionary } from "@/i18n/dictionaries";

// Each set is repeated so the row is wide enough to loop seamlessly on large screens.
const REPEAT = 4;

/**
 * The track holds two identical halves (translateX -50% loops seamlessly). Only the first
 * occurrence of each logo is exposed to assistive tech; the copies are marked data-clone,
 * which the reduced-motion CSS also hides to leave a static, wrapped row.
 */
function LogoSet({ items, clone = false }: { items: TechKey[]; clone?: boolean }) {
  const repeated = Array.from({ length: REPEAT }, () => items).flat();
  return (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={clone || undefined} data-clone={clone || undefined}>
      {repeated.map((id, i) => (
        <li
          key={`${id}-${i}`}
          aria-hidden={!clone && i >= items.length ? true : undefined}
          data-clone={!clone && i >= items.length ? true : undefined}
        >
          <TechLogo
            id={id}
            size={30}
            showLabel
            className="rounded-2xl border border-line bg-surface/80 px-5 py-3.5 backdrop-blur-sm"
          />
        </li>
      ))}
    </ul>
  );
}

export function Skills({ t }: { t: Dictionary }) {
  return (
    // "ink" keeps this section dark in both themes, with the binary rain behind it.
    <section id="skills" aria-labelledby="skills-title" className="ink relative isolate overflow-hidden py-20 sm:py-24">
      <BinaryRain className="-z-10" />
      <div className={container}>
        <SectionHeading id="skills-title" eyebrow={t.skills.eyebrow} title={t.skills.title} center />
      </div>

      <div className="space-y-8">
        {skillRows.map((row, i) => (
          <Reveal key={row.key} delay={i * 0.05}>
            <h3 className="mb-3 text-center text-sm font-semibold tracking-[0.14em] text-muted uppercase">
              {t.skills.categories[row.key]}
            </h3>
            <div className="marquee overflow-hidden">
              <div
                className="marquee-track flex w-max"
                data-reverse={i % 2 === 1}
                style={{ "--marquee-duration": `${36 + i * 4}s` } as CSSProperties}
              >
                <LogoSet items={row.items} />
                <LogoSet items={row.items} clone />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
