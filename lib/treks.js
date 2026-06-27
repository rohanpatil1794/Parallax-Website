import { supabase } from "./supabase.js";
export { formatPrice, difficultyTone } from "./trekUtils.js";

export async function getAllTreks() {
  const { data, error } = await supabase
    .from("treks")
    .select("data")
    .order("position", { ascending: true });
  if (error) throw new Error(error.message);
  return data.map((r) => r.data);
}

export async function getFeaturedTreks() {
  const treks = await getAllTreks();
  return treks.filter((t) => t.featured);
}

export async function getTrekBySlug(slug) {
  const { data, error } = await supabase
    .from("treks")
    .select("data")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data?.data ?? null;
}
