import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ImageInfo = { src: string; width: number; height: number };

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

/** Reads pixel dimensions from a PNG, JPEG or WebP header without decoding the file. */
function readSize(file: string): { width: number; height: number } | null {
  const buf = fs.readFileSync(file);
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: walk the markers until a SOF segment
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const length = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + length;
    }
    return null;
  }
  // WebP (VP8X / VP8 / VP8L)
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

/**
 * Returns the first candidate that exists in public/images (e.g. ["photo.jpg", "photo.png"]),
 * or null so the caller can render a placeholder instead of a broken image.
 */
export function findImage(...candidates: string[]): ImageInfo | null {
  for (const name of candidates) {
    const file = path.join(IMAGES_DIR, name);
    if (!fs.existsSync(file)) continue;
    const size = readSize(file);
    // The version changes whenever the file is replaced, so browser and optimizer caches never serve a stale image.
    const version = Math.floor(fs.statSync(file).mtimeMs).toString(36);
    if (size) return { src: `/images/${name}?v=${version}`, ...size };
  }
  return null;
}

/** Accepts .jpg / .jpeg / .png / .webp variants of a base name. */
export const findImageAnyExt = (base: string) =>
  findImage(`${base}.jpg`, `${base}.jpeg`, `${base}.png`, `${base}.webp`);
