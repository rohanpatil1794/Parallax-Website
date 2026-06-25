"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Compass } from "lucide-react";
import s from "./ParallaxHero.module.css";

// Layer manifest — ported 1:1 from the original index.html / style.css.
// `cls` maps to a class in ParallaxHero.module.css; speed values drive the
// per-frame transform applied in `update()`.
const BACK_LAYERS = [
  { src: "/parallax/background.png", cls: "bgImg", sx: 0.2, sy: 0.1, sz: 0, r: 0 },
  { src: "/parallax/fog_7.png", cls: "fog7", sx: 0.25, sy: 0.15, sz: 0.05, r: 0.02 },
  { src: "/parallax/mountain_10.png", cls: "mountain10", sx: 0.3, sy: 0.2, sz: 0.1, r: 0.03 },
  { src: "/parallax/fog_6.png", cls: "fog6", sx: 0.35, sy: 0.22, sz: 0.12, r: 0.03 },
  { src: "/parallax/mountain_9.png", cls: "mountain9", sx: 0.4, sy: 0.25, sz: 0.14, r: 0.04 },
  { src: "/parallax/mountain_8.png", cls: "mountain8", sx: 0.45, sy: 0.28, sz: 0.16, r: 0.05 },
  { src: "/parallax/fog_5.png", cls: "fog5", sx: 0.48, sy: 0.3, sz: 0.17, r: 0.05 },
  { src: "/parallax/mountain_7.png", cls: "mountain7", sx: 0.5, sy: 0.32, sz: 0.18, r: 0.06 },
];

const FRONT_LAYERS = [
  { src: "/parallax/mountain_6.png", cls: "mountain6", sx: 0.55, sy: 0.35, sz: 0.2, r: 0.06 },
  { src: "/parallax/fog_4.png", cls: "fog4", sx: 0.58, sy: 0.37, sz: 0.22, r: 0.07 },
  { src: "/parallax/mountain_5.png", cls: "mountain5", sx: 0.6, sy: 0.3, sz: 0.24, r: 0.07 },
  { src: "/parallax/fog_3.png", cls: "fog3", sx: 0.63, sy: 0.42, sz: 0.26, r: 0.08 },
  { src: "/parallax/mountain_4.png", cls: "mountain4", sx: 0.5, sy: 0.28, sz: 0.28, r: 0.08 },
  { src: "/parallax/mountain_3.png", cls: "mountain3", sx: 0.4, sy: 0.48, sz: 0.3, r: 0.09 },
  { src: "/parallax/fog_2.png", cls: "fog2", sx: 0.73, sy: 0.5, sz: 0.32, r: 0.09 },
  { src: "/parallax/mountain_2.png", cls: "mountain2", sx: 0.4, sy: 0.52, sz: 0.34, r: 0.1 },
  { src: "/parallax/mountain_1.png", cls: "mountain1", sx: 0.1, sy: 0.55, sz: 0.36, r: 0.1 },
  { src: "/parallax/sun_rays.png", cls: "sunRays", sx: 0.4, sy: 0.25, sz: 0, r: 0.06 },
];

