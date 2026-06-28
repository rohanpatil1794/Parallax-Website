"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  async function submit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate async submission (wire up to an email service later)
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
    setEmail("");
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium text-white">
        <Check className="h-5 w-5 flex-shrink-0 text-emerald-400" aria-hidden="true" />
        You're on the list — we'll be in touch before the next season!
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none ring-1 ring-inset ring-white/20 transition focus:ring-ember-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 rounded-xl bg-ember-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ember-600 disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        Subscribe
      </button>
    </form>
  );
}
