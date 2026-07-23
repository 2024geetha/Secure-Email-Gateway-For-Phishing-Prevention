"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Zap,
  Eye,
  Lock,
  Globe,
  Brain,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Mail,
  AlertTriangle,
  FileSearch,
  ChevronRight,
  Star,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    desc: "Advanced NLP models analyze email content for social engineering patterns, urgency manipulation, and psychological tactics.",
    tag: "Machine Learning",
  },
  {
    icon: Shield,
    title: "Header Authentication",
    desc: "Deep inspection of SPF, DKIM, DMARC records to verify sender authenticity and detect domain spoofing attacks.",
    tag: "Email Auth",
  },
  {
    icon: Globe,
    title: "URL Intelligence",
    desc: "Real-time URL scanning, redirect chain analysis, WHOIS lookup, and malicious domain detection.",
    tag: "Threat Intel",
  },
  {
    icon: FileSearch,
    title: "Attachment Analysis",
    desc: "Static and dynamic analysis of attachments for malware signatures, macros, exploits, and zero-day payloads.",
    tag: "Malware Scan",
  },
  {
    icon: Eye,
    title: "Brand Impersonation",
    desc: "Identify homograph attacks, typosquatting, and visual impersonation of 500+ recognized brands worldwide.",
    tag: "Anti-Phishing",
  },
  {
    icon: Lock,
    title: "Explainable AI",
    desc: "Every threat detection comes with clear explanations, evidence, confidence scores, and actionable recommendations.",
    tag: "XAI",
  },
];

const steps = [
  { n: "01", title: "Upload or Paste Email", desc: "Drop your .eml or .msg file, or paste raw email headers directly." },
  { n: "02", title: "Multi-Layer Analysis", desc: "AI scans headers, URLs, attachments, and content simultaneously in under 3 seconds." },
  { n: "03", title: "Threat Score Generated", desc: "Receive a comprehensive threat score from 0-100 with full explainability." },
  { n: "04", title: "Take Action", desc: "Follow AI-recommended actions: block, report, or safely archive the email." },
];

const testimonials = [
  {
    quote: "Sentinel AI caught a sophisticated BEC attack targeting our CFO. The AI explanation made it instantly clear what to do.",
    author: "Sarah Chen",
    role: "CISO, FinTech Corp",
  },
  {
    quote: "We reduced phishing incidents by 94% after deploying Sentinel AI across our 3,000-person organization.",
    author: "Marcus Webb",
    role: "Head of Security, CloudBase",
  },
  {
    quote: "The threat intelligence dashboard gives us real-time visibility into attack campaigns targeting our industry.",
    author: "Priya Nair",
    role: "Security Engineer, MedTech",
  },
];

