import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

const ABOUT_PATH = join(process.cwd(), "data", "about.json");

export async function GET(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(JSON.parse(readFileSync(ABOUT_PATH, "utf-8")));
}

export async function PUT(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  writeFileSync(ABOUT_PATH, JSON.stringify(body, null, 2), "utf-8");
  revalidatePath("/about");
  return NextResponse.json({ ok: true });
}
