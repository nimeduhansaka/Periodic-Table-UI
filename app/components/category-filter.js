"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PERIODIC_CATEGORIES } from "@/app/lib/categories";

export default function CategoryFilter({ onChange }) {
    const [activeId, setActiveId] = useState("all");

    const handleClick = (id) => {
        setActiveId(id);
        onChange(id);
    };

    return (
        <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md">
            {PERIODIC_CATEGORIES.map((category) => (
                <Button
                    key={category.id}
                    variant={activeId === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleClick(category.id)}
                    className={activeId === category.id
                        ? "bg-white/20 text-white hover:bg-white/30 border-white/20"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border-white/10"
                    }
                >
                    {category.label}
                </Button>
            ))}
        </div>
    );
}