"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Flame, Mountain } from "lucide-react";
import TrekCard from "./TrekCard";

const DIFFICULTIES = ["All", "Easy", "Moderate", "Challenging"];

// Quick-pick presets — let users jump to a common filter in one click
const QUICK_PICKS = [
  { label: "Beginner friendly", difficulty: "Easy", region: "All" },
  { label: "Himalayan classic", difficulty: "All", region: "Himalaya" },
  { label: "Weekend getaway", difficulty: "Easy", region: "Sahyadri" },
  { label: "Summit challenge", difficulty: "Challenging", region: "All" },
];

const SORT_OPTIONS = [
  { value: "default",     label: "Recommended" },
  { value: "price_asc",   label: "Price: Low → High" },
  { value: "price_desc",  label: "Price: High → Low" },
  { value: "duration",    label: "Shortest first" },
  { value: "rating",      label: "Top rated" },
];

function parseWeeks(duration) {
  if (!duration) return 999;
  const d = duration.toLowerCase();
  const match = d.match(/(\d+)/);
  if (!match) return 999;
  const n = parseInt(match[1]);
  if (d.includes("week")) return n * 7;
  if (d.includes("night")) return n;
  return n;
}

export default function TreksExplorer({ treks }) {
  const [query, setQuery]     = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [region, setRegion]   = useState("All");
  const [sort, setSort]       = useState("default");

  const regions = useMemo(() => {
    const set = new Set(treks.map((t) => t.region?.split(",")[0].trim()).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [treks]);

  const difficultyCounts = useMemo(() => {
    const counts = { All: treks.length };
    treks.forEach((t) => {
      counts[t.difficulty] = (counts[t.difficulty] ?? 0) + 1;
    });
    return counts;
  }, [treks]);

  const visible = useMemo(() => {
    let list = treks;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name?.toLowerCase().includes(q) ||
          t.region?.toLowerCase().includes(q) ||
          t.short?.toLowerCase().includes(q)
      );
    }
    if (difficulty !== "All") list = list.filter((t) => t.difficulty === difficulty);
    if (region !== "All") list = list.filter((t) => t.region?.includes(region));

    switch (sort) {
      case "price_asc":  return [...list].sort((a, b) => a.price - b.price);
      case "price_desc": return [...list].sort((a, b) => b.price - a.price);
      case "duration":   return [...list].sort((a, b) => parseWeeks(a.duration) - parseWeeks(b.duration));
      case "rating":     return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:           return list;
    }
  }, [treks, query, difficulty, region, sort]);

  const hasFilters = query || difficulty !== "All" || region !== "All" || sort !== "default";

  function clearAll() {
    setQuery("");
    setDifficulty("All");
    setRegion("All");
    setSort("default");
  }

  return (
    <div>
      {/* ── Quick picks ────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/45">
          <Flame className="h-3.5 w-3.5 text-ember-500" aria-hidden="true" />
          Quick picks
        </span>
        {QUICK_PICKS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setQuery("");
              setDifficulty(p.difficulty);
              setRegion(p.region);
              setSort("default");
            }}
            className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-medium text-ink/65 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Controls bar ───────────────────────────────────────────── */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treks by name or region…"
            className="w-full rounded-2xl border border-brand-100 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-ink/60 hover:bg-brand-200"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Difficulty
            </span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                aria-pressed={difficulty === d}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                  difficulty === d
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-white text-ink/70 ring-1 ring-inset ring-brand-100 hover:bg-brand-50"
                }`}
              >
                {d}
                {difficultyCounts[d] !== undefined && (
                  <span className={`rounded-full px-1.5 py-0 text-[0.6rem] font-bold ${
                    difficulty === d ? "bg-white/20 text-white" : "bg-brand-50 text-ink/40"
                  }`}>
                    {difficultyCounts[d]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative flex items-center">
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" aria-hidden="true" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-2xl border border-brand-100 bg-white py-2 pl-4 pr-10 text-sm font-medium text-ink shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Region pills */}
        {regions.length > 2 && (
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-xs font-semibold uppercase tracking-wider text-ink/50">Region</span>
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={region === r}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-200 ${
                  region === r
                    ? "bg-ember-500 text-white shadow-sm"
                    : "bg-white text-ink/60 ring-1 ring-inset ring-brand-100 hover:bg-brand-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result count + clear */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink/50">
          Showing{" "}
          <span className="font-semibold text-ink">{visible.length}</span>{" "}
          of <span className="font-semibold text-ink">{treks.length}</span>{" "}
          {treks.length === 1 ? "trek" : "treks"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-800"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((trek, i) => (
            <TrekCard key={trek.slug} trek={trek} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <Search className="h-10 w-10 text-brand-200" aria-hidden="true" />
          <p className="mt-4 font-semibold text-ink">No treks match your filters</p>
          <p className="mt-1 text-sm text-ink/50">Try adjusting your search or clearing the filters.</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 rounded-full bg-brand-50 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
