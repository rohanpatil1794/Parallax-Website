"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

const ICON_OPTIONS = ["Compass", "ShieldCheck", "Leaf", "HeartHandshake"];
const TONE_OPTIONS = [
  { label: "Blue", value: "from-brand-500 to-brand-700" },
  { label: "Orange", value: "from-ember-500 to-ember-700" },
  { label: "Green", value: "from-emerald-500 to-emerald-700" },
  { label: "Dark Blue", value: "from-brand-600 to-ink" },
];

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Section({ title, children, onSave, saving }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/50">{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {saving && <Loader2 className="h-3 w-3 animate-spin" />}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      {children}
    </div>
  );
}

export default function AdminAboutPage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState({ story: false, values: false, team: false });

  useEffect(() => {
    fetch("/api/admin/about").then((r) => r.json()).then(setData);
  }, []);

  async function save(section) {
    setSaving((s) => ({ ...s, [section]: true }));
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving((s) => ({ ...s, [section]: false }));
  }

  function setStory(key, value) {
    setData((d) => ({ ...d, story: { ...d.story, [key]: value } }));
  }

  function setParagraph(i, value) {
    const paragraphs = [...data.story.paragraphs];
    paragraphs[i] = value;
    setData((d) => ({ ...d, story: { ...d.story, paragraphs } }));
  }

  function setValues(values) {
    setData((d) => ({ ...d, values }));
  }

  function setTeam(team) {
    setData((d) => ({ ...d, team }));
  }

  if (!data) {
    return <div className="p-8 text-ink/50">Loading…</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">About page</h1>
        <p className="mt-1 text-sm text-ink/50">Edit story, values and team members.</p>
      </div>

      {/* Story */}
      <Section title="Story" onSave={() => save("story")} saving={saving.story}>
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Heading</label>
          <input
            type="text"
            value={data.story.heading}
            onChange={(e) => setStory("heading", e.target.value)}
            className={inputBase}
          />
        </div>
        {data.story.paragraphs.map((p, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-ink mb-1.5">Paragraph {i + 1}</label>
            <textarea
              value={p}
              rows={3}
              onChange={(e) => setParagraph(i, e.target.value)}
              className={inputBase + " resize-none"}
            />
          </div>
        ))}
      </Section>

      {/* Values */}
      <Section title="Values" onSave={() => save("values")} saving={saving.values}>
        {data.values.map((v, i) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink/40">Value {i + 1}</span>
              <button
                type="button"
                onClick={() => setValues(data.values.filter((_, j) => j !== i))}
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1">Icon</label>
                <select
                  value={v.icon}
                  onChange={(e) => setValues(data.values.map((val, j) => j === i ? { ...val, icon: e.target.value } : val))}
                  className={inputBase}
                >
                  {ICON_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1">Title</label>
                <input
                  type="text"
                  value={v.title}
                  onChange={(e) => setValues(data.values.map((val, j) => j === i ? { ...val, title: e.target.value } : val))}
                  className={inputBase}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink/60 mb-1">Body</label>
              <textarea
                value={v.body}
                rows={2}
                onChange={(e) => setValues(data.values.map((val, j) => j === i ? { ...val, body: e.target.value } : val))}
                className={inputBase + " resize-none"}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setValues([...data.values, { icon: "Compass", title: "", body: "" }])}
          className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
        >
          <Plus className="h-4 w-4" /> Add value
        </button>
      </Section>

      {/* Team */}
      <Section title="Team" onSave={() => save("team")} saving={saving.team}>
        {data.team.map((member, i) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink/40">Member {i + 1}</span>
              <button
                type="button"
                onClick={() => setTeam(data.team.filter((_, j) => j !== i))}
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => setTeam(data.team.map((m, j) => j === i ? { ...m, name: e.target.value } : m))}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1">Role</label>
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => setTeam(data.team.map((m, j) => j === i ? { ...m, role: e.target.value } : m))}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1">Initials (max 2)</label>
                <input
                  type="text"
                  value={member.initials}
                  maxLength={2}
                  onChange={(e) => setTeam(data.team.map((m, j) => j === i ? { ...m, initials: e.target.value.toUpperCase().slice(0, 2) } : m))}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink/60 mb-1">Avatar color</label>
                <select
                  value={member.tone}
                  onChange={(e) => setTeam(data.team.map((m, j) => j === i ? { ...m, tone: e.target.value } : m))}
                  className={inputBase}
                >
                  {TONE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setTeam([...data.team, { name: "", role: "", initials: "", tone: "from-brand-500 to-brand-700" }])}
          className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
        >
          <Plus className="h-4 w-4" /> Add member
        </button>
      </Section>
    </div>
  );
}
