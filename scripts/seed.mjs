import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Parse .env.local manually (no dotenv dependency required)
const envText = readFileSync(join(root, ".env.local"), "utf-8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function seed() {
  console.log("Seeding Supabase…\n");

  // Treks
  const treks = JSON.parse(readFileSync(join(root, "data/treks.json"), "utf-8"));
  for (let i = 0; i < treks.length; i++) {
    const { error } = await supabase
      .from("treks")
      .upsert({ slug: treks[i].slug, data: treks[i], position: i });
    if (error) console.error("  ✗ Trek:", treks[i].name, "-", error.message);
    else console.log("  ✓ Trek:", treks[i].name);
  }

  // Gallery
  const gallery = JSON.parse(readFileSync(join(root, "data/gallery.json"), "utf-8"));
  for (const item of gallery) {
    const { error } = await supabase
      .from("gallery")
      .upsert({ id: item.id, src: item.src, title: item.title, location: item.location });
    if (error) console.error("  ✗ Gallery:", item.title, "-", error.message);
    else console.log("  ✓ Gallery:", item.title);
  }

  // About
  const about = JSON.parse(readFileSync(join(root, "data/about.json"), "utf-8"));
  const { error: aboutErr } = await supabase
    .from("about")
    .upsert({ id: 1, data: about, updated_at: new Date().toISOString() });
  if (aboutErr) console.error("  ✗ About:", aboutErr.message);
  else console.log("  ✓ About page data");

  // Contact
  const contact = JSON.parse(readFileSync(join(root, "data/contact.json"), "utf-8"));
  const { error: contactErr } = await supabase
    .from("contact")
    .upsert({ id: 1, data: contact, updated_at: new Date().toISOString() });
  if (contactErr) console.error("  ✗ Contact:", contactErr.message);
  else console.log("  ✓ Contact page data");

  console.log("\n✅ Seed complete");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
