import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getAllTreks } from "@/lib/treks";

export const metadata = {
  title: "Gallery",
  description: "Moments from the trail — peaks, passes and starlit camps across the Travello expedition map.",
};

export default function GalleryPage() {
  // Build the gallery from the trek imagery.
  const items = getAllTreks().map((t) => ({
    src: t.image,
    title: t.name,
    location: t.region,
  }));

  return (
    <main>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the trail"
        subtitle="Sunrises above the clouds, ridgelines that go on forever, and the quiet of a high-altitude camp. Tap any photo to view it full-size."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-brand-50 py-16">
        <div className="section">
          <GalleryGrid items={items} />
        </div>
      </section>
    </main>
  );
}
