import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryData } from "@/lib/serverData";

export const metadata = {
  title: "Gallery",
  description: "Moments from the trail — peaks, passes and starlit camps across the Travello expedition map.",
};

export default function GalleryPage() {
  const items = getGalleryData();

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
