import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string) {
  if (!isoString) return "No date";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function priorityBadge(priority: "low" | "medium" | "high") {
  const map = {
    low: "bg-emerald-500/15 text-emerald-300",
    medium: "bg-amber-500/15 text-amber-300",
    high: "bg-fuchsia-500/15 text-fuchsia-300",
  };
  return map[priority];
}

export function reputationLevel(points: number) {
  if (points >= 1200) return "Stellar";
  if (points >= 700) return "Advanced";
  if (points >= 300) return "Rising";
  return "Foundational";
}
