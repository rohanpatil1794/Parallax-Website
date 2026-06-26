"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";

export default function ImageUpload({ value, onChange, uploadUrl }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(uploadUrl, { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const { path } = await res.json();
      onChange(path);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div
        className="relative flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-ink/50 transition-colors hover:border-brand-400 hover:bg-brand-50"
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <div className="relative h-40 w-full overflow-hidden rounded-lg">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
        ) : uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span>Click or drag & drop to upload</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {value && (
        <p className="text-xs text-ink/40 break-all">{value}</p>
      )}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
