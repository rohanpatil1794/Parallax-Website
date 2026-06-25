import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-700 via-brand-800 to-ink px-5 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-ember-400 ring-1 ring-inset ring-white/20">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-8 font-display text-7xl font-extrabold text-white sm:text-8xl">404</p>
        <h1 className="mt-2 text-2xl font-bold text-white">This trail doesn't exist</h1>
        <p className="mx-auto mt-3 max-w-md text-brand-100/75">
          Looks like you've wandered off the map. Let's get you back to base.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-lg btn-primary">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/treks" className="btn btn-lg btn-ghost">
            Browse treks
          </Link>
        </div>
      </div>
    </main>
  );
}
