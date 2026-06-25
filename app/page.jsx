import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Leaf,
  Award,
  ArrowRight,
  Mountain,
} from "lucide-react";
import ParallaxHero from "@/components/ParallaxHero";
import TrekCard from "@/components/TrekCard";
import { getAllTreks } from "@/lib/treks";

const whyTravello = [
  {
    icon: ShieldCheck,
    title: "Safety first, always",
    body: "Certified leaders, oxygen & first-aid on every high-altitude trek, and weather-aware route calls.",
  },
  {
    icon: Users,
    title: "Small groups",
    body: "Capped batch sizes mean a better leader-to-trekker ratio and a lighter footprint on the trail.",
  },
  {
    icon: Award,
    title: "Local trek leaders",
    body: "Born-and-raised guides who know every ridge, shortcut and story along the way.",
  },
  {
    icon: Leaf,
    title: "Leave no trace",
    body: "Plastic-free trails, carry-back waste policy, and a give-back fund for mountain communities.",
  },
];

const stats = [
  { value: "120+", label: "Trek departures a year" },
  { value: "18K", label: "Happy trekkers" },
  { value: "40+", label: "Routes mapped" },
  { value: "4.9★", label: "Average rating" },
];

export default function HomePage() {
  const treks = getAllTreks();

  return (
    <>
      <ParallaxHero />

      {/* Everything below scrolls up over the fixed, blurring hero */}
      <div className="relative z-10">
        {/* Transparent spacer so the hero is fully visible on load */}
        <div className="h-screen" aria-hidden="true" />

        {/* ── Treks reveal section ─────────────────────────────────────── */}
        <section
          id="treks"
          className="relative rounded-t-[2.5rem] border-t border-white/60 bg-gradient-to-b from-white/10 via-white/15 to-white/35 pb-20 pt-16 shadow-[0_-24px_70px_-20px_rgba(2,23,41,0.55)] backdrop-blur-2xl backdrop-saturate-150"
        >
          {/* grab-handle flourish */}
          <div className="mx-auto mb-12 h-1.5 w-14 rounded-full bg-white/70" />

          <div className="section">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">
                <Mountain className="h-4 w-4" aria-hidden="true" />
                Featured Expeditions
              </span>
              <h2 className="mt-4 text-balance text-4xl font-extrabold text-ink sm:text-5xl">
                Pick your next adventure
              </h2>
              <p className="mt-4 text-balance text-lg text-ink/65">
                Hand-picked trails across the Sahyadris and the Himalayas. Tap any
                card to unfold the full itinerary.
              </p>
            </div>

            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {treks.map((trek, i) => (
                <TrekCard key={trek.slug} trek={trek} priority={i < 3} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link href="/treks" className="btn btn-lg btn-secondary">
                Explore all treks
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why Travello ─────────────────────────────────────────────── */}
        <section id="why" className="bg-white py-20">
          <div className="section">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Why Travello</span>
              <h2 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
                Trek with people who get it
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyTravello.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-brand-100 bg-brand-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────────────────── */}
        <section className="bg-ink py-16">
          <div className="section">
            <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-sm text-brand-200/80">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="section">
            <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 text-center shadow-glow sm:px-16">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ember-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
              <h2 className="relative text-balance text-4xl font-extrabold text-white sm:text-5xl">
                Ready for your next summit?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-balance text-lg text-brand-100/85">
                Spots fill fast in peak season. Reserve your trek today — pay only a
                small advance to lock your place.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/book" className="btn btn-lg btn-primary">
                  Book a trek
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="btn btn-lg btn-ghost">
                  Talk to an expert
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
