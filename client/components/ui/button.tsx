"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none";

    const variants = {
      default:
        "bg-[#10b981] text-white hover:bg-[#0d9e6e] active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]",
      outline:
        "border border-[rgba(255,255,255,0.12)] bg-transparent text-white hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)]",
      ghost: "bg-transparent text-[#b3b3b3] hover:bg-[rgba(255,255,255,0.05)] hover:text-white",
      destructive:
        "bg-[#ef4444] text-white hover:bg-[#dc2626] active:scale-[0.98]",
      secondary:
        "bg-[#1a1a1a] text-white hover:bg-[#222] border border-[rgba(255,255,255,0.08)]",
      link: "text-[#10b981] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md",
      md: "h-9 px-4 text-sm rounded-lg",
      lg: "h-11 px-6 text-sm rounded-lg",
      icon: "h-9 w-9 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
