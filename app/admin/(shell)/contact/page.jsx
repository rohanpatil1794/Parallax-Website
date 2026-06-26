"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export default function AdminContactPage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then(setData);
  }, []);

  function set(key, value) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  function setSocial(i, key, value) {
    const socials = data.socials.map((s, j) => j === i ? { ...s, [key]: value } : s);
    setData((d) => ({ ...d, socials }));
    setSaved(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
  }

  if (!data) {
    return <div className="p-8 text-ink/50">Loading…</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">Contact info</h1>
        <p className="mt-1 text-sm text-ink/50">Update the email, phone, address and social links shown on the site.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/50">Details</h2>

          {[
            { key: "email", label: "Email", type: "email" },
            { key: "phone", label: "Phone", type: "text" },
            { key: "address", label: "Address", type: "text" },
            { key: "hours", label: "Hours", type: "text" },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>
              <input
                type={type}
                value={data[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                className={inputBase}
              />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/50">Social links</h2>

          {data.socials.map((s, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink/40">Social {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setData((d) => ({ ...d, socials: d.socials.filter((_, j) => j !== i) }))}
                  className="text-rose-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-ink/60 mb-1">Label</label>
                  <input
                    type="text"
                    value={s.label}
                    onChange={(e) => setSocial(i, "label", e.target.value)}
                    className={inputBase}
                    placeholder="Instagram"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink/60 mb-1">URL</label>
                  <input
                    type="url"
                    value={s.href}
                    onChange={(e) => setSocial(i, "href", e.target.value)}
                    className={inputBase}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink/60 mb-1">Icon key</label>
                  <input
                    type="text"
                    value={s.icon}
                    onChange={(e) => setSocial(i, "icon", e.target.value)}
                    className={inputBase}
                    placeholder="instagram"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setData((d) => ({ ...d, socials: [...d.socials, { label: "", href: "", icon: "" }] }))}
            className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
          >
            <Plus className="h-4 w-4" /> Add social link
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-ink px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium">Changes saved!</span>
          )}
        </div>
      </form>
    </div>
  );
}
