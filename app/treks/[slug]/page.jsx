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

// Pre-render a static page per trek (great for SEO + speed).
export function generateStaticParams() {
  return getAllTreks().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }) {
  const trek = getTrekBySlug(params.slug);
  if (!trek) return { title: "Trek not found" };
  return {
    title: trek.name,
    description: trek.short,
    openGraph: { images: [{ url: trek.image }] },
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

export default function TrekDetailPage({ params }) {
  const trek = getTrekBySlug(params.slug);
  if (!trek) notFound();

  const related = getAllTreks()
    .filter((t) => t.slug !== trek.slug)
    .slice(0, 3);

  return (
    <main>
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

      {/* ── Related treks ────────────────────────────────────────────── */}
      <section className="bg-white py-16">
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
