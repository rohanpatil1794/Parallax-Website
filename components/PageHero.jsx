import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Banner used at the top of interior pages. Includes top padding so content
// clears the fixed header, plus an optional breadcrumb trail.
export default function PageHero({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink pb-14 pt-[calc(var(--header-h)+3rem)]">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-ember-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />

      <div className="section relative">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-200/80">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-brand-300/60" aria-hidden="true" />
                  )}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-400">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-balance text-lg text-brand-100/80">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
