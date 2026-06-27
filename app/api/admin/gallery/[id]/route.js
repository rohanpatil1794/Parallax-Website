import { NextResponse } from "next/server";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { data, error } = await supabase
    .from("gallery")
    .update({ title: body.title ?? null, location: body.location ?? null })
    .eq("id", params.id)
    .select()
    .single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/gallery");
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: item, error: fetchError } = await supabase
    .from("gallery")
    .select("src")
    .eq("id", params.id)
    .single();
  if (fetchError || !item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (item.src.startsWith("/gallery/")) {
    const filePath = join(process.cwd(), "public", item.src);
    if (existsSync(filePath)) unlinkSync(filePath);
  }

  const { error } = await supabase.from("gallery").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/gallery");
  return NextResponse.json({ ok: true });
}
