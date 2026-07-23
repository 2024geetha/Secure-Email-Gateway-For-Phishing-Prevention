"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, Eye, EyeOff, Mail, Lock, GitBranch, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#a855f7]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[rgba(168,85,247,0.04)] blur-3xl" />
    </div>
  );
}

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center relative p-4">
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(168,85,247,0.12)] border border-[rgba(168,85,247,0.25)] mb-4">
            <Shield className="h-6 w-6 text-[#a855f7]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sentinel AI</h1>
          <p className="text-sm text-[#666] mt-1">AI Email Security Copilot</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[rgba(168,85,247,0.2)] bg-[#0a0014] p-6">
          <h2 className="text-base font-semibold text-white mb-5">Sign in to your account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#888]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#444]" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="alex@company.com"
                  className="pl-9"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-[#ef4444]">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#888]">Password</label>
                <a href="#" className="text-xs text-[#a855f7] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#444]" />
                <Input
                  {...register("password")}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-[#ef4444]">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              {!loading && <ArrowRight className="mr-1 h-4 w-4" />}
              Sign In
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,255,255,0.07)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0a0014] px-3 text-[#555]">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="w-full" type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" size="sm" className="w-full" type="button">
              <GitBranch className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-xs text-[#555] mt-5">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-[#a855f7] hover:underline">
              Sign up free
            </a>
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {["SOC 2 Type II", "GDPR Compliant", "256-bit TLS"].map((badge) => (
            <div key={badge} className="flex items-center gap-1 text-[10px] text-[#444]">
              <Zap className="h-2.5 w-2.5 text-[#a855f7]" />
              {badge}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
