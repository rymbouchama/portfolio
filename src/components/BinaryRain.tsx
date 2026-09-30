"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Only draw when the page is in dark mode (for sections that follow the theme). */
  darkOnly?: boolean;
  className?: string;
};

const CELL = 18; // px between columns and rows
const TRAIL = 14; // glyphs per falling stream
const FPS = 16;

/**
 * Falling 0/1 digits drawn on a canvas behind a dark section. Decorative only:
 * paused off-screen and in background tabs, and a single static frame under reduced motion.
 */
export function BinaryRain({ darkOnly = false, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let heads: number[] = [];
    let speeds: number[] = [];
    let glyphs: string[][] = [];
    let raf = 0;
    let last = 0;
    let visible = false;

    const rgb = () => getComputedStyle(canvas).getPropertyValue("--rain").trim() || "140 152 255";
    const enabled = () => !darkOnly || root.classList.contains("dark");
    const randomBit = () => (Math.random() < 0.5 ? "0" : "1");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      heads = Array.from({ length: cols }, () => Math.floor(Math.random() * (rows + TRAIL)) - TRAIL);
      speeds = Array.from({ length: cols }, () => (Math.random() < 0.35 ? 2 : 1));
      glyphs = Array.from({ length: cols }, () => Array.from({ length: rows + TRAIL }, randomBit));
      draw();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      if (!enabled()) return;
      const color = rgb().split(/\s+/).join(",");
      ctx!.font = `500 13px ui-monospace, "Cascadia Code", Consolas, monospace`;
      ctx!.textAlign = "center";
      for (let c = 0; c < heads.length; c++) {
        const x = c * CELL + CELL / 2;
        for (let t = 0; t < TRAIL; t++) {
          const row = heads[c] - t;
          if (row < 0) continue;
          const y = row * CELL + CELL;
          if (y > height + CELL) continue;
          // Bright head, fading tail. Kept faint so text on top stays readable.
          const alpha = t === 0 ? 0.55 : 0.28 * (1 - t / TRAIL);
          ctx!.fillStyle = `rgba(${color},${alpha})`;
          ctx!.fillText(glyphs[c][row % glyphs[c].length], x, y);
        }
      }
    }

    function step() {
      const rows = Math.ceil(height / CELL);
      for (let c = 0; c < heads.length; c++) {
        heads[c] += speeds[c];
        if (heads[c] - TRAIL > rows && Math.random() < 0.08) {
          heads[c] = -Math.floor(Math.random() * 8);
          speeds[c] = Math.random() < 0.35 ? 2 : 1;
        }
        // Occasionally flip a digit for a subtle flicker.
        const g = glyphs[c];
        g[Math.floor(Math.random() * g.length)] = randomBit();
      }
      draw();
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      last = now;
      step();
    }

    function start() {
      if (raf || motionQuery.matches || !visible || document.hidden || !enabled()) return;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    function refresh() {
      stop();
      draw();
      start();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    // Theme switches toggle the "dark" class on <html>.
    const themeObserver = new MutationObserver(refresh);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", refresh);
    motionQuery.addEventListener("change", refresh);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      motionQuery.removeEventListener("change", refresh);
    };
  }, [darkOnly]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(180deg,transparent,#000_15%,#000_80%,transparent)] ${className}`}
    />
  );
}
