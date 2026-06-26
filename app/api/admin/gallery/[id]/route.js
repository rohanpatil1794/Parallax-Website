import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "fs";
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

export async function PUT(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const items = readGallery();
  const idx = items.findIndex((i) => i.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  items[idx] = { ...items[idx], ...body, id: params.id };
  writeGallery(items);
  revalidatePath("/gallery");

  return NextResponse.json(items[idx]);
}

export async function DELETE(request, { params }) {
  try { requireAdmin(request); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = readGallery();
  const item = items.find((i) => i.id === params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Try to delete the file from /public/gallery/ if it lives there
  if (item.src.startsWith("/gallery/")) {
    const filePath = join(process.cwd(), "public", item.src);
    if (existsSync(filePath)) unlinkSync(filePath);
  }

  writeGallery(items.filter((i) => i.id !== params.id));
  revalidatePath("/gallery");

  return NextResponse.json({ ok: true });
}
