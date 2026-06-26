import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Compass,
  Mountain,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { getAboutData } from "@/lib/serverData";

const iconMap = { Compass, ShieldCheck, Leaf, HeartHandshake };

export const metadata = {
  title: "About us",
  description:
    "Travello is a team of certified trek leaders making the mountains accessible, safe and unforgettable.",
};

export default function AboutPage() {
  const { story, values, team } = getAboutData();
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="We make the mountains feel possible"
        subtitle="Travello began with a simple idea — that a great trek shouldn't need insider knowledge, just good company and someone who knows the way."
        crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      {/* Story */}
      <section className="bg-white py-20">
        <div className="section grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-card">
            <Image
              src="/treks/kedarkantha.jpg"
              alt="Trekkers on a snow-covered Himalayan ridge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">
              <Mountain className="h-4 w-4" aria-hidden="true" />
              Our story
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
              {story.heading}
            </h2>
            <div className="mt-5 space-y-4 text-ink/70">
              {story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link href="/treks" className="btn btn-md btn-secondary mt-7">
              See where we go
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values / Why (#why) */}
      <section id="why" className="bg-brand-50 py-20">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why Travello</span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
              What we stand for
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = iconMap[v.icon];
              return (
              <div key={v.title} className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{v.body}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team (#team) */}
      <section id="team" className="bg-white py-20">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The team</span>
            <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
              The people on the trail with you
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-3xl border border-brand-100 bg-brand-50/50 p-6 text-center">
                <span
                  className={`mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${member.tone} font-display text-2xl font-bold text-white shadow-md`}
                >
                  {member.initials}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{member.name}</h3>
                <p className="text-sm text-brand-700">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety + Sustainability (#safety, #sustainability) */}
      <section className="bg-brand-50 py-20">
        <div className="section grid gap-6 lg:grid-cols-2">
          <div id="safety" className="rounded-4xl bg-ink p-8 text-white sm:p-10">
            <ShieldCheck className="h-9 w-9 text-ember-400" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold">Safety, the Travello way</h2>
            <p className="mt-3 text-brand-100/80">
              Every high-altitude trek carries a medical kit, pulse oximeter and a
              trained responder. We brief, we acclimatise properly, and we never push a
              summit when the mountain says no.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-brand-100/85">
              {["Certified wilderness first-responders", "Conservative weather & altitude protocols", "Backup evacuation plans on every route"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember-400" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div id="sustainability" className="rounded-4xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white sm:p-10">
            <Leaf className="h-9 w-9 text-emerald-200" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold">Trekking that gives back</h2>
            <p className="mt-3 text-emerald-50/85">
              We run plastic-free trails, carry back what we carry in, and reinvest a
              share of every booking into local clean-up drives and trail maintenance.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-emerald-50/90">
              {["Carry-back waste policy on all treks", "Local guides, homestays & porters", "1% of revenue to mountain conservation"].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Careers (#careers) */}
      <section id="careers" className="bg-white py-20">
        <div className="section">
          <div className="rounded-4xl border border-brand-100 bg-brand-50 px-8 py-14 text-center sm:px-16">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Want to lead treks with us?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/65">
              We're always looking for certified leaders who love the mountains as much
              as we do. Drop us a line — we'd love to hear your story.
            </p>
            <Link href="/contact" className="btn btn-lg btn-primary mt-8">
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
