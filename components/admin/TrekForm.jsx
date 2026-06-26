"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import ImageUpload from "./ImageUpload";
import ItineraryBuilder from "./ItineraryBuilder";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/50">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const DIFFICULTIES = ["Easy", "Moderate", "Challenging"];

export default function TrekForm({ initialData, isEdit }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    slug: "",
    name: "",
    tagline: "",
    region: "",
    location: "",
    difficulty: "Moderate",
    featured: false,
    image: "",
    durationDays: 2,
    duration: "",
    distanceKm: 10,
    altitudeM: 2000,
    grade: "",
    bestSeason: "",
    groupSize: "10–16",
    rating: 4.8,
    reviews: 0,
    price: 5000,
    short: "",
    long: "",
    highlights: [""],
    inclusions: [""],
    itinerary: [{ day: 1, title: "", detail: "" }],
    ...initialData,
  });

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleNameChange(name) {
    set("name", name);
    if (!isEdit) set("slug", toSlug(name));
  }

  function updateList(key, index, value) {
    const arr = [...form[key]];
    arr[index] = value;
    set(key, arr);
  }

  function addListItem(key) {
    set(key, [...form[key], ""]);
  }

  function removeListItem(key, index) {
    set(key, form[key].filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const clean = {
      ...form,
      highlights: form.highlights.filter(Boolean),
      inclusions: form.inclusions.filter(Boolean),
    };

    const url = isEdit ? `/api/admin/treks/${form.slug}` : "/api/admin/treks";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }
      router.push("/admin/treks");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>
      )}

      <Section title="Basic info">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Trek name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={inputBase}
              required
            />
          </Field>
          <Field label="Slug" required>
            <input
              type="text"
              value={form.slug}
              readOnly={isEdit}
              onChange={(e) => set("slug", e.target.value)}
              className={inputBase + (isEdit ? " opacity-60 cursor-not-allowed" : "")}
              required
            />
          </Field>
        </div>
        <Field label="Tagline">
          <input type="text" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className={inputBase} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Region" required>
            <input type="text" value={form.region} onChange={(e) => set("region", e.target.value)} className={inputBase} required />
          </Field>
          <Field label="Location">
            <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} className={inputBase} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Difficulty">
            <select value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)} className={inputBase}>
              {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Featured">
            <label className="flex cursor-pointer items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-brand-600"
              />
              <span className="text-sm text-ink/70">Show on homepage</span>
            </label>
          </Field>
        </div>
      </Section>

      <Section title="Cover image">
        <ImageUpload value={form.image} onChange={(p) => set("image", p)} uploadUrl="/api/admin/treks/upload" />
      </Section>

      <Section title="Stats">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { key: "durationDays", label: "Duration (days)", type: "number" },
            { key: "duration", label: "Duration label", type: "text" },
            { key: "distanceKm", label: "Distance (km)", type: "number" },
            { key: "altitudeM", label: "Max altitude (m)", type: "number" },
            { key: "grade", label: "Grade", type: "text" },
            { key: "bestSeason", label: "Best season", type: "text" },
            { key: "groupSize", label: "Group size", type: "text" },
            { key: "rating", label: "Rating", type: "number" },
            { key: "reviews", label: "Reviews count", type: "number" },
            { key: "price", label: "Price (₹)", type: "number" },
          ].map(({ key, label, type }) => (
            <Field key={key} label={label}>
              <input
                type={type}
                value={form[key]}
                step={type === "number" && key === "rating" ? "0.1" : "1"}
                onChange={(e) => set(key, type === "number" ? Number(e.target.value) : e.target.value)}
                className={inputBase}
              />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="Description">
        <Field label="Short description" required>
          <textarea
            value={form.short}
            rows={3}
            onChange={(e) => set("short", e.target.value)}
            className={inputBase + " resize-none"}
            required
          />
        </Field>
        <Field label="Long description">
          <textarea
            value={form.long}
            rows={6}
            onChange={(e) => set("long", e.target.value)}
            className={inputBase + " resize-y"}
          />
        </Field>
      </Section>

      {["highlights", "inclusions"].map((key) => (
        <Section key={key} title={key.charAt(0).toUpperCase() + key.slice(1)}>
          <div className="space-y-2">
            {form[key].map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateList(key, i, e.target.value)}
                  className={inputBase + " flex-1"}
                  placeholder={`${key} item`}
                />
                <button
                  type="button"
                  onClick={() => removeListItem(key, i)}
                  className="rounded-lg p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(key)}
              className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
            >
              <Plus className="h-4 w-4" />
              Add item
            </button>
          </div>
        </Section>
      ))}

      <Section title="Itinerary">
        <ItineraryBuilder days={form.itinerary} onChange={(d) => set("itinerary", d)} />
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create trek"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-ink/70 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
