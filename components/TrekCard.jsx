"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Mountain,
  Footprints,
  Star,
  Calendar,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { formatPrice, difficultyTone } from "@/lib/treks";

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 flex-shrink-0 text-brand-500" aria-hidden="true" />
      <span className="text-xs text-ink/60">
        <span className="font-semibold text-ink">{value}</span> {label}
      </span>
    </div>
  );
}

export default function TrekCard({ trek, priority = false }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((v) => !v);
  const onKeyToggle = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover ${
        expanded ? "border-brand-300 ring-1 ring-brand-200" : "border-brand-100"
      }`}
    >
      {/* Summary header — click / keyboard toggles the detail panel */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={toggle}
        onKeyDown={onKeyToggle}
        className="cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={trek.image}
            alt={`${trek.name} — ${trek.region}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 scrim-bottom" />

          {/* Difficulty + price chips */}
          <span
            className={`absolute left-4 top-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
              difficultyTone[trek.difficulty]
            }`}
          >
            {trek.difficulty}
          </span>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-ember-400 text-ember-400" aria-hidden="true" />
            {trek.rating}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="flex items-center gap-1.5 text-xs font-medium text-white/85">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {trek.region}
            </p>
            <h3 className="font-display text-xl font-bold leading-tight drop-shadow">
              {trek.name}
            </h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-ink/70 line-clamp-3">
            {trek.short}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat icon={Clock} value={trek.duration} label="" />
            <Stat icon={Mountain} value={`${trek.altitudeM}m`} label="alt." />
            <Stat icon={Footprints} value={`${trek.distanceKm} km`} label="trail" />
            <Stat icon={Calendar} value={trek.bestSeason} label="" />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-ink/50">From</span>
              <p className="font-display text-xl font-bold text-ink">
                {formatPrice(trek.price)}
                <span className="text-xs font-normal text-ink/50"> / person</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors group-hover:bg-brand-100">
              {expanded ? "Hide details" : "View details"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Expandable detail panel (0fr → 1fr grid trick = smooth height anim) */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-brand-100 px-5 pb-5 pt-5">
            <p className="text-sm leading-relaxed text-ink/75">{trek.long}</p>

            {/* Highlights */}
            <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-600">
              Trip highlights
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {trek.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-ink/75">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Itinerary preview */}
            <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-600">
              Itinerary
            </h4>
            <ol className="mt-3 space-y-3 border-l-2 border-brand-100 pl-4">
              {trek.itinerary.slice(0, 3).map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[1.32rem] top-1 h-2.5 w-2.5 rounded-full bg-brand-400 ring-4 ring-brand-50" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                    {step.day}
                  </p>
                  <p className="text-sm font-medium text-ink">{step.title}</p>
                  <p className="text-sm text-ink/60">{step.detail}</p>
                </li>
              ))}
            </ol>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/book?trek=${trek.slug}`}
                className="btn btn-md btn-primary flex-1"
              >
                Book this trek
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/treks/${trek.slug}`}
                className="btn btn-md btn-outline flex-1"
              >
                Full trip page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
