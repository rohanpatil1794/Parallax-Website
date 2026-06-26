import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

const GALLERY_PATH = join(process.cwd(), "data", "gallery.json");

function readGallery() {
  return JSON.parse(readFileSync(GALLERY_PATH, "utf-8"));
}

function writeGallery(items) {
  writeFileSync(GALLERY_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readGallery());
}

export async function POST(request) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const items = readGallery();
  const newItem = { id: String(Date.now()), ...body };
  items.push(newItem);
  writeGallery(items);
  revalidatePath("/gallery");

  return NextResponse.json(newItem, { status: 201 });
}
