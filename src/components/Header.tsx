"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { CV_FILENAME, CV_PATH } from "@/content/site";
import { Watermelon } from "@/components/ui/Watermelon";
import { LOCALE_COOKIE, locales, type Dictionary, type Locale } from "@/i18n/dictionaries";

const sections = ["about", "projects", "skills", "research", "journey", "contact"] as const;

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-surface-2"
    >
      {/* Both icons are rendered and swapped with CSS, so the server markup never mismatches. */}
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" />
      <Moon aria-hidden="true" className="size-[18px] dark:hidden" />
    </button>
  );
}

function LangToggle({ lang, label }: { lang: Locale; label: string }) {
  const remember = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <nav aria-label={label} className="flex items-center rounded-full border border-line p-0.5 text-sm font-semibold">
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          onClick={() => remember(l)}
          aria-current={l === lang ? "true" : undefined}
          className={`inline-flex min-h-9 min-w-10 items-center justify-center rounded-full px-2.5 uppercase transition-colors ${
            l === lang ? "bg-btn text-white" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </a>
      ))}
    </nav>
  );
}

export function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="mr-auto flex items-center gap-2.5">
          <a href="#top" className="font-heading text-lg font-bold tracking-tight">
            <span className="text-gradient">R</span>ym<span className="text-link">.</span>
          </a>
          <Watermelon label={t.a11y.palestine} />
        </div>

        <nav aria-label={t.a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((s) => (
              <li key={s}>
                <a href={`#${s}`} className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
                  {t.nav[s]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LangToggle lang={lang} label={t.a11y.language} />
        <ThemeToggle label={t.a11y.theme} />

        <a
          href={CV_PATH}
          download={CV_FILENAME}
          aria-label={t.cv.download}
          className="bg-btn inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-[filter] hover:brightness-110 sm:px-4"
        >
          <Download aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">{t.cv.download}</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line lg:hidden"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t.a11y.primaryNav} className="border-t border-line lg:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base text-fg hover:bg-surface-2"
                >
                  {t.nav[s]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
