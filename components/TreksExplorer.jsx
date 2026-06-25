"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import TrekCard from "./TrekCard";

const FILTERS = ["All", "Easy", "Moderate", "Challenging"];

export default function TreksExplorer({ treks }) {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? treks : treks.filter((t) => t.difficulty === filter)),
    [filter, treks]
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-ink/60">
          <SlidersHorizontal className="h-4 w-4 text-brand-500" aria-hidden="true" />
          Filter by difficulty
        </p>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-white text-ink/70 ring-1 ring-inset ring-brand-100 hover:bg-brand-50"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-6 text-sm text-ink/50">
        Showing <span className="font-semibold text-ink">{visible.length}</span>{" "}
        {visible.length === 1 ? "trek" : "treks"}
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((trek, i) => (
            <TrekCard key={trek.slug} trek={trek} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-brand-200 bg-white p-16 text-center">
          <p className="text-ink/60">No treks match that filter just yet.</p>
        </div>
      )}
    </div>
  );
}
