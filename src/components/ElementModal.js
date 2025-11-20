"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth, useNotes } from "@/src/app/lib/store";
import { ATOMIC_MASS_BY_SYMBOL } from "@/src/app/lib/categories";
import { GROUP_GRADIENTS } from "@/src/components/ElementCard";

// Heuristics for extra details when not present in data
const RADIOACTIVE_SYMBOLS = new Set([
  "Tc","Pm","Po","At","Rn","Fr","Ra",
  // Actinides and beyond
  "Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr",
  "Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og",
]);

const TOXIC_SYMBOLS = new Set([
  "Be","As","Cd","Hg","Tl","Pb","Po","Ra","U","Pu","Sb","Se","Th","Rn",
]);

const COMMON_USES = {
  H: ["Rocket fuel (as LH2)", "Ammonia production", "Hydrogenation"],
  He: ["Cryogenics (MRI)", "Inert shielding gas", "Balloons/neon lights"],
  Li: ["Rechargeable batteries", "Alloys", "Pharmaceuticals"],
  C: ["Steel/carbon fiber", "Electrodes", "Organic chemistry"],
  N: ["Fertilizers", "Inert atmosphere", "Cryogenics (LN2)"],
  O: ["Breathing/medical", "Steelmaking", "Rocket oxidizer"],
  Na: ["Table salt (NaCl)", "Street lighting (Na vapor)", "Heat transfer"],
  Al: ["Aerospace", "Packaging", "Construction"],
  Si: ["Semiconductors", "Glass", "Solar cells"],
  P: ["Fertilizers", "Matches", "Detergents"],
  S: ["Sulfuric acid", "Vulcanization", "Fungicides"],
  Cl: ["Water disinfection", "PVC production", "Bleaching"],
  Fe: ["Steel", "Construction", "Tools"],
  Cu: ["Electrical wiring", "Plumbing", "Alloys"],
  Zn: ["Galvanization", "Brass", "Batteries"],
  Ag: ["Electronics", "Photography", "Jewelry"],
  Au: ["Electronics", "Dentistry", "Investment/jewelry"],
  U: ["Nuclear fuel", "Armor piercing", "Research"],
};

const formatAtomicMass = (el) => {
  const value =
    el?.atomic_mass ??
    el?.atomicMass ??
    el?.mass ??
    el?.weight ??
    (el?.symbol ? ATOMIC_MASS_BY_SYMBOL[el.symbol] : null) ??
    null;
  if (value == null) return "—";
  const numeric = Number(value);
  return Number.isNaN(numeric) ? "—" : numeric.toFixed(2);
};

function getDerivedInfo(el) {
  const symbol = el.symbol;
  const image = el.image || `/images/elements/${symbol.toLowerCase()}.jpg`;
  const radioactive = el.radioactive ?? RADIOACTIVE_SYMBOLS.has(symbol);
  const toxic = el.toxic ?? TOXIC_SYMBOLS.has(symbol);
  const uses = el.uses && el.uses.length ? el.uses : (COMMON_USES[symbol] || ["Research and industrial applications", "Education", "Material science"]);
  const toxicityNote = el.toxicityNote || (toxic ? `${symbol} may be harmful; handle with appropriate precautions.` : "");
  return { image, radioactive, toxic, uses, toxicityNote };
}

function RadiationIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-10a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 9H5.53a6.99 6.99 0 0 1 2.19-4.4L10.02 11Zm7.47 0H13.02l2.3-4.4a6.99 6.99 0 0 1 2.19 4.4ZM8.45 14.4 6.1 18.8A7 7 0 0 1 5.53 13H11a3 3 0 0 0-2.55 1.4Zm7.1 0A3 3 0 0 0 13 13h5.47a7 7 0 0 1-.57 5.8l-2.35-4.4Zm-2.98 2.94L12 17.3l-.57.04-4.05.28A7 7 0 0 1 12 20a7 7 0 0 1 4.62-1.38l-4.05-.28Z" />
    </svg>
  );
}

function WarningIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 19a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
    </svg>
  );
}

