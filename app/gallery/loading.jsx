export default function GalleryLoading() {
  return (
    <main>
      {/* PageHero skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink pb-14 pt-[calc(var(--header-h)+3rem)]">
        <div className="section">
          <div className="h-3 w-16 animate-pulse rounded-full bg-white/20" />
          <div className="mt-4 h-10 w-72 animate-pulse rounded-2xl bg-white/15" />
          <div className="mt-3 h-5 w-96 animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>

      <section className="bg-brand-50 py-16">
        <div className="section">
          {/* Filter pills skeleton */}
          <div className="mb-8 flex gap-2">
            {[50, 90, 70, 80, 60].map((w, i) => (
              <div key={i} className="h-8 animate-pulse rounded-full bg-white/80" style={{ width: `${w}px` }} />
            ))}
          </div>
          {/* Masonry skeleton — 3 columns of varying height cards */}
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {[260, 180, 320, 200, 280, 150, 300, 190, 240].map((h, i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl bg-brand-100"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
