import type { CSSProperties } from "react";
import { Database } from "lucide-react";
import { tech, type TechKey } from "@/content/tech";

type Props = {
  id: TechKey;
  size?: number;
  /** Show the name next to the logo (otherwise it is kept for screen readers only). */
  showLabel?: boolean;
  className?: string;
};

export function TechLogo({ id, size = 24, showLabel = false, className = "" }: Props) {
  const t = tech[id];
  const style = { "--brand-light": t.light, "--brand-dark": t.dark } as CSSProperties;

  return (
    <span className={`logo inline-flex items-center gap-2.5 ${className}`} style={style} title={t.title}>
      {t.path ? (
        <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
          <path d={t.path} />
        </svg>
      ) : (
        <Database width={size} height={size} aria-hidden="true" />
      )}
      <span className={showLabel ? "text-sm font-medium text-fg" : "sr-only"}>{t.title}</span>
    </span>
  );
}
