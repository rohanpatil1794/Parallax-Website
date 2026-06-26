// Server-only data helpers — read JSON files from disk.
// NEVER import this file from client components ("use client").
import { readFileSync } from "fs";
import { join } from "path";

function read(filename) {
  return JSON.parse(
    readFileSync(join(process.cwd(), "data", filename), "utf-8")
  );
}

export function getContactData()  { return read("contact.json"); }
export function getAboutData()    { return read("about.json"); }
export function getGalleryData()  { return read("gallery.json"); }
