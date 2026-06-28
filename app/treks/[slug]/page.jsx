import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Mountain,
  Footprints,
  Calendar,
  Users,
  TrendingUp,
  Star,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  getAllTreks,
  getTrekBySlug,
  formatPrice,
  difficultyTone,
} from "@/lib/treks";
import ShareButton from "@/components/ShareButton";

const DIFFICULTY_METER = { Easy: 1, Moderate: 2, Challenging: 3 };
const PACKING_ESSENTIALS = [
  "Layered warm clothing (fleece + windproof jacket)",
  "Sturdy ankle-support trekking boots",
  "Rain poncho or waterproof jacket",
  "Sunscreen SPF 50+, lip balm, and UV sunglasses",
  "Headlamp with spare batteries",
  "Reusable water bottle (2 L minimum)",
  "Personal first-aid kit and blister pads",
  "High-energy snacks (nuts, energy bars)",
  "Quick-dry towel and biodegradable soap",
  "Trekking poles (optional, highly recommended for knees)",
];

// Pre-render a static page per trek (great for SEO + speed).
export async function generateStaticParams() {
  const treks = await getAllTreks();
  return treks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const trek = await getTrekBySlug(params.slug);
  if (!trek) return { title: "Trek not found" };
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://travello.com";
  return {
    title: trek.name,
    description: trek.short,
    openGraph: {
      title: `${trek.name} · Travello`,
      description: trek.short,
      images: [{ url: trek.image, width: 1200, height: 630, alt: trek.name }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${trek.name} · Travello`,
      description: trek.short,
      images: [trek.image],
    },
    alternates: { canonical: `${base}/treks/${trek.slug}` },
  };
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3">
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[0.7rem] uppercase tracking-wide text-ink/45">{label}</p>
        <p className="truncate text-sm font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

export default async function TrekDetailPage({ params }) {
  const trek = await getTrekBySlug(params.slug);
  if (!trek) notFound();

  const related = (await getAllTreks())
    .filter((t) => t.slug !== trek.slug)
    .slice(0, 3);

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://travello.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: trek.name,
    description: trek.long || trek.short,
    image: trek.image,
    url: `${base}/treks/${trek.slug}`,
    touristType: "Adventure tourism",
    geo: { "@type": "GeoCoordinates" },
    offers: {
      "@type": "Offer",
      price: trek.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${base}/book?trek=${trek.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: trek.rating,
      bestRating: 5,
      ratingCount: trek.reviews ?? 100,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Image banner ─────────────────────────────────────────────── */}
      <section className="relative min-h-[68vh] w-full overflow-hidden">
        <Image
          src={trek.image}
          alt={`${trek.name} — ${trek.region}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />

        <div className="section relative flex min-h-[68vh] flex-col justify-end pb-12 pt-[calc(var(--header-h)+2rem)]">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <Link href="/treks" className="transition-colors hover:text-white">Treks</Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="text-white">{trek.name}</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                difficultyTone[trek.difficulty]
              }`}
            >
              {trek.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-ember-400 text-ember-400" aria-hidden="true" />
              {trek.rating} · {trek.reviews} reviews
            </span>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-white/85">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {trek.region}
          </p>
          <h1 className="mt-1 max-w-3xl text-balance text-4xl font-extrabold text-white sm:text-6xl">
            {trek.name}
          </h1>
          <p className="mt-3 max-w-2xl text-balance text-lg text-white/80">
            {trek.tagline}
          </p>
          <div className="mt-6">
            <ShareButton title={trek.name} />
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-50 py-14">
        <div className="section grid gap-10 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Fact icon={Clock} label="Duration" value={trek.duration} />
              <Fact icon={Mountain} label="Max altitude" value={`${trek.altitudeM} m`} />
              <Fact icon={Footprints} label="Distance" value={`${trek.distanceKm} km`} />
              <Fact icon={TrendingUp} label="Fitness" value={trek.grade} />
              <Fact icon={Calendar} label="Best season" value={trek.bestSeason} />
              <Fact icon={Users} label="Group size" value={trek.groupSize} />
            </div>

            {/* Overview */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">Overview</h2>
              <p className="mt-4 leading-relaxed text-ink/75">{trek.long}</p>
            </div>

            {/* Highlights */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">Trip highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {trek.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-4 text-sm text-ink/75"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">Day-by-day itinerary</h2>
              <ol className="mt-6 space-y-6 border-l-2 border-brand-200 pl-6">
                {trek.itinerary.map((step, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[1.72rem] top-1 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-[0.65rem] font-bold text-white ring-4 ring-brand-50">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                      {step.day}
                    </p>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-ink/65">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Inclusions */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">What's included</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {trek.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-sm text-ink/75">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" aria-hidden="true" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Difficulty + altitude at a glance */}
            <div className="mt-10 rounded-3xl border border-brand-100 bg-white p-6">
              <h2 className="text-lg font-bold text-ink">At a glance</h2>

              {/* Difficulty bar */}
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-ink/55">
                  <span>Difficulty</span>
                  <span className="font-semibold text-ink">{trek.difficulty}</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-2.5 flex-1 rounded-full transition-colors ${
                        lvl <= (DIFFICULTY_METER[trek.difficulty] ?? 1)
                          ? trek.difficulty === "Challenging"
                            ? "bg-rose-500"
                            : trek.difficulty === "Moderate"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                          : "bg-brand-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Altitude visualizer */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-ink/55">
                  <span>Max altitude</span>
                  <span className="font-semibold text-ink">{trek.altitudeM} m</span>
                </div>
                <div className="relative h-2.5 overflow-hidden rounded-full bg-brand-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    style={{ width: `${Math.min(100, (trek.altitudeM / 6000) * 100)}%` }}
                    title={`${trek.altitudeM} m of 6000 m scale`}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[0.6rem] text-ink/35">
                  <span>Sea level</span>
                  <span>5000 m (tree line)</span>
                  <span>6000+ m</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-ink/55">
                {trek.difficulty === "Easy" && "Suitable for beginners. Moderate fitness required. No prior trekking experience needed."}
                {trek.difficulty === "Moderate" && "Requires reasonable fitness. Some steep sections and multi-day effort. Beginners with preparation are welcome."}
                {trek.difficulty === "Challenging" && "High altitude, long days, and demanding terrain. Prior trekking experience strongly recommended."}
              </p>
            </div>

            {/* Packing list */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-ink">What to pack</h2>
              <p className="mt-2 text-sm text-ink/55">
                Your Travello guide will share a detailed kit list after booking. Here are the essentials for most of our treks:
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {PACKING_ESSENTIALS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)] rounded-3xl border border-brand-100 bg-white p-6 shadow-card">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-ink/50">Starting from</p>
                  <p className="font-display text-3xl font-extrabold text-ink">
                    {formatPrice(trek.price)}
                  </p>
                  <p className="text-xs text-ink/50">per person · taxes extra</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">
                  <Star className="h-3.5 w-3.5 fill-ember-400 text-ember-400" aria-hidden="true" />
                  {trek.rating}
                </span>
              </div>

              <Link
                href={`/book?trek=${trek.slug}`}
                className="btn btn-lg btn-primary mt-6 w-full"
              >
                Book this trek
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn btn-md btn-outline mt-3 w-full">
                Have a question?
              </Link>

              <dl className="mt-6 space-y-3 border-t border-brand-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/55">Duration</dt>
                  <dd className="font-semibold text-ink">{trek.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/55">Difficulty</dt>
                  <dd className="font-semibold text-ink">{trek.difficulty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/55">Best season</dt>
                  <dd className="font-semibold text-ink">{trek.bestSeason}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/55">Group size</dt>
                  <dd className="font-semibold text-ink">{trek.groupSize}</dd>
                </div>
              </dl>

              <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
                Free cancellation up to 15 days before departure.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Sticky mobile booking bar ────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-sm items-center justify-between gap-3">
          <div>
            <p className="text-[0.7rem] text-ink/50">Starting from</p>
            <p className="font-display text-xl font-bold text-ink">
              {formatPrice(trek.price)}
              <span className="text-xs font-normal text-ink/45"> /person</span>
            </p>
          </div>
          <Link href={`/book?trek=${trek.slug}`} className="btn btn-md btn-primary flex-shrink-0">
            Book now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ── Related treks ────────────────────────────────────────────── */}
      <section className="bg-white pb-28 pt-16 md:py-16">
        <div className="section">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">You might also like</h2>
            <Link
              href="/treks"
              className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex"
            >
              All treks
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/treks/${t.slug}`}
                className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-ink/50">{t.region}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-brand-700">
                    {formatPrice(t.price)}
                    <span className="font-normal text-ink/45"> / person</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/treks"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all treks
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
