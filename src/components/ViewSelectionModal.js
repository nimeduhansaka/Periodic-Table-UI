"use client";
import { useEffect, useState } from "react";
import { useViewMode } from "./ViewModeContext";
import { motion, AnimatePresence } from "motion/react";

export default function ViewSelectionModal() {
  const { isMobile, userPreference, setUserPreference } = useViewMode();
  
  // Only show if mobile and no preference set yet
  const visible = isMobile && userPreference === null;

  const handleSelect = (mode) => {
    setUserPreference(mode);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl"
          >
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-white">Choose Your View</h2>
              <p className="mt-2 text-white/60">
                Select how you would like to explore the periodic table on your device.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => handleSelect("mobile")}
                  className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:border-white/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 group-hover:text-emerald-300 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">Mobile Optimized</div>
                    <div className="text-xs text-white/50 mt-1">Vertical list view</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelect("desktop")}
                  className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:border-white/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 group-hover:text-blue-300 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" ry="2" />
                      <line x1="8" x2="16" y1="21" y2="21" />
                      <line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">Desktop View</div>
                    <div className="text-xs text-white/50 mt-1">Full grid layout</div>
                  </div>
                </button>
              </div>

              <p className="mt-6 text-xs text-white/40">
                You can rotate your device to switch views automatically.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
