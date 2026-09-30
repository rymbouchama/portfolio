import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Education } from "@/components/sections/Education";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Leadership } from "@/components/sections/Leadership";
import { Profile } from "@/components/sections/Profile";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Stats } from "@/components/sections/Stats";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:font-semibold"
      >
        {t.a11y.skip}
      </a>
      <Header lang={lang} t={t} />
      <main id="main">
        <Hero t={t} />
        <Stats t={t} />
        <Education t={t} />
        <Profile t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Research t={t} />
        <Journey t={t} />
        <Leadership t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
