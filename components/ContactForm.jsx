"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const inputBase =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // UI demo only — simulate a send, then show the thank-you state.
    setTimeout(() => setStatus("sent"), 1100);
  };

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-brand-100 bg-white p-10 text-center shadow-card">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink">Message sent!</h3>
        <p className="mt-2 text-ink/65">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — our team replies
          within one working day.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: "", email: "", subject: "", message: "" });
            setStatus("idle");
          }}
          className="btn btn-md btn-outline mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-xl font-bold text-ink">Send us a message</h3>
      <p className="mt-1 text-sm text-ink/60">We usually reply within a day.</p>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-ink">
              Name <span className="text-ember-500">*</span>
            </label>
            <input
              id="c-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email <span className="text-ember-500">*</span>
            </label>
            <input
              id="c-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputBase}
            />
          </div>
        </div>
        <div>
          <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-ink">
            Subject
          </label>
          <input
            id="c-subject"
            type="text"
            placeholder="Which trek are you curious about?"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-ink">
            Message <span className="text-ember-500">*</span>
          </label>
          <textarea
            id="c-message"
            required
            rows={5}
            placeholder="Tell us a little about what you're planning…"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${inputBase} resize-none`}
          />
        </div>

        <button type="submit" disabled={status === "sending"} className="btn btn-lg btn-primary w-full">
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
