import { supabase } from "./supabase.js";

export async function getContactData() {
  const { data } = await supabase
    .from("contact")
    .select("data")
    .eq("id", 1)
    .single();
  return data?.data ?? null;
}

export async function getAboutData() {
  const { data } = await supabase
    .from("about")
    .select("data")
    .eq("id", 1)
    .single();
  return data?.data ?? null;
}

export async function getGalleryData() {
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: true });
  return data ?? [];
}
