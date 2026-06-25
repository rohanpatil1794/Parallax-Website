import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact us",
  description: "Questions about a trek, a booking or a custom expedition? Talk to the Travello team.",
};

const contactCards = [
  { icon: Phone, label: "Call us", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s+/g, "")}` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Visit", value: siteConfig.address, href: null },
  { icon: Clock, label: "Hours", value: siteConfig.hours, href: null },
];

const faqs = [
  {
    q: "Do I need prior trekking experience?",
    a: "Not for our Easy and most Moderate treks — they're built for first-timers. Each trek page lists a fitness grade so you can pick the right challenge.",
  },
  {
    q: "What's included in the price?",
    a: "Certified guides, permits, meals on the trek, and shared camping/stay as listed on each trek. Travel to the base village is usually separate.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Free cancellation up to 15 days before departure. Within 15 days, the advance is convertible to a credit for any future Travello trek.",
  },
  {
    q: "How do payments work?",
    a: "You pay a 25% advance to lock your spot via UPI, credit or debit card, and settle the balance when you reach base camp.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact us"
        title="Let's plan your next trek"
        subtitle="Whether it's a quick question or a fully custom expedition, we're here to help you get on the trail."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
      />

      <section className="bg-brand-50 py-16">
        <div className="section grid gap-10 lg:grid-cols-2">
          {/* Left: info + map placeholder */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => {
                const content = (
                  <>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="mt-3">
                      <p className="text-xs uppercase tracking-wide text-ink/45">{card.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-ink">{card.value}</p>
                    </div>
                  </>
                );
                return card.href ? (
                  <a
                    key={card.label}
                    href={card.href}
                    className="rounded-3xl border border-brand-100 bg-white p-5 shadow-card transition-colors hover:border-brand-200"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={card.label} className="rounded-3xl border border-brand-100 bg-white p-5 shadow-card">
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 flex h-64 items-center justify-center rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-100 to-brand-200 text-center text-brand-700">
              <div>
                <MapPin className="mx-auto h-8 w-8" aria-hidden="true" />
                <p className="mt-2 text-sm font-medium">Map embed goes here</p>
                <p className="text-xs text-brand-700/70">Pune · Maharashtra</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>
      </section>

      {/* FAQs (#faqs) */}
      <section id="faqs" className="bg-white py-20">
        <div className="section max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              FAQs
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-brand-100 bg-brand-50/50 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-ink">
                  {faq.q}
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-white text-brand-700 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
