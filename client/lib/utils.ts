import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getThreatLevel(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 80) return { label: "Critical", color: "#ef4444", bg: "rgba(239,68,68,0.12)" };
  if (score >= 60) return { label: "High Risk", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" };
  if (score >= 40) return { label: "Medium Risk", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" };
  if (score >= 20) return { label: "Low Risk", color: "#22c55e", bg: "rgba(34,197,94,0.12)" };
  return { label: "Clean", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" };
}

export function getStatusColor(status: "passed" | "failed" | "warning" | "neutral") {
  const map = {
    passed: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Passed" },
    failed: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Failed" },
    warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Warning" },
    neutral: { color: "#94a3b8", bg: "rgba(148,163,184,0.08)", label: "Unknown" },
  };
  return map[status];
}
