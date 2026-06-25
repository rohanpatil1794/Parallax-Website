"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

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

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  return (
    <>
      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setActive(i)}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-3xl shadow-card focus-visible:ring-2 focus-visible:ring-ember-500"
          >
            <Image
              src={item.src}
              alt={item.title}
              width={800}
              height={i % 3 === 0 ? 1000 : 600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 p-4 animate-fade-in"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>

          <figure
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[active].src}
              alt={items[active].title}
              width={1400}
              height={900}
              sizes="100vw"
              className="mx-auto max-h-[80vh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-white">
              <p className="font-display text-xl font-bold">{items[active].title}</p>
              <p className="text-sm text-white/70">{items[active].location}</p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
