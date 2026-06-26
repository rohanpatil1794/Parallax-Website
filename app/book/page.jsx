import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import { getAllTreks } from "@/lib/treks";

export const metadata = {
  title: "Book a Trek",
  description:
    "Reserve your spot on a Travello expedition. Pay a small advance via UPI, credit or debit card.",
};

function FormFallback() {
  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-8 lg:col-span-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-3xl bg-white/70" />
        ))}
      </div>
      <div className="lg:col-span-2">
        <div className="h-96 animate-pulse rounded-3xl bg-white/70" />
      </div>
    </div>
  );
}

export default function BookPage() {
  const treks = getAllTreks();
  return (
    <main>
      <PageHero
        eyebrow="Secure your spot"
        title="Book your trek"
        subtitle="Lock your place with a 25% advance — pay the rest when you arrive at base camp."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book" }]}
      />

      <section className="bg-brand-50 py-16">
        <div className="section">
          <Suspense fallback={<FormFallback />}>
            <BookingForm treks={treks} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
