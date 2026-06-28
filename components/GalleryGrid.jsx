"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from "lucide-react";

export default function GalleryGrid({ items }) {
  const [active, setActive] = useState(null); // index | null
  const isOpen = active !== null;

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prev_ = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev_;
    };
  }, [isOpen, close, prev, next]);

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setActive(i)}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl shadow-card focus-visible:ring-2 focus-visible:ring-ember-500"
            aria-label={`Open ${item.title}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={800}
              height={i % 3 === 0 ? 1000 : 600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            {/* Zoom icon */}
            <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
              <h3 className="font-display text-lg font-bold drop-shadow">{item.title}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-white/80">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {item.location}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${items[active].title} — enlarged`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/97 p-4"
          onClick={close}
        >
          {/* Counter */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {active + 1} / {items.length}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>

          {/* Image */}
          <figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[active].src}
              alt={items[active].title}
              width={1600}
              height={1000}
              sizes="100vw"
              priority
              className="mx-auto max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-5 text-center text-white">
              <p className="font-display text-xl font-bold">{items[active].title}</p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/65">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {items[active].location}
              </p>
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