export default function ElementModal({ open, onClose, element }) {
  const { user, login, logout } = useAuth();
  const { notes, addNote } = useNotes();
  const [text, setText] = useState("");
  const list = element ? notes[element.symbol] || [] : [];

  const derived = useMemo(() => (element ? getDerivedInfo(element) : null), [element]);

  if (!open || !element) return null;

  const atomicMassValue = formatAtomicMass(element);
  const atomicMassDisplay = atomicMassValue === "—" ? atomicMassValue : `${atomicMassValue} amu`;
  const gradientClass = GROUP_GRADIENTS[element.group] || "from-slate-600 to-zinc-600";

  const handleAdd = () => {
    if (!text.trim()) return;
    addNote(element.symbol, text.trim());
    setText("");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="mx-4 w-[min(1000px,96vw)] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-lg ring-1 ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" />
                <img src={derived.image} alt={`${element.name}`} className="absolute inset-0 h-full w-full object-cover" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
                <div className="absolute inset-0 grid place-items-center text-xl font-bold">
                  {element.symbol}
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{element.name}</div>
                <div className="text-xs text-white/60">Atomic No. {element.number} • Group {element.group}</div>
              </div>
            </div>
            <button onClick={onClose} className="rounded-md px-3 py-1.5 text-sm text-white/70 hover:bg-white/5">Close</button>
          </div>

          {/* Warnings */}
          {(derived?.radioactive || derived?.toxic) && (
            <div className="mx-4 mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-yellow-300">
              <div className="flex items-center gap-2 text-sm font-medium">
                {derived.radioactive && (
                  <span className="inline-flex items-center gap-1"><RadiationIcon className="h-4 w-4"/> Radioactive</span>
                )}
                {derived.radioactive && derived.toxic && <span>•</span>}
                {derived.toxic && (
                  <span className="inline-flex items-center gap-1"><WarningIcon className="h-4 w-4"/> Potentially harmful</span>
                )}
              </div>
              {derived.toxic && derived.toxicityNote && (
                <div className="mt-1 text-xs text-yellow-200/90">{derived.toxicityNote}</div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-5">
            <div className="md:col-span-3 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className={`rounded-xl bg-gradient-to-br ${gradientClass} p-[1.5px]`}>
                  <div className="rounded-[0.9rem] bg-neutral-950">
                    <div className="relative h-48 w-full overflow-hidden rounded-[0.9rem]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-70`} />
                      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1 text-center">
                        <div className="text-5xl font-black text-white">{element.symbol}</div>
                        <div className="text-xs uppercase tracking-[0.3em] text-white/70">{element.name}</div>
                        <div className="text-[11px] text-white/60">Atomic Mass {atomicMassDisplay}</div>
                      </div>
                    </div>
                    <div className="border-t border-white/10 p-3 text-xs text-white/60">Illustrative tile</div>
                  </div>
                </div>

                {/* Key Facts */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-sm font-semibold text-white/80">Key facts</div>
                  <div className="mt-2 grid grid-cols-2 gap-3 text-sm sm:grid-cols-2">
                    <Info label="Symbol" value={element.symbol} />
                    <Info label="Atomic Number" value={element.number} />
                    <Info label="Atomic Mass" value={atomicMassDisplay} />
                    <Info label="Group" value={element.group} />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-white/80">Summary</div>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{element.summary}</p>
              </div>

              <div>
                <div className="text-sm font-semibold text-white/80">Common uses</div>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {derived.uses.map((u, i) => (
                    <li key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{u}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contributions */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/80">User contributions</div>
                {user ? (
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    Signed in as <span className="font-semibold text-white/80">{user.name}</span>
                    <button onClick={logout} className="rounded px-2 py-1 hover:bg-white/5">Log out</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <input placeholder="Your name" className="w-32 rounded bg-white/5 px-2 py-1 outline-none placeholder:text-white/40" onKeyDown={(e)=>{ if(e.key==='Enter'){ login(e.currentTarget.value.trim()||'Guest') } }} />
                    <button onClick={()=>{ const el = document.activeElement; const name = el && el.value ? el.value : 'Guest'; login(name); }} className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">Log in</button>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add an extra detail, source, or usage..."
                  className="h-24 w-full resize-none rounded-md bg-transparent p-2 text-sm text-white/80 outline-none placeholder:text-white/40"
                />
                <div className="mt-2 flex justify-end">
                  <button disabled={!user || !text.trim()} onClick={handleAdd} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 ring-1 ring-white/10 transition enabled:hover:bg-white/20 disabled:opacity-40">Save</button>
                </div>
              </div>

              <div className="space-y-2">
                {list.length === 0 ? (
                  <div className="text-xs text-white/50">No contributions yet.</div>
                ) : (
                  list.map((n) => (
                    <div key={n.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <div className="text-xs text-white/50">by {n.author} • {new Date(n.createdAt).toLocaleString()}</div>
                      <div className="mt-1 whitespace-pre-wrap text-sm text-white/80">{n.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-wide text-white/40">{label}</div>
      <div className="text-sm font-medium text-white/80">{value}</div>
    </div>
  );
}
