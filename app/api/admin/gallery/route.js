import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const newItem = {
    id: String(Date.now()),
    src: body.src,
    title: body.title ?? null,
    location: body.location ?? null,
  };
  const { error } = await supabase.from("gallery").insert(newItem);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/gallery");
  return NextResponse.json(newItem, { status: 201 });
}
