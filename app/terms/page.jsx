import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms & Conditions",
  description: "Travello's terms of service, privacy, refund and cookie policies.",
};

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

      <section className="bg-white py-16">
        <div className="section grid gap-10 lg:grid-cols-4">
          {/* On-page nav */}
          <nav aria-label="Sections" className="lg:col-span-1">
            <ul className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-3 py-2 text-ink/60 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="space-y-12 lg:col-span-3">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-[calc(var(--header-h)+1.5rem)]">
                <h2 className="text-2xl font-bold text-ink">{s.title}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-ink/70">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
