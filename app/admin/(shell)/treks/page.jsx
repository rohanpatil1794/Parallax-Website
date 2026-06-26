"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

export default function AdminTreksPage() {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/treks")
      .then((r) => r.json())
      .then(setTreks)
      .finally(() => setLoading(false));
  }, []);

  async function toggleFeatured(trek) {
    const updated = { ...trek, featured: !trek.featured };
    await fetch(`/api/admin/treks/${trek.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setTreks((ts) => ts.map((t) => (t.slug === trek.slug ? updated : t)));
  }

  async function deleteTrek(slug) {
    if (!window.confirm(`Delete trek "${slug}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/treks/${slug}`, { method: "DELETE" });
    setTreks((ts) => ts.filter((t) => t.slug !== slug));
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Treks</h1>
          <p className="mt-1 text-sm text-ink/50">{treks.length} total</p>
        </div>
        <Link
          href="/admin/treks/new"
          className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Add trek
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-ink/50">
              <tr>
                <th className="px-4 py-3 text-left">Trek</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Region</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Difficulty</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">Price</th>
                <th className="px-4 py-3 text-center">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {treks.map((trek) => (
                <tr key={trek.slug} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {trek.image && (
                        <div className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image src={trek.image} alt={trek.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-ink">{trek.name}</p>
                        <p className="text-xs text-ink/40">{trek.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink/65 hidden md:table-cell">{trek.region}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      trek.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" :
                      trek.difficulty === "Moderate" ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      {trek.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-ink/65 hidden sm:table-cell">
                    ₹{Number(trek.price).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleFeatured(trek)}
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                        trek.featured
                          ? "bg-ember-100 text-ember-600"
                          : "bg-slate-100 text-ink/25 hover:text-ink/50"
                      }`}
                      title={trek.featured ? "Remove from featured" : "Mark as featured"}
                    >
                      <Star className="h-4 w-4" fill={trek.featured ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/treks/${trek.slug}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteTrek(trek.slug)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
