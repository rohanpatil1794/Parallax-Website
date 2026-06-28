import { getAllTreks } from "@/lib/treks";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://travello.com";

export default async function sitemap() {
  const treks = await getAllTreks();

  const staticRoutes = [
    { url: `${BASE}/`,        changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/treks`,   changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/book`,    changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/gallery`, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/about`,   changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/terms`,   changeFrequency: "yearly",  priority: 0.3 },
  ].map((r) => ({ ...r, lastModified: new Date() }));

  const trekRoutes = treks.map((t) => ({
    url: `${BASE}/treks/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...trekRoutes];
}
