import type { TechKey } from "./tech";

// TODO: replace public/cv/Bouchama_Rym_Ines.pdf with the updated CV (the current file is outdated).
export const CV_PATH = "/cv/Bouchama_Rym_Ines.pdf";
export const CV_FILENAME = "Bouchama_Rym_Ines_CV.pdf";

export const contact = {
  email: "bouchamarymines@gmail.com",
  github: "https://github.com/rymbouchama",
  linkedin: "https://www.linkedin.com/in/rym-bouchama",
};

export type ProjectId = "signLanguage" | "sawtna" | "captainTrend" | "mlas" | "dermoscan";

export type ProjectMeta = {
  id: ProjectId;
  /** Base names looked up in public/images (any extension). The first found is the cover. */
  cover: string[];
  /** Optional secondary image shown inset in the cover (e.g. a mobile screenshot). */
  inset?: string;
  /** Drawn fallback when no screenshot exists. */
  art?: "signLanguage" | "dermoscan";
  /** Only technologies explicitly named in the CV. */
  stack: TechKey[];
};

// Most recent first.
export const projects: ProjectMeta[] = [
  { id: "signLanguage", cover: ["sign-language-1"], art: "signLanguage", stack: ["mediapipe"] },
  { id: "sawtna", cover: ["sawtna-1"], inset: "sawtna-2", stack: ["flutter"] },
  { id: "captainTrend", cover: ["captain-trend"], stack: [] },
  { id: "mlas", cover: ["mlas"], stack: [] },
  { id: "dermoscan", cover: ["dermoscan-1"], art: "dermoscan", stack: [] },
];

export const featuredStack: TechKey[] = ["python", "fastapi", "nextjs", "raspberrypi"];
