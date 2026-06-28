"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { mainNav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // "transparent" | "glass" | "solid"
  const [phase, setPhase] = useState("transparent");
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.body.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0);

      if (!isHome) return;
      const why = document.getElementById("why");
      const whyTop = why ? why.getBoundingClientRect().top : Infinity;
      const headerH = 72; // 4.5rem = --header-h

      if (window.scrollY <= 24) {
        setPhase("transparent");
      } else if (whyTop > headerH) {
        setPhase("glass");
      } else {
        setPhase("solid");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Non-home pages and open mobile menu always use solid.
  const effectivePhase = !isHome || open ? "solid" : phase;
  const isSolid = effectivePhase === "solid";
  const isGlass = effectivePhase === "glass";
  const linkTone = isSolid ? "text-ink/70 hover:text-brand-700" : "text-white/85 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isSolid
          ? "border-b border-brand-100 bg-white/85 shadow-sm backdrop-blur-md"
          : isGlass
          ? "border-b border-white/20 bg-white/10 backdrop-blur-2xl backdrop-saturate-150"
          : "bg-gradient-to-b from-black/30 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo tone={isSolid ? "dark" : "light"} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${linkTone} ${
                    active
                      ? isSolid
                        ? "!text-brand-700 font-semibold"
                        : "!text-white font-semibold"
                      : ""
                  }`}
                >
                  {active && (
                    <span className={`absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full ${isSolid ? "bg-brand-500" : "bg-white/70"}`} />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/book" className="btn btn-md btn-primary">
            Book now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`grid h-11 w-11 place-items-center rounded-xl transition-colors md:hidden ${
            isSolid ? "text-ink hover:bg-brand-50" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-brand-100 bg-white md:hidden ${
          open ? "max-h-[28rem]" : "max-h-0"
        } transition-[max-height] duration-300 ease-in-out`}
      >
        <ul className="space-y-1 px-5 py-4">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-3 text-base font-medium text-ink/80 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/book" className="btn btn-md btn-primary w-full">
              Book now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-brand-500 transition-[width] duration-100 ease-linear"
        style={{ width: `${scrollPct}%`, opacity: scrollPct > 2 ? 1 : 0 }}
      />
    </header>
  );
}
