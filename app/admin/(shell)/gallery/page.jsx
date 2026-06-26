"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Pencil, Check, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  async function addPhoto() {
    if (!newImage) return;
    setAdding(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src: newImage, title: newTitle, location: newLocation }),
    });
    const item = await res.json();
    setItems((is) => [...is, item]);
    setNewImage("");
    setNewTitle("");
    setNewLocation("");
    setAdding(false);
  }

  function startEdit(item) {
    setEditId(item.id);
    setEditForm({ title: item.title, location: item.location });
  }

  async function saveEdit(id) {
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    const updated = await res.json();
    setItems((is) => is.map((i) => (i.id === id ? updated : i)));
    setEditId(null);
  }

  async function deletePhoto(id) {
    if (!window.confirm("Delete this photo? This cannot be undone.")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setItems((is) => is.filter((i) => i.id !== id));
  }

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">Gallery</h1>
        <p className="mt-1 text-sm text-ink/50">{items.length} photos</p>
      </div>

      {/* Upload form */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/50">Add photo</h2>
        <ImageUpload value={newImage} onChange={setNewImage} uploadUrl="/api/admin/gallery/upload" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={inputBase}
          />
          <input
            type="text"
            placeholder="Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className={inputBase}
          />
        </div>
        <button
          onClick={addPhoto}
          disabled={!newImage || adding}
          className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {adding ? "Adding…" : "Add to gallery"}
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={item.src} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4 space-y-2">
                {editId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                      className={inputBase}
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                      className={inputBase}
                      placeholder="Location"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(item.id)} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                        <Check className="h-3.5 w-3.5" /> Save
                      </button>
                      <button onClick={() => setEditId(null)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink/60 hover:bg-slate-50 transition-colors">
                        <X className="h-3.5 w-3.5" /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-ink text-sm">{item.title}</p>
                    <p className="text-xs text-ink/50">{item.location}</p>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(item)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink/60 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button onClick={() => deletePhoto(item.id)} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink/60 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
