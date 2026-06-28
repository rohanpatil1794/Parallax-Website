"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-ink/70 shadow-sm transition-all hover:border-brand-300 hover:text-ink"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </>
      )}
    </button>
  );
}
