/**
 * Abstract image-analysis illustration: a scanned circular zone, a detection frame and a
 * generic prediction label. Deliberately schematic — no medical image and no real data.
 */
export function DermoscanArt({ label }: { label: string }) {
  const corner = "M0 12V0h12";
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={label} className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="ds-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B6BFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <radialGradient id="ds-shape" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5B6BFF" stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id="ds-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8C98FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#8C98FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8C98FF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ds-clip">
          <circle cx="160" cy="90" r="54" />
        </clipPath>
      </defs>

      {/* Measurement grid */}
      <g stroke="var(--border)" strokeWidth="0.6">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="180" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="320" y2={i * 20} />
        ))}
      </g>

      {/* Rotating dashed ring around the scanned zone */}
      <circle cx="160" cy="90" r="66" fill="none" stroke="url(#ds-stroke)" strokeWidth="1.5" strokeDasharray="4 7" className="art-spin" />
      <circle cx="160" cy="90" r="54" fill="var(--surface)" fillOpacity="0.5" stroke="var(--link)" strokeOpacity="0.5" />

      {/* Abstract shape and scan line, clipped to the zone */}
      <g clipPath="url(#ds-clip)">
        <path
          d="M140 72c10-14 34-12 42 2 9 15 4 32-12 38-15 6-35 1-38-14-2-9 2-18 8-26z"
          fill="url(#ds-shape)"
          className="art-pop"
          style={{ animationDelay: "0.2s" }}
        />
        <g className="art-scan">
          <rect x="100" y="86" width="120" height="8" fill="url(#ds-scan)" />
        </g>
      </g>

      {/* Crosshair ticks */}
      <g stroke="var(--link)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="160" y1="16" x2="160" y2="26" />
        <line x1="160" y1="154" x2="160" y2="164" />
        <line x1="86" y1="90" x2="96" y2="90" />
        <line x1="224" y1="90" x2="234" y2="90" />
      </g>

      {/* Detection frame corners */}
      <g fill="none" stroke="url(#ds-stroke)" strokeWidth="2.5" strokeLinecap="round" className="art-pop" style={{ animationDelay: "0.6s" }}>
        <path d={corner} transform="translate(128 60)" />
        <path d={corner} transform="translate(194 60) scale(-1 1)" />
        <path d={corner} transform="translate(128 122) scale(1 -1)" />
        <path d={corner} transform="translate(194 122) scale(-1 -1)" />
      </g>

      {/* Generic prediction label */}
      <g className="art-pop" style={{ animationDelay: "0.9s" }}>
        <line x1="194" y1="60" x2="210" y2="44" stroke="var(--link)" strokeWidth="1.2" />
        <rect x="210" y="32" width="94" height="22" rx="11" fill="url(#ds-stroke)" />
        <text x="257" y="47" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="#fff">
          label: class_A
        </text>
      </g>
    </svg>
  );
}
