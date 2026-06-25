import Link from "next/link";

// Inline SVG wordmark — a small mountain glyph + "Travello".
// `tone` switches between light (over hero) and dark (on solid header) text.
export default function Logo({ tone = "dark", className = "" }) {
  const textColor = tone === "light" ? "text-white" : "text-ink";
  return (
    <Link
      href="/"
      aria-label="Travello — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-md shadow-brand-600/30 transition-transform duration-200 group-hover:-translate-y-0.5">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M3 19h18L14.5 7l-3.2 5.4-2.1-3L3 19Z"
            fill="white"
          />
          <circle cx="17.5" cy="6.5" r="2" fill="#FDBA74" />
        </svg>
      </span>
      <span className={`font-display text-xl font-extrabold tracking-tight ${textColor}`}>
        Travello
      </span>
    </Link>
  );
}
