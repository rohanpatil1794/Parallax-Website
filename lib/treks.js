import { readFileSync } from "fs";
import { join } from "path";

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

export function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const difficultyTone = {
  Easy: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  Moderate: "bg-amber-100 text-amber-700 ring-amber-600/20",
  Challenging: "bg-rose-100 text-rose-700 ring-rose-600/20",
};
