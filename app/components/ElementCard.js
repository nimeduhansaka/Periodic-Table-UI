"use client";
import { motion } from "framer-motion";

const groupColors = {
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

export default function ElementCard({ el, onClick }) {
  const color = groupColors[el.group] || "from-slate-600 to-zinc-600";
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(el)}
      className={`relative aspect-square w-full min-w-0 rounded-lg bg-gradient-to-br ${color} p-[1.5px] shadow-sm`}
    >
      <div className="flex h-full w-full flex-col justify-between rounded-[9px] bg-neutral-950 p-1.5 text-left ring-1 ring-white/10">
        <div className="text-[9px] font-semibold text-white/60">{el.number}</div>
        <div className="flex items-end justify-between gap-1">
          <div className="min-w-0">
            <div className="text-lg font-extrabold leading-none tracking-tight text-white">{el.symbol}</div>
            <div className="mt-0.5 truncate text-[9px] text-white/50" title={el.name}>{el.name}</div>
          </div>
          <div className="text-[9px] font-medium text-white/50">{el.atomic_mass || ''}</div>
        </div>
      </div>
    </motion.button>
  );
}
