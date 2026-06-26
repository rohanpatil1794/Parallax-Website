import { NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";
import { requireAdmin } from "@/lib/auth";

export async function POST(request) {
  try {
    requireAdmin(request);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!file || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
  }

  const ext = file.name.split(".").pop().replace(/[^a-z0-9]/gi, "").toLowerCase();
  const filename = `${Date.now()}.${ext}`;
  const dest = join(process.cwd(), "public", "treks", filename);
  writeFileSync(dest, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ path: `/treks/${filename}` }, { status: 201 });
}
