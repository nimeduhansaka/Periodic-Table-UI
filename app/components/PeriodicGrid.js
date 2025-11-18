"use client";
import { useEffect, useMemo, useState } from "react";
import ElementCard from "./ElementCard";
import dynamic from "next/dynamic";

const ElementModal = dynamic(() => import("./ElementModal"), { ssr: false });

export default function PeriodicGrid({ selectedCategory = "all" }) {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/elements.json").then((r) => r.json()).then(setElements);
  }, []);

  const filteredElements = useMemo(() => {
    if (selectedCategory === "all") return elements;

    return elements.filter((el) => {
      const category = (el.category || "").toLowerCase();
      const group = (el.group || "").toLowerCase();

      // Filter by broad types
      if (selectedCategory === "metal") {
        // Include all metal groups but exclude nonmetals and metalloids
        return (
          group === "alkali" ||
          group === "alkaline" ||
          group === "transition" ||
          group === "posttransition" ||
          group.includes("metal") && !group.includes("nonmetal") && !group.includes("metalloid") ||
          category.includes("metal") && !category.includes("nonmetal") && !category.includes("metalloid")
        );
      }

      if (selectedCategory === "nonmetal") {
        return (
          group === "nonmetal" ||
          group === "halogen" ||
          group === "noble" ||
          category.includes("nonmetal") ||
          category.includes("diatomic nonmetal") ||
          category.includes("polyatomic nonmetal")
        );
      }

      if (selectedCategory === "metalloid") {
        return group === "metalloid" || category.includes("metalloid");
      }

      // Filter by specific groups
      if (selectedCategory === "alkali") {
        return group === "alkali";
      }

      if (selectedCategory === "alkaline") {
        return group === "alkaline";
      }

      if (selectedCategory === "halogen") {
        return group === "halogen";
      }

      if (selectedCategory === "noble") {
        return group === "noble";
      }

      if (selectedCategory === "transition") {
        return group === "transition";
      }

      if (selectedCategory === "lanthanide") {
        return group === "lanthanoid" || (el.number >= 57 && el.number <= 71);
      }

      if (selectedCategory === "actinide") {
        return group === "actinoid" || (el.number >= 89 && el.number <= 103);
      }

      // Filter by block - use atomic number ranges
      if (selectedCategory === "s-block") {
        return el.number === 1 || el.number === 2 ||
               (el.number >= 3 && el.number <= 4) ||
               (el.number >= 11 && el.number <= 12) ||
               (el.number >= 19 && el.number <= 20) ||
               (el.number >= 37 && el.number <= 38) ||
               (el.number >= 55 && el.number <= 56) ||
               (el.number >= 87 && el.number <= 88);
      }

      if (selectedCategory === "p-block") {
        return (el.number >= 5 && el.number <= 10) ||
               (el.number >= 13 && el.number <= 18) ||
               (el.number >= 31 && el.number <= 36) ||
               (el.number >= 49 && el.number <= 54) ||
               (el.number >= 81 && el.number <= 86) ||
               (el.number >= 113 && el.number <= 118);
      }

      if (selectedCategory === "d-block") {
        return (el.number >= 21 && el.number <= 30) ||
               (el.number >= 39 && el.number <= 48) ||
               (el.number >= 72 && el.number <= 80) ||
               (el.number >= 104 && el.number <= 112);
      }

      if (selectedCategory === "f-block") {
        return (el.number >= 57 && el.number <= 71) ||
               (el.number >= 89 && el.number <= 103);
      }

      return false;
    });
  }, [elements, selectedCategory]);

  const rows = useMemo(() => {
    // Full periodic table 18-column layout with gaps
    // Each inner array is a row with 18 columns (null means gap)
    const layout = [
      // Period 1
      [1, ...Array(16).fill(null), 2],
      // Period 2
      [3, 4, ...Array(10).fill(null), 5, 6, 7, 8, 9, 10],
      // Period 3
      [11, 12, ...Array(10).fill(null), 13, 14, 15, 16, 17, 18],
      // Period 4
      [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
      // Period 5
      [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
      // Period 6 (with Lanthanides placeholder at 57-71 shown separately)
      [55, 56, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, null],
      // Period 7 (with Actinides placeholder at 89-103 shown separately)
      [87, 88, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, null],
      // Lanthanoids row
      [null, null, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, null],
      // Actinoids row
      [null, null, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, null],
    ];
    const mapByNumber = new Map(filteredElements.map((e) => [e.number, e]));
    return layout.map((row) => row.map((n) => (n ? mapByNumber.get(n) : null)));
  }, [filteredElements]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-18 gap-2">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className={`col-span-18 grid grid-cols-18 gap-2 ${rIdx >= 7 ? 'mt-4' : ''}`}>
            {row.map((el, cIdx) => (
              <div key={cIdx} className="col-span-1">
                {el ? (
                  <ElementCard
                    el={el}
                    onClick={(e) => {
                      setSelected(e);
                      setOpen(true);
                    }}
                  />
                ) : (
                  <div className="aspect-square"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <ElementModal open={open} onClose={() => setOpen(false)} element={selected} />
    </div>
  );
}
