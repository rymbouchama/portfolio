/** Cut watermelon slice, used as a symbol of support for Palestine. */
export function Watermelon({ label, size = 26 }: { label: string; size?: number }) {
  return (
    <span role="img" aria-label={label} title={label} className="inline-flex">
      <svg viewBox="0 0 32 20" width={size} height={(size * 20) / 32} aria-hidden="true">
        {/* rind, white band, flesh: nested half-discs */}
        <path d="M1 2a15 15 0 0 0 30 0Z" fill="#149954" />
        <path d="M3.2 2a12.8 12.8 0 0 0 25.6 0Z" fill="#F4F4F4" />
        <path d="M4.6 2a11.4 11.4 0 0 0 22.8 0Z" fill="#E4312B" />
        {/* seeds */}
        <g fill="#111">
          <ellipse cx="10.5" cy="6" rx="0.9" ry="1.4" transform="rotate(-20 10.5 6)" />
          <ellipse cx="16" cy="8.6" rx="0.9" ry="1.4" />
          <ellipse cx="21.5" cy="6" rx="0.9" ry="1.4" transform="rotate(20 21.5 6)" />
          <ellipse cx="13" cy="11.5" rx="0.8" ry="1.3" transform="rotate(-10 13 11.5)" />
          <ellipse cx="19" cy="11.5" rx="0.8" ry="1.3" transform="rotate(10 19 11.5)" />
        </g>
      </svg>
    </span>
  );
}
