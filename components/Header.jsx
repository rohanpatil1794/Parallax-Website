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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solidify the bar once the user scrolls off the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // On the home page the header floats transparently over the hero until the
  // user scrolls; on every other page it's solid from the start.
  const solid = scrolled || !isHome || open;
  const linkTone = solid ? "text-ink/70 hover:text-brand-700" : "text-white/85 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-brand-100 bg-white/85 shadow-sm backdrop-blur-md"
          : "bg-gradient-to-b from-black/30 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo tone={solid ? "dark" : "light"} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${linkTone} ${
                    active ? (solid ? "text-brand-700" : "text-white") : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/treks"
            className={`text-sm font-medium transition-colors ${linkTone}`}
          >
            All treks
          </Link>
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
            solid ? "text-ink hover:bg-brand-50" : "text-white hover:bg-white/10"
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
          {[...mainNav, { label: "All treks", href: "/treks" }].map((item) => (
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
    </header>
  );
}
