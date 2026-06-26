"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Minus,
  Plus,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Check,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Lock,
} from "lucide-react";
import { formatPrice } from "@/lib/trekUtils";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "credit", label: "Credit Card", icon: CreditCard },
  { id: "debit", label: "Debit Card", icon: CreditCard },
];

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400";

function Field({ label, htmlFor, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-ember-500"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink/45">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}

export default function BookingForm({ treks }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("trek");

  const [status, setStatus] = useState("idle"); // idle | processing | done
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    trek: treks.find((t) => t.slug === preselected) ? preselected : treks[0].slug,
    date: "",
    trekkers: 1,
    name: "",
    email: "",
    phone: "",
    payment: "upi",
    upiId: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const selectedTrek = useMemo(
    () => treks.find((t) => t.slug === form.trek) ?? treks[0],
    [form.trek, treks]
  );

  // Pricing summary
  const subtotal = selectedTrek.price * form.trekkers;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const advance = Math.round(total * 0.25);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Pick a departure date.";
    if (!form.name.trim()) e.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      e.phone = "Enter a 10-digit phone number.";

    if (form.payment === "upi") {
      if (!/^[\w.\-]+@[\w]+$/.test(form.upiId))
        e.upiId = "Enter a valid UPI ID (name@bank).";
    } else {
      if (form.cardNumber.replace(/\s/g, "").length !== 16)
        e.cardNumber = "Card number must be 16 digits.";
      if (!form.cardName.trim()) e.cardName = "Name on card is required.";
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) e.cardExpiry = "Use MM/YY.";
      if (!/^\d{3}$/.test(form.cardCvv)) e.cardCvv = "3-digit CVV.";
    }
    return e;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Move focus to the first invalid field for accessibility.
      const first = document.querySelector(`[data-field="${Object.keys(e)[0]}"]`);
      if (first) first.focus();
      return;
    }
    setStatus("processing");
    // Simulate a network round-trip — no real payment is processed.
    setTimeout(() => setStatus("done"), 1300);
  };

  // ── Success state ──────────────────────────────────────────────────────
  if (status === "done") {
    const ref = "TRV" + Math.floor(100000 + Math.random() * 900000);
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-card sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-ink">Booking request received!</h2>
        <p className="mt-3 text-ink/65">
          Thanks, {form.name.split(" ")[0] || "trekker"} — your spot on{" "}
          <span className="font-semibold text-ink">{selectedTrek.name}</span> is
          reserved. We've sent a confirmation to{" "}
          <span className="font-semibold text-ink">{form.email}</span>.
        </p>
        <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl bg-brand-50 p-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink/55">Booking reference</dt>
            <dd className="font-mono font-semibold text-ink">{ref}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/55">Trek</dt>
            <dd className="font-semibold text-ink">{selectedTrek.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/55">Trekkers</dt>
            <dd className="font-semibold text-ink">{form.trekkers}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/55">Advance paid</dt>
            <dd className="font-semibold text-emerald-600">{formatPrice(advance)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-ink/45">
          This is a UI demo — no payment was actually processed.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/treks" className="btn btn-md btn-primary">
            Browse more treks
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/" className="btn btn-md btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-5">
      {/* Left: form fields */}
      <div className="space-y-8 lg:col-span-3">
        {/* Trek + schedule */}
        <fieldset className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Trek details
          </legend>
          <div className="mt-4 space-y-5">
            <Field label="Choose your trek" htmlFor="trek" required>
              <select
                id="trek"
                data-field="trek"
                value={form.trek}
                onChange={(e) => set("trek", e.target.value)}
                className={`${inputBase} cursor-pointer border-brand-200`}
              >
                {treks.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name} — {t.region} ({formatPrice(t.price)})
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Departure date" htmlFor="date" required error={errors.date}>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" aria-hidden="true" />
                  <input
                    id="date"
                    data-field="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    className={`${inputBase} pl-10 ${
                      errors.date ? "border-rose-300" : "border-brand-200"
                    }`}
                  />
                </div>
              </Field>

              <Field label="Number of trekkers" htmlFor="trekkers" required>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease trekkers"
                    onClick={() => set("trekkers", Math.max(1, form.trekkers - 1))}
                    className="grid h-11 w-11 flex-shrink-0 cursor-pointer place-items-center rounded-xl border border-brand-200 text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <input
                    id="trekkers"
                    type="number"
                    min={1}
                    max={12}
                    readOnly
                    value={form.trekkers}
                    className={`${inputBase} border-brand-200 text-center`}
                  />
                  <button
                    type="button"
                    aria-label="Increase trekkers"
                    onClick={() => set("trekkers", Math.min(12, form.trekkers + 1))}
                    className="grid h-11 w-11 flex-shrink-0 cursor-pointer place-items-center rounded-xl border border-brand-200 text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </Field>
            </div>
          </div>
        </fieldset>

        {/* Trekker info */}
        <fieldset className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Lead trekker
          </legend>
          <div className="mt-4 space-y-5">
            <Field label="Full name" htmlFor="name" required error={errors.name}>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" aria-hidden="true" />
                <input
                  id="name"
                  data-field="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Aarav Sharma"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={`${inputBase} pl-10 ${errors.name ? "border-rose-300" : "border-brand-200"}`}
                />
              </div>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" htmlFor="email" required error={errors.email}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" aria-hidden="true" />
                  <input
                    id="email"
                    data-field="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={`${inputBase} pl-10 ${errors.email ? "border-rose-300" : "border-brand-200"}`}
                  />
                </div>
              </Field>

              <Field label="Phone" htmlFor="phone" required error={errors.phone}>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" aria-hidden="true" />
                  <input
                    id="phone"
                    data-field="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={`${inputBase} pl-10 ${errors.phone ? "border-rose-300" : "border-brand-200"}`}
                  />
                </div>
              </Field>
            </div>
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Payment method
          </legend>

          {/* Segmented control */}
          <div
            role="tablist"
            aria-label="Payment method"
            className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-brand-50 p-1.5"
          >
            {PAYMENT_METHODS.map((m) => {
              const active = form.payment === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => set("payment", m.id)}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    active ? "bg-white text-brand-700 shadow-sm" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  <m.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* UPI panel */}
          {form.payment === "upi" ? (
            <div className="mt-5">
              <Field
                label="UPI ID"
                htmlFor="upiId"
                required
                error={errors.upiId}
                hint="You'll get a collect request on your UPI app to approve."
              >
                <input
                  id="upiId"
                  data-field="upiId"
                  type="text"
                  placeholder="yourname@upi"
                  value={form.upiId}
                  onChange={(e) => set("upiId", e.target.value)}
                  className={`${inputBase} ${errors.upiId ? "border-rose-300" : "border-brand-200"}`}
                />
              </Field>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                  <span
                    key={app}
                    className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-medium text-ink/60"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            /* Card panel (credit + debit share the same fields) */
            <div className="mt-5 space-y-5">
              <Field label="Card number" htmlFor="cardNumber" required error={errors.cardNumber}>
                <div className="relative">
                  <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" aria-hidden="true" />
                  <input
                    id="cardNumber"
                    data-field="cardNumber"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={(e) => {
                      // Group digits into blocks of 4 as the user types.
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                      const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
                      set("cardNumber", grouped);
                    }}
                    className={`${inputBase} pl-10 ${errors.cardNumber ? "border-rose-300" : "border-brand-200"}`}
                  />
                </div>
              </Field>
              <Field label="Name on card" htmlFor="cardName" required error={errors.cardName}>
                <input
                  id="cardName"
                  data-field="cardName"
                  type="text"
                  placeholder="AARAV SHARMA"
                  value={form.cardName}
                  onChange={(e) => set("cardName", e.target.value.toUpperCase())}
                  className={`${inputBase} ${errors.cardName ? "border-rose-300" : "border-brand-200"}`}
                />
              </Field>
              <div className="grid grid-cols-2 gap-5">
                <Field label="Expiry" htmlFor="cardExpiry" required error={errors.cardExpiry}>
                  <input
                    id="cardExpiry"
                    data-field="cardExpiry"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={form.cardExpiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                      set("cardExpiry", v);
                    }}
                    className={`${inputBase} ${errors.cardExpiry ? "border-rose-300" : "border-brand-200"}`}
                  />
                </Field>
                <Field label="CVV" htmlFor="cardCvv" required error={errors.cardCvv}>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-500" aria-hidden="true" />
                    <input
                      id="cardCvv"
                      data-field="cardCvv"
                      inputMode="numeric"
                      type="password"
                      placeholder="123"
                      maxLength={3}
                      value={form.cardCvv}
                      onChange={(e) => set("cardCvv", e.target.value.replace(/\D/g, ""))}
                      className={`${inputBase} pl-10 ${errors.cardCvv ? "border-rose-300" : "border-brand-200"}`}
                    />
                  </div>
                </Field>
              </div>
            </div>
          )}

          <p className="mt-5 flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-xs text-ink/55">
            <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
            Demo only — no real payment is processed. Your details never leave the browser.
          </p>
        </fieldset>
      </div>

      {/* Right: sticky order summary */}
      <div className="lg:col-span-2">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
          <div className="relative h-36">
            <Image
              src={selectedTrek.image}
              alt={selectedTrek.name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 scrim-bottom" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-xs text-white/80">{selectedTrek.region}</p>
              <h3 className="font-display text-lg font-bold">{selectedTrek.name}</h3>
            </div>
          </div>

          <div className="space-y-3 p-6">
            <div className="flex justify-between text-sm">
              <span className="text-ink/60">
                {formatPrice(selectedTrek.price)} × {form.trekkers}{" "}
                {form.trekkers === 1 ? "trekker" : "trekkers"}
              </span>
              <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink/60">GST (5%)</span>
              <span className="font-medium text-ink">{formatPrice(gst)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-100 pt-3 text-base">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-display text-xl font-extrabold text-ink">
                {formatPrice(total)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-ember-50 px-4 py-3">
              <div>
                <p className="text-xs text-ember-700/80">Pay now (25% advance)</p>
                <p className="font-display text-lg font-bold text-ember-700">
                  {formatPrice(advance)}
                </p>
              </div>
              <span className="text-xs text-ember-700/70">Balance on arrival</span>
            </div>

            <button
              type="submit"
              disabled={status === "processing"}
              className="btn btn-lg btn-primary mt-2 w-full"
            >
              {status === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Processing…
                </>
              ) : (
                <>
                  Pay {formatPrice(advance)} &amp; confirm
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>

            <ul className="mt-3 space-y-1.5">
              {["Free cancellation up to 15 days", "Instant e-confirmation", "24×7 trek support"].map(
                (perk) => (
                  <li key={perk} className="flex items-center gap-2 text-xs text-ink/55">
                    <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                    {perk}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
