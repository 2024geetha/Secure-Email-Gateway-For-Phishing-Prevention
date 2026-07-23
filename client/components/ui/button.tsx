"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none relative overflow-hidden";

    const variants = {
      default:
        "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-white/10",
      outline:
        "border border-[rgba(255,255,255,0.12)] bg-transparent text-white hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)]",
      ghost: "bg-transparent text-[#cbd5e1] hover:bg-[rgba(255,255,255,0.05)] hover:text-white",
      destructive:
        "bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-white/10",
      secondary:
        "bg-[#1e293b] text-white hover:bg-[#334155] border border-[rgba(255,255,255,0.08)]",
      link: "text-[#8b5cf6] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-xl",
      md: "h-11 px-6 text-sm rounded-xl",
      lg: "h-14 px-8 text-base rounded-2xl",
      icon: "h-11 w-11 rounded-xl",
    };

    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Subtle inner glow for default variant */}
        {variant === "default" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        )}
        
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 relative z-10"
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
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