function Layer({ layer }) {
  return (
    <img
      src={layer.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      data-parallax
      data-speedx={layer.sx}
      data-speedy={layer.sy}
      data-speedz={layer.sz}
      data-rotation={layer.r}
      className={`${s.parallax} ${s[layer.cls]}`}
    />
  );
}

export default function ParallaxHero() {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    if (!hero || !scene) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const layers = Array.from(scene.querySelectorAll("[data-parallax]"));

    // Cache each layer's computed `left` (px) so we don't hit getComputedStyle
    // on every pointer move. Recomputed on resize.
    let lefts = new Map();
    const measure = () => {
      layers.forEach((el) =>
        lefts.set(el, parseFloat(getComputedStyle(el).left) || 0)
      );
    };
    measure();

    let xvalue = 0;
    let yvalue = 0;
    let rotateDegree = 0;

    // Core parallax transform — the same maths as the original app.js.
    const update = (cursorPosition) => {
      layers.forEach((el) => {
        const speedx = el.dataset.speedx;
        const speedy = el.dataset.speedy;
        const speedz = el.dataset.speedz;
        const rotateSpeed = el.dataset.rotation;
        const left = lefts.get(el) ?? 0;
        const isInLeft = left < window.innerWidth / 2 ? 1 : -1;
        const zvalue = (cursorPosition - left) * isInLeft * 0.1;

        el.style.transform =
          `translateX(calc(-50% + ${xvalue * speedx}px)) ` +
          `translateY(calc(-50% + ${yvalue * speedy}px)) ` +
          `perspective(2300px) translateZ(${zvalue * speedz}px) ` +
          `rotateY(${rotateDegree * rotateSpeed}deg) scale(1.15)`;
      });
    };

    update(window.innerWidth / 2);

    // ---- Pointer parallax (desktop only, respects reduced-motion) --------
    let pointerRaf = 0;
    const onPointerMove = (e) => {
      if (pointerRaf) return;
      pointerRaf = requestAnimationFrame(() => {
        xvalue = e.clientX - window.innerWidth / 2;
        yvalue = e.clientY - window.innerHeight / 2;
        rotateDegree = (xvalue / (window.innerWidth / 2)) * 20;
        update(e.clientX);
        pointerRaf = 0;
      });
    };

    if (finePointer && !prefersReduced) {
      window.addEventListener("mousemove", onPointerMove);
    }

    // ---- Scroll-driven blur / fade reveal --------------------------------
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        const blur = (prefersReduced ? 6 : 16) * progress;
        const scale = 1 + progress * 0.12;
        const opacity = 1 - progress * 0.6;
        hero.style.filter = `blur(${blur}px)`;
        hero.style.transform = `scale(${scale})`;
        hero.style.opacity = `${Math.max(opacity, 0)}`;
        if (cueRef.current) {
          cueRef.current.style.opacity = `${Math.max(1 - progress * 2.5, 0)}`;
        }
        scrollRaf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      measure();
      update(window.innerWidth / 2);
    };
    window.addEventListener("resize", onResize);

    // ---- GSAP entrance — random staggered fade-in (ported from app.js) ----
    let ctx;
    let cancelled = false;
    if (!prefersReduced) {
      import("gsap").then(({ gsap }) => {
        if (cancelled) return;
        ctx = gsap.context(() => {
          const tl = gsap.timeline();
          tl.set(layers, { opacity: 0, scale: 1.38 })
            .to(layers, {
              opacity: 1,
              scale: 1.15,
              duration: 1.5,
              ease: "power2.out",
              stagger: { amount: 2, from: "random" },
            })
            .from(
              '[data-anim="eyebrow"]',
              { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" },
              "-=1.4"
            )
            .from(
              '[data-anim="title-1"]',
              { x: -240, opacity: 0, duration: 1, ease: "back.out(1.7)" },
              "-=1"
            )
            .from(
              '[data-anim="title-2"]',
              { x: 240, opacity: 0, duration: 1, ease: "back.out(1.7)" },
              "-=0.8"
            )
            .from(
              '[data-anim="sub"], [data-anim="cta"]',
              { y: 24, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" },
              "-=0.6"
            );
        }, hero);
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (pointerRaf) cancelAnimationFrame(pointerRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Fixed, full-viewport scene. Page content scrolls up and over it. */}
      <div
        ref={heroRef}
        className="fixed inset-0 z-0 origin-center bg-[#353535] will-change-transform"
        aria-label="Mountain expedition hero scene"
      >
        <div ref={sceneRef} className={s.scene}>
          {BACK_LAYERS.map((l) => (
            <Layer key={l.cls} layer={l} />
          ))}

          {/* Hero copy lives between the back and front mountain layers */}
          <div className={s.heroText}>
            <p
              data-anim="eyebrow"
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 ring-1 ring-inset ring-white/25 backdrop-blur"
              style={{ pointerEvents: "auto" }}
            >
              <Compass className="h-3.5 w-3.5 text-ember-400" aria-hidden="true" />
              Travello Expeditions
            </p>
            <h2
              data-anim="title-1"
              className="font-display text-[clamp(1.5rem,5.5vw,3.75rem)] font-light uppercase leading-none tracking-[0.25em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]"
            >
              Welcome to
            </h2>
            <h1
              data-anim="title-2"
              className="font-display text-[clamp(2rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.85] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
            >
              Maharashtra
            </h1>
            <p
              data-anim="sub"
              className="mx-auto mt-6 max-w-xl text-balance text-base font-light text-white/80 sm:text-lg"
            >
              Guided treks across the Sahyadris and the Himalayas. Real trails,
              certified leaders, and views worth every step.
            </p>
            <div
              data-anim="cta"
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ pointerEvents: "auto" }}
            >
              <a href="#treks" className="btn btn-lg btn-primary">
                Explore Treks
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/book" className="btn btn-lg btn-ghost">
                Plan a trek
              </Link>
            </div>
          </div>

          {FRONT_LAYERS.map((l) => (
            <Layer key={l.cls} layer={l} />
          ))}

          {/* Static foreground layers (not part of the pointer parallax) */}
          <img
            src="/parallax/black_shadow.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className={s.blackShadow}
          />
          <img
            src="/parallax/fog_1.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            data-parallax
            data-speedx="0.3"
            data-speedy="0.6"
            data-speedz="0.4"
            data-rotation="0.1"
            className={`${s.parallax} ${s.fog1}`}
          />
          <div className={s.vignette} />
        </div>
      </div>

      {/* Scroll cue, pinned to the bottom of the first viewport */}
      <div
        ref={cueRef}
        className="pointer-events-none fixed inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-white/80"
      >
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce-soft" aria-hidden="true" />
      </div>
    </>
  );
}
