"use client";

import { Plus, Trash2 } from "lucide-react";

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export default function ItineraryBuilder({ days, onChange }) {
  function update(index, key, value) {
    const updated = days.map((d, i) => (i === index ? { ...d, [key]: value } : d));
    onChange(updated);
  }

  function addDay() {
    onChange([...days, { day: days.length + 1, title: "", detail: "" }]);
  }

  function removeDay(index) {
    const updated = days
      .filter((_, i) => i !== index)
      .map((d, i) => ({ ...d, day: i + 1 }));
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {days.map((d, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
              {d.day}
            </span>
            <input
              type="text"
              placeholder="Day title"
              value={d.title}
              onChange={(e) => update(i, "title", e.target.value)}
              className={inputBase + " flex-1"}
            />
            <button
              type="button"
              onClick={() => removeDay(i)}
              className="flex-shrink-0 rounded-lg p-1.5 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <textarea
            placeholder="Day description"
            value={d.detail}
            rows={2}
            onChange={(e) => update(i, "detail", e.target.value)}
            className={inputBase + " resize-none"}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addDay}
        className="flex items-center gap-2 rounded-xl border border-dashed border-brand-300 px-4 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add day
      </button>
    </div>
  );
}
