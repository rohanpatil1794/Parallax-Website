import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Leaf,
  Award,
  ArrowRight,
  Mountain,
  Star,
  Quote,
  Search,
  CreditCard,
  Backpack,
  Flag,
  Snowflake,
  Sun,
  CloudRain,
  Wind,
  TrendingUp,
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

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "Pick your trail",
    body: "Browse by difficulty, region or season. Expand any card to read the full itinerary before committing.",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Reserve with 25%",
    body: "Lock your spot with a small advance via UPI or card. No hidden fees — the balance is paid at base camp.",
  },
  {
    step: "03",
    icon: Backpack,
    title: "We prep you",
    body: "Get a personalised kit list, pre-trek briefing call, and a WhatsApp group with your guide team.",
  },
  {
    step: "04",
    icon: Flag,
    title: "Reach your summit",
    body: "Show up, breathe deep, and follow your guide. We handle the rest — permits, camps, meals, safety.",
  },
];

const seasons = [
  {
    icon: CloudRain,
    name: "Monsoon",
    months: "June – Sep",
    highlight: "Valley of Flowers, Har Ki Dun",
    active: true,
    color: "bg-emerald-500",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    ringColor: "ring-emerald-200",
  },
  {
    icon: Sun,
    name: "Summer",
    months: "Mar – Jun",
    highlight: "Kedarkantha, Brahmatal",
    active: false,
    color: "bg-amber-400",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    ringColor: "ring-amber-200",
  },
  {
    icon: Snowflake,
    name: "Winter",
    months: "Nov – Feb",
    highlight: "Kedarkantha, Kuari Pass",
    active: false,
    color: "bg-sky-400",
    textColor: "text-sky-700",
    bgColor: "bg-sky-50",
    ringColor: "ring-sky-200",
  },
  {
    icon: Wind,
    name: "Autumn",
    months: "Sep – Nov",
    highlight: "Hampta Pass, Pin Bhaba",
    active: false,
    color: "bg-orange-400",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    ringColor: "ring-orange-200",
  },
];

const testimonials = [
  {
    name: "Priya Menon",
    trek: "Kedarkantha Summit",
    rating: 5,
    quote:
      "The Kedarkantha winter trek was absolutely magical. Our guide Rajan knew every shortcut and kept spirits high even at -12°C. Would do it all over again.",
    location: "Bengaluru",
  },
  {
    name: "Arjun Sharma",
    trek: "Hampta Pass Crossing",
    rating: 5,
    quote:
      "I was terrified of altitude before this trip. The Travello team acclimatised us so well that crossing Hampta Pass at 4,270 m felt completely achievable.",
    location: "Mumbai",
  },
  {
    name: "Sneha Kulkarni",
    trek: "Valley of Flowers",
    rating: 5,
    quote:
      "The Valley of Flowers was a dream. Small group of 8, plastic-free camp, and a guide who could name every wildflower. Exactly what I was looking for.",
    location: "Pune",
  },
];

export default async function HomePage() {
  const treks = await getAllTreks();

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

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section className="bg-brand-50 py-20">
          <div className="section">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How it works</span>
              <h2 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
                Summit in four steps
              </h2>
              <p className="mt-4 text-balance text-lg text-ink/60">
                From browsing to base camp — here's exactly what happens when you book with Travello.
              </p>
            </div>
            <div className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, i) => (
                <div key={step.step} className="relative flex flex-col items-center px-6 text-center">
                  {i < howItWorks.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-brand-100 lg:block" aria-hidden="true" />
                  )}
                  <span className="relative z-10 mb-5 grid h-16 w-16 place-items-center rounded-2xl border-2 border-brand-200 bg-white text-brand-700 shadow-card">
                    <step.icon className="h-7 w-7" aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ember-500 text-[0.65rem] font-bold text-white">
                      {step.step}
                    </span>
                  </span>
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Seasons ──────────────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="section">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                Trek by season
              </span>
              <h2 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
                Every season has a summit
              </h2>
              <p className="mt-4 text-balance text-lg text-ink/60">
                The Himalayas are spectacular year-round. Pick the season that fits your schedule.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {seasons.map((s) => (
                <div
                  key={s.name}
                  className={`relative overflow-hidden rounded-3xl border p-6 ${
                    s.active
                      ? `border-emerald-200 ${s.bgColor} shadow-sm`
                      : "border-brand-100 bg-brand-50/40"
                  }`}
                >
                  {s.active && (
                    <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[0.65rem] font-bold text-white">
                      NOW OPEN
                    </span>
                  )}
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${s.bgColor} ring-1 ${s.ringColor} ${s.textColor}`}
                  >
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{s.name}</h3>
                  <p className="text-xs font-semibold text-ink/45">{s.months}</p>
                  <p className="mt-2 text-sm text-ink/65">{s.highlight}</p>
                  {s.active && (
                    <Link
                      href="/treks"
                      className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${s.textColor} hover:underline`}
                    >
                      View open treks
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              ))}
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

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <section className="bg-brand-50 py-20">
          <div className="section">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">
                <Star className="h-4 w-4 fill-ember-400 text-ember-400" aria-hidden="true" />
                Trekker stories
              </span>
              <h2 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
                Heard from the trail
              </h2>
              <p className="mt-4 text-balance text-lg text-ink/60">
                Real words from trekkers who've stood on real summits with us.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="relative flex flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-card"
                >
                  <Quote className="h-8 w-8 text-brand-200" aria-hidden="true" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                    {t.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-ember-400 text-ember-400" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="mt-4 border-t border-brand-100 pt-4">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink/50">{t.trek} · {t.location}</p>
                  </div>
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
