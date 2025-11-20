"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CategoryFilter from "@/src/components/category-filter";
import BlurText from "../components/BlurText";
import { BlurFade } from "@/src/components/ui/blur-fade"
import CubeLoader from "@/src/components/CubeLoader";

const PeriodicGrid = dynamic(() => import("@/src/components/PeriodicGrid"), { ssr: false });

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const MENDELEEV_QUOTES = [
  "\"There exists everywhere a medium in things, determined by equilibrium.\"",
  "\"There is nothing in this world that I fear to say.\"",
  "\"Certain characteristic properties of elements can be foretold from their atomic weights.\"",
  "\"Work,look for peace and calm in work, you will find it nowhere else.\"",
  "\"The elements which are the most widely diffused have small atomic weights.\""
];

const MIN_LOADER_DURATION_MS = 1500;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setIsPageLoading(false), MIN_LOADER_DURATION_MS);
    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((prev) => {
        if (MENDELEEV_QUOTES.length < 2) return prev;
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * MENDELEEV_QUOTES.length);
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(id);
  }, []);

  if (isPageLoading) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <CubeLoader />
        </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-black text-white">
      <div className="magic-grid-pattern" aria-hidden />
      <main className="relative mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>

            {/*<h1 className="text-3xl font-bold tracking-tight">Periodic Table</h1>*/}

            <BlurText
                text="Periodic Table"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-6xl font-bold tracking-tight"
            />

            <p className="mt-1 text-sm text-white/60">
              Refined animated tableau revealing element details and community notes.
            </p>
          </div>

          <BlurFade>
          <div
            className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 sm:max-w-xs cursor-help"
            title="Father of Periodic Table"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Dmitri Mendeleev</span>
            <p className="italic text-sm leading-snug text-white/70 transition-opacity duration-500">
              {MENDELEEV_QUOTES[quoteIndex]}
            </p>
          </div>
          </BlurFade>

        </header>

        <div className="mb-6">
          <CategoryFilter onChange={setSelectedCategory} />
        </div>

        <PeriodicGrid selectedCategory={selectedCategory} />
      </main>
    </div>
  );
}
