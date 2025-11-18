"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import CategoryFilter from "@/app/components/category-filter";

const PeriodicGrid = dynamic(() => import("@/app/components/PeriodicGrid"), { ssr: false });


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-black text-white">
      <div className="magic-grid-pattern" aria-hidden />
      <main className="relative mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Periodic Table</h1>
            <p className="mt-1 text-sm text-white/60">Minimalist, animated table with element details and user-contributed notes.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            Data sample for demo. Replace with a full dataset as needed.
          </div>
        </header>

        <div className="mb-6">
          <CategoryFilter onChange={setSelectedCategory} />
        </div>

        <PeriodicGrid selectedCategory={selectedCategory} />
      </main>
    </div>
  );
}
