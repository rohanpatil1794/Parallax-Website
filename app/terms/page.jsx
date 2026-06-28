import Link from "next/link";
import { ShieldCheck, RefreshCw, Lock, Cookie, FileText, Check } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms & Conditions",
  description: "Travello's terms of service, privacy, refund and cookie policies.",
};

const sectionIcons = {
  terms: FileText,
  cancellation: RefreshCw,
  refund: ShieldCheck,
  privacy: Lock,
  cookies: Cookie,
};

const quickSummary = [
  { label: "Cancellation deadline", value: "15 days before departure" },
  { label: "Refund method", value: "Original payment or credit" },
  { label: "Refund timeline", value: "7 – 10 working days" },
  { label: "Data policy", value: "We never sell your data" },
  { label: "Cookies", value: "Essential only" },
];

// Placeholder legal copy — replace with reviewed policy text before launch.
const sections = [
  {
    id: "terms",
    title: "Terms of Service",
    body: [
      "By booking a trek with Travello you agree to follow your trek leader's instructions and the safety guidelines provided before departure. Mountain conditions can change quickly; routes and itineraries may be altered for your safety.",
      "All participants must disclose relevant medical conditions before the trek. Travello reserves the right to decline participation where safety cannot be reasonably assured.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    body: [
      "Free cancellation is available up to 15 days before the departure date, with the advance refunded as Travello credit.",
      "Cancellations within 15 days of departure are non-refundable but may be transferred to another participant or rescheduled once, subject to availability.",
    ],
  },
  {
    id: "refund",
    title: "Refund Policy",
    body: [
      "Where a trek is cancelled by Travello due to weather or safety, you may choose a full refund of amounts paid or a credit towards a future trek.",
      "Refunds are processed to the original payment method within 7–10 working days.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    body: [
      "We collect only the information needed to process your booking and keep you safe on the trail. We never sell your personal data.",
      "This is a UI demonstration — no data entered into forms on this site is stored or transmitted to a server.",
    ],
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    body: [
      "We use essential cookies to remember your preferences and improve site performance. You can control cookies through your browser settings.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="The fine print, in plain language. Last updated June 2026."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      {/* Quick summary band */}
      <section className="border-b border-brand-100 bg-brand-50 py-10">
        <div className="section">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink/40">Key points at a glance</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {quickSummary.map((item) => (
              <div key={item.label} className="flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" aria-hidden="true" />
                <div>
                  <p className="text-[0.7rem] text-ink/45">{item.label}</p>
                  <p className="text-sm font-semibold text-ink">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section grid gap-10 lg:grid-cols-4">
          {/* On-page nav */}
          <nav aria-label="Sections" className="lg:col-span-1">
            <ul className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-1 text-sm">
              {sections.map((s) => {
                const Icon = sectionIcons[s.id];
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-ink/60 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {Icon && <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Content */}
          <div className="space-y-12 lg:col-span-3">
            {sections.map((s) => {
              const Icon = sectionIcons[s.id];
              return (
                <article key={s.id} id={s.id} className="scroll-mt-[calc(var(--header-h)+1.5rem)]">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                    <h2 className="text-2xl font-bold text-ink">{s.title}</h2>
                  </div>
                  <div className="mt-4 space-y-4 leading-relaxed text-ink/70">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </article>
              );
            })}

            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 text-sm text-ink/60">
              Questions about our policies?{" "}
              <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
                Contact our team
              </Link>{" "}
              — we usually reply within one business day.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
