import { Reveal } from "./Reveal";

type Props = { id: string; eyebrow: string; title: string; center?: boolean };

export function SectionHeading({ id, eyebrow, title, center = false }: Props) {
  return (
    <Reveal className={`mb-10 sm:mb-14 ${center ? "text-center" : ""}`}>
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-link uppercase">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
