import { readFileSync } from "fs";
import { join } from "path";
export { formatPrice, difficultyTone } from "./trekUtils.js";

function load() {
  return JSON.parse(
    readFileSync(join(process.cwd(), "data", "treks.json"), "utf-8")
  );
}

export function getAllTreks() {
  return load();
}

export function getFeaturedTreks() {
  return load().filter((t) => t.featured);
}

export function getTrekBySlug(slug) {
  return load().find((t) => t.slug === slug) ?? null;
}

