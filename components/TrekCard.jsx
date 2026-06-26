"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  ArrowRight,
  X,
  Users,
} from "lucide-react";
import { formatPrice, difficultyTone } from "@/lib/treks";

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 flex-shrink-0 text-brand-500" aria-hidden="true" />
      <span className="text-xs text-ink/60">
        <span className="font-semibold text-ink">{value}</span>
        {label ? ` ${label}` : ""}
      </span>
    </div>
  );
}

function TrekModal({ trek, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={trek.name}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-ink/65 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
        style={{
          maxHeight: "88vh",
          animation: "pop-in 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white shadow-md text-ink transition hover:bg-brand-50 hover:text-brand-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ── LEFT: static overview ─────────────────────────────── */}
        <div className="flex w-64 flex-shrink-0 flex-col overflow-hidden border-r border-brand-100 md:w-72">
          {/* Image */}
          <div className="relative h-52 flex-shrink-0">
            <Image
              src={trek.image}
              alt={trek.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 scrim-bottom" />
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${difficultyTone[trek.difficulty]}`}
            >
              {trek.difficulty}
            </span>
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur">
              <Star className="h-3 w-3 fill-ember-400 text-ember-400" aria-hidden="true" />
              {trek.rating}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="flex items-center gap-1 text-xs text-white/80">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {trek.region}
              </p>
              <h3 className="font-display text-lg font-bold drop-shadow">
                {trek.name}
              </h3>
            </div>
          </div>

          {/* Stats + CTAs (scrollable if needed) */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            <p className="text-xs italic text-ink/55">{trek.tagline}</p>

            <div className="space-y-2.5">
              <Stat icon={Clock} value={trek.duration} label="" />
              <Stat icon={Mountain} value={`${trek.altitudeM}m`} label="altitude" />
              <Stat icon={Footprints} value={`${trek.distanceKm} km`} label="trail" />
              <Stat icon={Calendar} value={trek.bestSeason} label="season" />
              <Stat icon={Users} value={trek.groupSize} label="" />
            </div>

            <div className="mt-auto border-t border-brand-100 pt-4">
              <p className="text-xs text-ink/50">From</p>
              <p className="font-display text-2xl font-bold text-ink">
                {formatPrice(trek.price)}
                <span className="text-xs font-normal text-ink/40"> / person</span>
              </p>
            </div>

            <div className="space-y-2.5">
              <Link
                href={`/book?trek=${trek.slug}`}
                onClick={onClose}
                className="btn btn-md btn-primary w-full"
              >
                Book this trek
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/treks/${trek.slug}`}
                onClick={onClose}
                className="btn btn-md btn-outline w-full"
              >
                Full trip page
              </Link>
            </div>
          </div>
        </div>

        {/* ── RIGHT: scrollable long details ────────────────────── */}
        <div className="flex-1 overflow-y-auto px-7 py-7">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            {trek.name}
          </h2>
          <p className="mt-0.5 text-sm text-brand-500">{trek.location}</p>

          <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/75">
            {trek.long}
          </p>

          {/* What's included */}
          <h4 className="mt-7 text-xs font-semibold uppercase tracking-widest text-brand-600">
            What's included
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {trek.inclusions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink/70"
              >
                <Check
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Highlights */}
          <h4 className="mt-7 text-xs font-semibold uppercase tracking-widest text-brand-600">
            Trip highlights
          </h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {trek.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-ink/70"
              >
                <Check
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Full itinerary */}
          <h4 className="mt-7 text-xs font-semibold uppercase tracking-widest text-brand-600">
            Itinerary
          </h4>
          <ol className="mt-3 space-y-4 border-l-2 border-brand-100 pl-5">
            {trek.itinerary.map((step, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.45rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-400 ring-4 ring-white" />
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {step.day}
                </p>
                <p className="text-sm font-semibold text-ink">{step.title}</p>
                <p className="mt-0.5 text-sm text-ink/60">{step.detail}</p>
              </li>
            ))}
          </ol>

          <div className="h-6" />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TrekCard({ trek, priority = false }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:border-brand-300 hover:shadow-card-hover">
        {/* Image */}
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
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${difficultyTone[trek.difficulty]}`}
          >
            {trek.difficulty}
          </span>
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
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

        {/* Card body */}
        <div className="flex flex-1 flex-col p-5">
          <p className="line-clamp-3 text-sm leading-relaxed text-ink/70">
            {trek.short}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat icon={Clock} value={trek.duration} label="" />
            <Stat icon={Mountain} value={`${trek.altitudeM}m`} label="alt." />
            <Stat icon={Footprints} value={`${trek.distanceKm} km`} label="trail" />
            <Stat icon={Calendar} value={trek.bestSeason} label="" />
          </div>

          <div className="mt-auto flex items-center justify-between pt-5">
            <div>
              <span className="text-xs text-ink/50">From</span>
              <p className="font-display text-xl font-bold text-ink">
                {formatPrice(trek.price)}
                <span className="text-xs font-normal text-ink/50"> / person</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
            >
              View details
            </button>
          </div>
        </div>
      </article>

      {open && <TrekModal trek={trek} onClose={() => setOpen(false)} />}
    </>
  );
}
