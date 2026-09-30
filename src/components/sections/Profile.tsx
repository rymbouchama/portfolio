import { ArrowUpRight, BookOpen, Brain, Languages, Mail, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { container, SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";

function Block({
  icon,
  title,
  children,
  className = "",
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={`card card-hover flex flex-col p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-2 text-link">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </Reveal>
  );
}

export function Profile({ t }: { t: Dictionary }) {
  const p = t.profile;
  const iconClass = "size-5";

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-24">
      <div className={container}>
        <SectionHeading id="about-title" eyebrow={p.eyebrow} title={p.title} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Block
            icon={<Sparkles aria-hidden="true" className={iconClass} />}
            title={p.about.title}
            className="relative overflow-hidden sm:col-span-2 lg:row-span-2"
          >
            <div aria-hidden="true" className="absolute -right-16 -bottom-16 size-56 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
            <p className="relative text-base text-muted sm:text-lg">{p.about.text}</p>
            <p className="relative mt-auto pt-6 font-heading text-2xl font-semibold">
              <span className="text-gradient">{t.hero.role}</span>
            </p>
          </Block>

          <Block icon={<Brain aria-hidden="true" className={iconClass} />} title={p.focus.title} className="sm:col-span-2" delay={0.05}>
            <ul className="flex flex-wrap gap-2">
              {p.focus.items.map((item) => (
                <li key={item} className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={<Languages aria-hidden="true" className={iconClass} />} title={p.languages.title} delay={0.1}>
            <ul className="space-y-2">
              {p.languages.items.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{l.name}</span>
                  <span className="text-sm text-muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={<BookOpen aria-hidden="true" className={iconClass} />} title={p.research.title} delay={0.15}>
            <p className="text-muted">{p.research.text}</p>
          </Block>

          <Block icon={<Users aria-hidden="true" className={iconClass} />} title={p.leadership.title} className="sm:col-span-2" delay={0.05}>
            <p className="text-muted">{p.leadership.text}</p>
          </Block>

          <Reveal delay={0.1} className="sm:col-span-2">
            <a
              href={`mailto:${contact.email}`}
              className="bg-btn group flex h-full min-h-32 flex-col justify-between rounded-[1.25rem] p-6 text-white transition-[filter] hover:brightness-110"
            >
              <span className="flex items-center justify-between">
                <Mail aria-hidden="true" className="size-6" />
                <ArrowUpRight aria-hidden="true" className="size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span>
                <span className="block font-heading text-2xl font-semibold">{t.footer.title}</span>
                <span className="block text-sm [overflow-wrap:anywhere] text-white">{contact.email}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
