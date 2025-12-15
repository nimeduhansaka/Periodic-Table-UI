"use client";
import { motion } from "framer-motion";
import { ATOMIC_MASS_BY_SYMBOL } from "@/src/app/lib/categories";

export const GROUP_GRADIENTS = {
  alkali: "from-pink-500 to-rose-500",
  alkaline: "from-orange-500 to-amber-500",
  lanthanoid: "from-yellow-500 to-lime-500",
  actinoid: "from-lime-500 to-green-500",
  transition: "from-emerald-500 to-teal-500",
  postTransition: "from-cyan-500 to-sky-500",
  metalloid: "from-sky-500 to-indigo-500",
  halogen: "from-violet-500 to-fuchsia-500",
  noble: "from-fuchsia-500 to-pink-500",
  nonmetal: "from-slate-500 to-zinc-500",
};

export default function ElementCard({ el, onClick, variant = "square" }) {
  const color = GROUP_GRADIENTS[el.group] || "from-slate-600 to-zinc-600";
  const fallbackMass = ATOMIC_MASS_BY_SYMBOL[el.symbol];
  const atomicMassValue =
    el.atomic_mass ?? el.atomicMass ?? el.mass ?? el.weight ?? fallbackMass ?? null;
  const atomicMass =
    atomicMassValue != null && !Number.isNaN(Number(atomicMassValue))
      ? Number(atomicMassValue).toFixed(2)
      : "—";
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(el)}
      className={`relative w-full min-w-0 rounded-lg bg-gradient-to-br ${color} p-[1.5px] shadow-sm ${
        variant === "list" ? "h-16" : "aspect-square"
      }`}
    >
      <div className={`flex h-full w-full ${variant === 'list' ? 'flex-row items-center px-4 gap-4' : 'flex-col justify-between p-1.5'} rounded-[9px] bg-neutral-950 text-left ring-1 ring-white/10`}>
        {variant === "list" ? (
           <>
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 font-bold text-white">
                {el.symbol}
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{el.name}</span>
                <span className="text-xs text-white/50">Atomic Number: {el.number}</span>
             </div>
             <div className="ml-auto text-xs font-medium text-white/40">
                {atomicMass}
             </div>
           </>
        ) : (
          <>
            <div className="flex items-center justify-between text-[9px] font-semibold text-white/60">
              <span>{el.number}</span>
              <span className="text-[8px] font-medium text-white/50">{atomicMass}</span>
            </div>
            <div className="min-w-0">
              <div className="text-lg font-extrabold leading-none tracking-tight text-white">{el.symbol}</div>
              <div className="mt-0.5 truncate text-[9px] text-white/50" title={el.name}>{el.name}</div>
            </div>
          </>
        )}
      </div>
    </motion.button>
  );
}
