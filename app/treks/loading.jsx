export default function TreksLoading() {
  return (
    <main>
      {/* PageHero skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink pb-14 pt-[calc(var(--header-h)+3rem)]">
        <div className="section">
          <div className="h-3 w-16 animate-pulse rounded-full bg-white/20" />
          <div className="mt-4 h-10 w-80 animate-pulse rounded-2xl bg-white/15" />
          <div className="mt-3 h-5 w-64 animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>

      <section className="bg-brand-50 py-16">
        <div className="section">
          {/* Search bar skeleton */}
          <div className="mb-8 h-12 w-full animate-pulse rounded-2xl bg-white/70" />
          {/* Filter pills */}
          <div className="mb-6 flex gap-2">
            {[80, 60, 90, 70].map((w, i) => (
              <div
                key={i}
                className="h-8 animate-pulse rounded-full bg-white/70"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          {/* Cards grid */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card"
              >
                <div className="aspect-[4/3] animate-pulse bg-brand-100" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-brand-50" />
                  <div className="h-3 w-full animate-pulse rounded bg-brand-50" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-brand-50" />
                  <div className="mt-4 flex justify-between">
                    <div className="h-6 w-24 animate-pulse rounded bg-brand-50" />
                    <div className="h-8 w-28 animate-pulse rounded-full bg-brand-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
