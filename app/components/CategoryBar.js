"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";

const typeOptions = [
  { key: "all", label: "All" },
  { key: "metal", label: "Metals" },
  { key: "nonmetal", label: "Nonmetals" },
  { key: "metalloid", label: "Metalloids" },
];

const blockOptions = [
  { key: "all", label: "All" },
  { key: "s", label: "s-block" },
  { key: "p", label: "p-block" },
  { key: "d", label: "d-block" },
  { key: "f", label: "f-block" },
];

const seriesOptions = [
  { key: "all", label: "All" },
  { key: "transition", label: "Transition" },
  { key: "lanthanoid", label: "Lanthanides" },
  { key: "actinoid", label: "Actinides" },
];

const groupOptions = [
  { key: "all", label: "All" },
  { key: "1", label: "Group 1" },
  { key: "2", label: "Group 2" },
  { key: "17", label: "Group 17" },
  { key: "18", label: "Group 18" },
];

export default function CategoryBar({ onChange }) {
  const [mode, setMode] = useState("type"); // type | group | block | series
  const [value, setValue] = useState("all");

  useEffect(() => {
    onChange({ mode, value });
  }, [mode, value, onChange]);

  const options = useMemo(() => {
    switch (mode) {
      case "block":
        return blockOptions;
      case "series":
        return seriesOptions;
      case "group":
        return groupOptions;
      case "type":
      default:
        return typeOptions;
    }
  }, [mode]);

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={mode === "type" ? "default" : "secondary"} onClick={() => setMode("type")}>Types</Button>
        <Button variant={mode === "group" ? "default" : "secondary"} onClick={() => setMode("group")}>Groups</Button>
        <Button variant={mode === "block" ? "default" : "secondary"} onClick={() => setMode("block")}>Blocks</Button>
        <Button variant={mode === "series" ? "default" : "secondary"} onClick={() => setMode("series")}>Series</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((opt) => (
          <Button
            key={opt.key}
            variant={value === opt.key ? "default" : "outline"}
            onClick={() => setValue(opt.key)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
