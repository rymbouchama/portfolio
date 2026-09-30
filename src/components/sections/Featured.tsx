import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { Placeholder } from "@/components/ui/Cover";
import { Reveal } from "@/components/ui/Reveal";
import { TechLogo } from "@/components/ui/TechLogo";
import { featuredStack } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { findImageAnyExt } from "@/lib/images";

/**
 * Areas of aims-dms-dashboard.png that show identifying data (patient name, clinician
 * identity) or a diagnosis-like label. They are blurred at display time; the file is untouched.
 * Percentages of the 1187×451 screenshot.
 */
const MASKS = [
  { left: 1, top: 18.5, width: 16, height: 10.5 }, // clinician avatar, name and e-mail
  { left: 20.6, top: 25.4, width: 11, height: 6.6 }, // patient name
  { left: 52, top: 5.4, width: 18.2, height: 10.4 }, // state label
];
const SCREENSHOT_RATIO = "1187 / 451";

export function Featured({ t }: { t: Dictionary }) {
  const f = t.featured;
  const shot = findImageAnyExt("aims-dms-dashboard");
  const masksFit = shot?.width === 1187 && shot?.height === 451;

  return (
    <Reveal as="article" className="card relative overflow-hidden p-5 sm:p-8 lg:p-10">
      <div aria-hidden="true" className="absolute -top-32 -right-32 size-96 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-link uppercase">{f.eyebrow}</p>
          <h3 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">
            <span className="text-gradient">{f.title}</span>
          </h3>

          <ul className="mt-6 space-y-3">
            {f.points.map((point) => (
              <li key={point} className="flex gap-3 text-muted">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-link" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium">
            <ShieldCheck aria-hidden="true" className="size-4 text-link" />
            {f.disclaimer}
          </p>
        </div>

        <div>
          {/* 16:9 frame; the wide screenshot is shown whole, never cropped */}
          <div className="bg-cover relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-line p-3 sm:p-5">
            {shot ? (
              <figure className="w-full">
                <div className="relative w-full overflow-hidden rounded-xl shadow-2xl shadow-black/30" style={{ aspectRatio: masksFit ? SCREENSHOT_RATIO : `${shot.width} / ${shot.height}` }}>
                  <Image
                    src={shot.src}
                    alt={f.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 620px, 100vw"
                    className="object-contain"
                  />
                  {masksFit &&
                    MASKS.map((m, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className="absolute rounded-md bg-white/60 backdrop-blur-md"
                        style={{ left: `${m.left}%`, top: `${m.top}%`, width: `${m.width}%`, height: `${m.height}%` }}
                      />
                    ))}
                </div>
                {masksFit && <figcaption className="sr-only">{t.a11y.masked}</figcaption>}
              </figure>
            ) : (
              <Placeholder label={t.placeholder} />
            )}
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {f.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse rounded-2xl border border-line bg-surface-2 p-3 text-center">
                <dt className="text-xs text-muted">{m.label}</dt>
                <dd className="font-heading text-xl font-bold tabular-nums sm:text-2xl">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-sm font-semibold text-muted">{f.stack}</span>
            {featuredStack.map((id) => (
              <TechLogo key={id} id={id} size={22} showLabel />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
