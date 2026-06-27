import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("treks")
    .select("data")
    .eq("slug", params.slug)
    .single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data.data);
}

export async function PUT(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updated = { ...body, slug: params.slug };
  const { error } = await supabase
    .from("treks")
    .update({ data: updated })
    .eq("slug", params.slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/treks");
  revalidatePath(`/treks/${params.slug}`);
  revalidatePath("/");
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("treks")
    .delete()
    .eq("slug", params.slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/treks");
  revalidatePath(`/treks/${params.slug}`);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
