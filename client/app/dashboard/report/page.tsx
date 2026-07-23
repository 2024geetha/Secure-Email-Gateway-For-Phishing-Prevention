"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Clock,
  Shield,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  headerAnalysis,
  urlAnalysis,
  attachmentAnalysis,
  aiAnalysis,
  threatTimeline,
  recommendations,
  currentAnalysisEmail,
} from "@/lib/mock-data";
import { getStatusColor, getThreatLevel, formatDate } from "@/lib/utils";
import { ThreatRadarChart } from "@/components/charts";
import { radarData } from "@/lib/mock-data";

function ThreatScoreRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const level = getThreatLevel(score);

  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      start += 2;
      if (start >= score) {
        setDisplayed(score);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const pct = displayed / 100;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <motion.circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={level.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transform="rotate(-90 70 70)"
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${level.color}60)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            style={{ color: level.color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {displayed}
          </motion.span>
          <span className="text-xs text-[#555]">/ 100</span>
        </div>
      </div>
      <Badge
        style={{
          backgroundColor: level.bg,
          color: level.color,
          borderColor: `${level.color}30`,
        }}
        className="text-xs"
      >
        {level.label}
      </Badge>
    </div>
  );
}

function StatusIcon({ status }: { status: "passed" | "failed" | "warning" | "neutral" }) {
  if (status === "passed")
    return <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />;
  if (status === "failed")
    return <XCircle className="h-4 w-4 text-[#ef4444]" />;
  if (status === "warning")
    return <AlertCircle className="h-4 w-4 text-[#f59e0b]" />;
  return <div className="h-4 w-4 rounded-full border border-[#555]" />;
}

export default function ReportPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard/analyze">
          <Button variant="ghost" size="sm" className="h-7 text-xs text-[#666] -ml-2">
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back
          </Button>
        </Link>
        <span className="text-[#333]">/</span>
        <span className="text-xs text-[#555]">Analysis Report</span>
        <span className="text-[#333]">/</span>
        <span className="text-xs text-white truncate max-w-xs">{currentAnalysisEmail.subject}</span>
      </div>

      {/* Top Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
            {/* Score */}
            <ThreatScoreRing score={currentAnalysisEmail.threatScore} />

            {/* Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-white">{currentAnalysisEmail.subject}</h2>
                    <p className="text-sm text-[#555] mt-0.5">{currentAnalysisEmail.sender}</p>
                  </div>
                  <Badge variant="destructive" className="shrink-0 mt-0.5">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Critical Threat
                  </Badge>
                </div>

                <div className="rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.06)] p-4">
                  <p className="text-sm text-[#b3b3b3] leading-relaxed">
                    {currentAnalysisEmail.summary}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Category", value: currentAnalysisEmail.category },
                  { label: "Received", value: formatDate(currentAnalysisEmail.receivedAt) },
                  { label: "File", value: currentAnalysisEmail.fileName || "Pasted" },
                  { label: "Confidence", value: `${aiAnalysis.confidence}%` },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-3">
                    <p className="text-[11px] text-[#555]">{item.label}</p>
                    <p className="text-xs font-medium text-white mt-0.5 truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-3.5 w-3.5" /> Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-3.5 w-3.5" /> Share Report
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Detailed Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="headers">
          <TabsList className="flex-wrap gap-1">
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="urls">URLs</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="attack">Attack Sim</TabsTrigger>
          </TabsList>

          {/* Header Analysis */}
          <TabsContent value="headers">
            <div className="grid gap-3">
              {headerAnalysis.map((h, i) => {
                const s = getStatusColor(h.status);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: s.bg }}
                        >
                          <StatusIcon status={h.status} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-white">{h.field}</span>
                            <Badge
                              style={{
                                backgroundColor: s.bg,
                                color: s.color,
                                borderColor: `${s.color}30`,
                              }}
                              className="text-[10px]"
                            >
                              {s.label}
                            </Badge>
                          </div>
                          <p className="text-xs font-mono text-[#666] mb-2 break-all">{h.value}</p>
                          <p className="text-xs text-[#888]">{h.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* URL Analysis */}
          <TabsContent value="urls">
            <div className="space-y-3">
              {urlAnalysis.map((url, i) => {
                const threat = getThreatLevel(url.riskScore);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white font-mono break-all">
                              {url.url}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#555]">
                            <span>Category: <span className="text-[#888]">{url.category}</span></span>
                            <span>WHOIS Age: <span className="text-[#f59e0b]">{url.whoisAge}</span></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <div className="text-lg font-bold" style={{ color: threat.color }}>
                              {url.riskScore}
                            </div>
                            <div className="text-[10px] text-[#555]">risk</div>
                          </div>
                          <Badge
                            style={{
                              backgroundColor: threat.bg,
                              color: threat.color,
                              borderColor: `${threat.color}30`,
                            }}
                          >
                            {threat.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-3">
                        <p className="text-[11px] text-[#555] mb-2">Redirect Chain</p>
                        <div className="space-y-1.5">
                          {url.redirectChain.map((r, j) => (
                            <div key={j} className="flex items-center gap-2">
                              {j > 0 && (
                                <div className="h-3 w-px bg-[rgba(255,255,255,0.1)] ml-1.5" />
                              )}
                              <div className="flex items-center gap-1.5">
                                <div className={`h-1.5 w-1.5 rounded-full ${j === url.redirectChain.length - 1 ? "bg-[#ef4444]" : "bg-[#555]"}`} />
                                <span className="text-xs font-mono text-[#888] break-all">{r}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-7">
                          <ExternalLink className="mr-1 h-3 w-3" /> Open Details
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Attachment Analysis */}
          <TabsContent value="attachments">
            <div className="space-y-3">
              {attachmentAnalysis.map((att, i) => {
                const threat = getThreatLevel(att.riskLevel === "critical" ? 91 : att.riskLevel === "high" ? 74 : 40);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-sm font-semibold text-white font-mono">{att.filename}</h3>
                          <p className="text-xs text-[#555] mt-0.5">{att.type} · {att.size}</p>
                        </div>
                        <Badge
                          style={{
                            backgroundColor: threat.bg,
                            color: threat.color,
                            borderColor: `${threat.color}30`,
                          }}
                        >
                          {att.riskLevel.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-3">
                          <p className="text-[11px] text-[#555] mb-1">SHA-256 Hash</p>
                          <p className="text-xs font-mono text-[#888] break-all">{att.hash}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-3">
                            <p className="text-[11px] text-[#555] mb-1">Macro</p>
                            <div className="flex items-center gap-1">
                              {att.hasMacro ? (
                                <XCircle className="h-3.5 w-3.5 text-[#ef4444]" />
                              ) : (
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                              )}
                              <span className="text-xs font-medium" style={{ color: att.hasMacro ? "#ef4444" : "#22c55e" }}>
                                {att.hasMacro ? "Detected" : "None"}
                              </span>
                            </div>
                          </div>
                          <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-3">
                            <p className="text-[11px] text-[#555] mb-1">Malware</p>
                            <div className="flex items-center gap-1">
                              {att.malwareDetected ? (
                                <XCircle className="h-3.5 w-3.5 text-[#ef4444]" />
                              ) : (
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                              )}
                              <span className="text-xs font-medium" style={{ color: att.malwareDetected ? "#ef4444" : "#22c55e" }}>
                                {att.malwareDetected ? "Found" : "Clean"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {att.signatures.length > 0 && (
                        <div className="rounded-lg bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)] p-3">
                          <p className="text-[11px] text-[#ef4444] mb-2">Malware Signatures Detected</p>
                          {att.signatures.map((sig, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs">
                              <AlertTriangle className="h-3 w-3 text-[#ef4444] shrink-0" />
                              <span className="text-[#888] font-mono">{sig}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* AI Analysis */}
          <TabsContent value="ai">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Indicators */}
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Social Engineering Indicators</h3>
                <div className="space-y-4">
                  {[
                    { label: "Urgency", value: aiAnalysis.urgency, color: "#ef4444" },
                    { label: "Authority Exploitation", value: aiAnalysis.authority, color: "#f59e0b" },
                    { label: "Fear Tactics", value: aiAnalysis.fear, color: "#f59e0b" },
                    { label: "Credential Theft Intent", value: aiAnalysis.credentialTheft, color: "#ef4444" },
                    { label: "Financial Fraud", value: aiAnalysis.financialFraud, color: "#6366f1" },
                    { label: "Grammar Quality", value: aiAnalysis.grammarScore, color: "#10b981" },
                    { label: "AI Confidence", value: aiAnalysis.confidence, color: "#10b981" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-[#888]">{item.label}</span>
                        <span className="text-xs font-bold" style={{ color: item.color }}>
                          {item.value}%
                        </span>
                      </div>
                      <Progress value={item.value} color={item.color} />
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Threat Radar & Summary */}
              <div className="space-y-4">
                <Card className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">Threat Radar</h3>
                  <ThreatRadarChart data={radarData} />
                </Card>

                <Card className="p-5">
                  <h3 className="text-sm font-semibold text-white mb-3">AI Summary</h3>
                  <p className="text-xs text-[#888] leading-relaxed mb-4">{aiAnalysis.summary}</p>
                  <Separator className="mb-4" />
                  <h4 className="text-xs font-semibold text-white mb-3">Key Indicators</h4>
                  <div className="space-y-2">
                    {aiAnalysis.indicators.map((ind, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#888]">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#ef4444] mt-1.5 shrink-0" />
                        {ind}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline">
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-white mb-6">Threat Analysis Timeline</h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />
                <div className="space-y-6">
                  {threatTimeline.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 relative"
                    >
                      <div className="h-10 w-10 shrink-0 rounded-full border-2 border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.1)] flex items-center justify-center z-10">
                        <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-white">{event.title}</h4>
                          <span className="text-xs font-mono text-[#555]">{event.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#666] leading-relaxed">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Attack Simulation */}
          <TabsContent value="attack">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />
                <h3 className="text-sm font-semibold text-white">Attack Simulation — What Would Have Happened</h3>
              </div>
              <div className="max-w-sm mx-auto">
                {[
                  { step: 1, title: "Email Received", icon: "📧", desc: "Victim receives convincing Microsoft security email", color: "#6366f1" },
                  { step: 2, title: "Link Clicked", icon: "🖱️", desc: "Victim clicks 'Verify Account' link in email body", color: "#f59e0b" },
                  { step: 3, title: "Fake Login Page", icon: "🌐", desc: "Redirected to pixel-perfect Microsoft clone on micros0ft-verify.com", color: "#f59e0b" },
                  { step: 4, title: "Credentials Stolen", icon: "🔑", desc: "Email and password captured and sent to attacker server in Russia", color: "#ef4444" },
                  { step: 5, title: "Attachment Opened", icon: "📎", desc: "Macro-enabled document executes Trojan.MacroMalware.A on victim's machine", color: "#ef4444" },
                  { step: 6, title: "Account Compromised", icon: "💀", desc: "Attacker gains full access to Microsoft 365, Azure AD, and corporate email", color: "#ef4444" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="h-10 w-10 rounded-xl border flex items-center justify-center text-lg z-10 relative"
                          style={{
                            borderColor: `${item.color}30`,
                            backgroundColor: `${item.color}10`,
                          }}
                        >
                          {item.icon}
                        </div>
                        {i < 5 && (
                          <div className="w-px h-8 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
                        )}
                      </div>
                      <div className="flex-1 pt-1.5 pb-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-mono text-[#555]">Step {item.step}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-xs text-[#666]">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#10b981]" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, i) => {
              const colors = {
                danger: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", icon: "#ef4444", dot: "#ef4444" },
                warning: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", icon: "#f59e0b", dot: "#f59e0b" },
                info: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", icon: "#6366f1", dot: "#6366f1" },
              };
              const c = colors[rec.level];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                >
                  <div className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: c.dot }} />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{rec.title}</p>
                    <p className="text-xs text-[#888]">{rec.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
