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

export async function GET(request) {
  try {
    requireAdmin(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readTreks());
}

export async function POST(request) {
  try {
    requireAdmin(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const treks = readTreks();

  if (!body.slug || !/^[a-z0-9-]+$/.test(body.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  if (treks.find((t) => t.slug === body.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  treks.push(body);
  writeTreks(treks);
  revalidatePath("/treks");
  revalidatePath("/");

  return NextResponse.json(body, { status: 201 });
}
