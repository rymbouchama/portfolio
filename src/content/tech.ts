import {
  siDart,
  siFastapi,
  siFirebase,
  siFlutter,
  siGit,
  siJavascript,
  siLinux,
  siMediapipe,
  siNextdotjs,
  siNumpy,
  siPandas,
  siPytorch,
  siPython,
  siRaspberrypi,
  siReact,
  siScikitlearn,
  siTensorflow,
} from "simple-icons";

export type Tech = {
  title: string;
  /** SVG path on a 24×24 viewBox; null means a generic glyph is drawn instead. */
  path: string | null;
  /** Brand colour for the light and dark themes (very dark brand colours are lifted on dark). */
  light: string;
  dark: string;
};

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function fromIcon(icon: { title: string; path: string; hex: string }): Tech {
  const light = `#${icon.hex}`;
  // Keep at least ~3:1 against the dark background (#0A0E1F).
  const dark = luminance(icon.hex) < 0.09 ? "#E8EAF6" : light;
  return { title: icon.title, path: icon.path, light, dark };
}

export const tech = {
  python: fromIcon(siPython),
  javascript: fromIcon(siJavascript),
  dart: fromIcon(siDart),
  // Simple Icons and Devicon have no vendor-neutral SQL logo: a generic database glyph is used.
  sql: { title: "SQL", path: null, light: "#3F4ADB", dark: "#8C98FF" },
  pytorch: fromIcon(siPytorch),
  tensorflow: fromIcon(siTensorflow),
  scikitlearn: { ...fromIcon(siScikitlearn), title: "Scikit-learn" },
  mediapipe: fromIcon(siMediapipe),
  flutter: fromIcon(siFlutter),
  react: fromIcon(siReact),
  fastapi: fromIcon(siFastapi),
  firebase: fromIcon(siFirebase),
  pandas: fromIcon(siPandas),
  numpy: fromIcon(siNumpy),
  git: fromIcon(siGit),
  linux: fromIcon(siLinux),
  nextjs: fromIcon(siNextdotjs),
  raspberrypi: fromIcon(siRaspberrypi),
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof tech;

export const skillRows: { key: "programming" | "ai" | "web" | "data"; items: TechKey[] }[] = [
  { key: "programming", items: ["python", "javascript", "dart", "sql"] },
  { key: "ai", items: ["pytorch", "tensorflow", "scikitlearn", "mediapipe"] },
  { key: "web", items: ["flutter", "react", "fastapi", "firebase"] },
  { key: "data", items: ["pandas", "numpy", "git", "linux"] },
];
