import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("treks")
    .select("data")
    .order("position", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.map((r) => r.data));
}

export async function POST(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.slug || !/^[a-z0-9-]+$/.test(body.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("treks")
    .select("position")
    .order("position", { ascending: false })
    .limit(1);
  const position = existing?.length ? existing[0].position + 1 : 0;

  const { error } = await supabase
    .from("treks")
    .insert({ slug: body.slug, data: body, position });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/treks");
  revalidatePath("/");
  return NextResponse.json(body, { status: 201 });
}
