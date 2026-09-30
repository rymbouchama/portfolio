import type { CSSProperties } from "react";

// The 21 MediaPipe Hands landmarks of an open right hand (0 = wrist), on a 200×200 grid.
const LANDMARKS: [number, number][] = [
  [100, 180],
  [72, 165], [52, 145], [40, 122], [30, 102],
  [78, 110], [72, 80], [68, 58], [65, 38],
  [100, 105], [100, 72], [100, 48], [100, 26],
  [120, 110], [125, 80], [128, 58], [131, 40],
  [138, 120], [148, 98], [155, 82], [161, 66],
];

// MediaPipe HAND_CONNECTIONS
const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

const ROWS = 21; // one row per landmark
const COLS = 40; // one column per frame

// Deterministic, smooth "ST-Map" intensities (purely decorative, not real data).
function intensity(r: number, c: number) {
  const v = Math.sin(r * 0.7 + c * 0.32) * Math.cos(c * 0.18 - r * 0.21);
  return 0.08 + 0.42 * ((v + 1) / 2);
}

const delay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

export function SignLanguageArt({ label }: { label: string }) {
  const cellW = 320 / COLS;
  const cellH = 180 / ROWS;

  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={label} className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="sl-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B6BFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <radialGradient id="sl-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </radialGradient>
        <mask id="sl-mask">
          <rect width="320" height="180" fill="#fff" />
          <rect width="320" height="180" fill="url(#sl-fade)" opacity="0.6" />
        </mask>
      </defs>

      {/* ST-Map style grid: rows = landmarks, columns = time */}
      <g className="text-link" fill="currentColor" mask="url(#sl-mask)">
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * cellW + 0.6}
              y={r * cellH + 0.6}
              width={cellW - 1.2}
              height={cellH - 1.2}
              rx="1"
              opacity={intensity(r, c)}
            />
          )),
        )}
      </g>

      {/* Hand skeleton */}
      <g transform="translate(74 -3) scale(0.9)">
        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            x1={LANDMARKS[a][0]}
            y1={LANDMARKS[a][1]}
            x2={LANDMARKS[b][0]}
            y2={LANDMARKS[b][1]}
            pathLength={1}
            stroke="url(#sl-stroke)"
            strokeWidth="3"
            strokeLinecap="round"
            className="art-draw"
            style={delay(i * 0.06)}
          />
        ))}
        {LANDMARKS.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 0 ? 5.5 : 4.2}
            fill="var(--surface)"
            stroke="var(--link)"
            strokeWidth="2.2"
            className="art-pop"
            style={delay(1 + i * 0.03)}
          />
        ))}
      </g>
    </svg>
  );
}
