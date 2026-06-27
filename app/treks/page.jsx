import PageHero from "@/components/PageHero";
import TreksExplorer from "@/components/TreksExplorer";
import { getAllTreks } from "@/lib/treks";

export const metadata = {
  title: "Explore Treks",
  description:
    "Browse every Travello expedition — from beginner-friendly Sahyadri trails to high-altitude Himalayan crossings.",
};

export default async function TreksPage() {
  const treks = await getAllTreks();

  return (
    <main>
      <PageHero
        eyebrow="Explore Treks"
        title="Find the trail that's calling you"
        subtitle="From a one-day Sahyadri summit to a six-day Himalayan crossing — every Travello trek, in one place."
        crumbs={[{ label: "Home", href: "/" }, { label: "Treks" }]}
      />

      <section className="bg-brand-50 py-16">
        <div className="section">
          <TreksExplorer treks={treks} />
        </div>
      </section>
    </main>
  );
}
