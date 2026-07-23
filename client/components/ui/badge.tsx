"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "warning" | "success" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[rgba(139,92,246,0.15)] text-[#8b5cf6] border-[rgba(139,92,246,0.3)]",
    secondary: "bg-[rgba(168,85,247,0.15)] text-[#cbd5e1] border-[rgba(168,85,247,0.25)]",
    destructive: "bg-[rgba(239,68,68,0.15)] text-[#ef4444] border-[rgba(239,68,68,0.3)]",
    warning: "bg-[rgba(245,158,11,0.15)] text-[#f59e0b] border-[rgba(245,158,11,0.3)]",
    success: "bg-[rgba(34,197,94,0.15)] text-[#22c55e] border-[rgba(34,197,94,0.3)]",
    outline: "bg-transparent text-white border-[rgba(255,255,255,0.15)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
