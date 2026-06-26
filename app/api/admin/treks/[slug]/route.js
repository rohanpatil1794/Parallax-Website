import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

const TREKS_PATH = join(process.cwd(), "data", "treks.json");

function readTreks() {
  return JSON.parse(readFileSync(TREKS_PATH, "utf-8"));
}

function writeTreks(treks) {
  writeFileSync(TREKS_PATH, JSON.stringify(treks, null, 2), "utf-8");
}

export async function GET(request, { params }) {
  try {
    requireAdmin(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const trek = readTreks().find((t) => t.slug === params.slug);
  if (!trek) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(trek);
}

export async function PUT(request, { params }) {
  try {
    requireAdmin(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const treks = readTreks();
  const idx = treks.findIndex((t) => t.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  treks[idx] = { ...treks[idx], ...body, slug: params.slug };
  writeTreks(treks);
  revalidatePath("/treks");
  revalidatePath(`/treks/${params.slug}`);
  revalidatePath("/");

  return NextResponse.json(treks[idx]);
}

export async function DELETE(request, { params }) {
  try {
    requireAdmin(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const treks = readTreks();
  const filtered = treks.filter((t) => t.slug !== params.slug);
  if (filtered.length === treks.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  writeTreks(filtered);
  revalidatePath("/treks");
  revalidatePath(`/treks/${params.slug}`);
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
