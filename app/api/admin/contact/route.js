import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data } = await supabase
    .from("contact")
    .select("data")
    .eq("id", 1)
    .single();
  return NextResponse.json(data?.data ?? {});
}

export async function PUT(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { error } = await supabase
    .from("contact")
    .upsert({ id: 1, data: body, updated_at: new Date().toISOString() });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/contact");
  return NextResponse.json({ ok: true });
}