const stats = [
  { label: "Emails Analyzed", value: "48M+" },
  { label: "Threats Blocked", value: "3.2M+" },
  { label: "Detection Rate", value: "99.7%" },
  { label: "Avg Analysis Time", value: "< 2.4s" },
];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {value}
    </motion.span>
  );
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#050505]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)] flex items-center justify-center">
              <Shield className="h-4 w-4 text-[#10b981]" />
            </div>
            <span className="text-sm font-semibold">Sentinel AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-[#888]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#threat-intel" className="hover:text-white transition-colors">Threat Intel</a>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(16,185,129,0.04)] blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[rgba(99,102,241,0.03)] blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 text-xs">
              <Zap className="mr-1 h-3 w-3" /> Now with GPT-4o Threat Analysis
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            AI-Powered{" "}
            <span className="text-[#10b981]">Email Security</span>{" "}
            Copilot
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#888] leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Analyze emails, detect phishing attacks, inspect headers, scan attachments,
            identify impersonation attempts, and understand cyber threats with explainable AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/dashboard/analyze">
              <Button size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Analyze Email
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Hero dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto mt-16 relative"
        >
          <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#0b0b0b] overflow-hidden shadow-2xl">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center px-2">
                  <span className="text-[10px] text-[#555]">sentinel.ai/dashboard</span>
                </div>
              </div>
            </div>

            {/* Dashboard preview content */}
            <div className="grid grid-cols-4 gap-3 p-4">
              {[
                { label: "Emails Scanned", value: "48,291", color: "#10b981", icon: Mail },
                { label: "Threats Blocked", value: "3,847", color: "#ef4444", icon: AlertTriangle },
                { label: "High Risk", value: "612", color: "#f59e0b", icon: Shield },
                { label: "Avg Score", value: "23/100", color: "#6366f1", icon: TrendingUp },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111] p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-[#555]">{card.label}</span>
                      <Icon className="h-3 w-3" style={{ color: card.color }} />
                    </div>
                    <p className="text-lg font-bold" style={{ color: card.color }}>{card.value}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="px-4 pb-4">
              <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#111] p-3">
                <p className="text-[10px] text-[#555] mb-3">Weekly Scans</p>
                <div className="flex items-end gap-1 h-16">
                  {[40, 55, 72, 60, 85, 45, 38].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.06 }}
                      className="flex-1 rounded-sm bg-[rgba(16,185,129,0.3)]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <Section className="py-12 border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-[#10b981] mb-1">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="text-sm text-[#666]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold mb-4">Everything you need to stop email threats</h2>
            <p className="text-[#666] max-w-2xl mx-auto">
              A complete security platform powered by explainable AI, built for security teams and individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                >
                  <Card className="h-full p-5 hover:border-[rgba(255,255,255,0.15)] transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-9 w-9 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center">
                        <Icon className="h-4.5 w-4.5 text-[#10b981]" />
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{f.tag}</Badge>
                    </div>
                    <h3 className="text-sm font-semibold mb-2">{f.title}</h3>
                    <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" className="py-20 px-6 bg-[#080808]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold mb-4">Threat detection in seconds</h2>
            <p className="text-[#666]">From upload to actionable insights in under 3 seconds.</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] flex items-center justify-center">
                  <span className="text-lg font-bold text-[#10b981]">{step.n}</span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-[#666]">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-7 mt-14 h-4 w-px bg-[rgba(16,185,129,0.2)]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Threat Intelligence */}
      <Section id="threat-intel" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Threat Intelligence</Badge>
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                Real-time global threat visibility
              </h2>
              <p className="text-[#666] mb-6 leading-relaxed">
                Monitor active threat campaigns, track malicious domains, identify targeted brands, 
                and understand attacker tactics in real-time across your organization.
              </p>
              <ul className="space-y-3">
                {[
                  "47M+ threat indicators updated daily",
                  "Top impersonated brands tracking",
                  "Geographic threat attribution",
                  "Malware family classification",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-[#b3b3b3]">
                    <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/dashboard/threat-intelligence">
                  <Button>
                    View Threat Intelligence <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Active Threat Domains", value: "12,847", color: "#ef4444", change: "+247 today" },
                { label: "Malware Families", value: "384", color: "#f59e0b", change: "+12 this week" },
                { label: "Targeted Brands", value: "527", color: "#10b981", change: "500+ covered" },
                { label: "Countries Tracked", value: "191", color: "#6366f1", change: "Global coverage" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0b0b0b] p-4"
                >
                  <p className="text-[11px] text-[#555] mb-2">{item.label}</p>
                  <p className="text-2xl font-bold mb-1" style={{ color: item.color }}>
                    {item.value}
                  </p>
                  <p className="text-[11px] text-[#555]">{item.change}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-20 px-6 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-4">Trusted by security professionals</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Card className="p-5 h-full">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#b3b3b3] leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-auto">
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-[#555]">{t.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start protecting your inbox today</h2>
          <p className="text-[#666] mb-8">
            Join 10,000+ security professionals using Sentinel AI to detect and stop email threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard">
              <Button size="lg">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                <GitBranch className="mr-2 h-4 w-4" /> Sign in with GitHub
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)] flex items-center justify-center">
                <Shield className="h-3.5 w-3.5 text-[#10b981]" />
              </div>
              <span className="text-sm font-semibold text-white">Sentinel AI</span>
            </div>
            <p className="text-xs text-[#555]">
              © 2026 Sentinel AI. AI Email Security Copilot. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#555]">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
