"use client";

import React, { useState, useEffect } from "react";
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
  ShieldAlert,
  FileText,
  Globe,
  FileWarning,
  Activity,
  Zap,
  Bot
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
import { cn } from "@/lib/utils";

function ThreatScoreRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
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

  const strokeDashoffset = circumference - (displayed / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer glow */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: level.color }}
        />
        
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 relative z-10">
          <circle
            stroke="rgba(255,255,255,0.05)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={level.color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center text-center z-20">
          <motion.span
            className="text-5xl font-bold tracking-tighter"
            style={{ color: level.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {displayed}
          </motion.span>
          <span className="text-sm text-slate-500 font-medium mt-1">/ 100</span>
        </div>
      </div>
      
      <Badge
        style={{
          backgroundColor: level.bg,
          color: level.color,
          borderColor: `${level.color}30`,
        }}
        className="mt-2 px-4 py-1 text-sm shadow-lg"
      >
        {level.label}
      </Badge>
    </div>
  );
}

function StatusIcon({ status }: { status: "passed" | "failed" | "warning" | "neutral" }) {
  if (status === "passed") return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  if (status === "failed") return <XCircle className="h-5 w-5 text-red-500" />;
  if (status === "warning") return <AlertTriangle className="h-5 w-5 text-orange-500" />;
  return <div className="h-5 w-5 rounded-full border-2 border-slate-500" />;
}

export default function ReportPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Navigation / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/dashboard/analyze" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Analysis
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl bg-white/5 border-white/10 hover:bg-white/10">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button className="rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Share2 className="mr-2 h-4 w-4" /> Share Report
          </Button>
        </div>
      </div>

      {/* Main Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 sm:p-10 bg-gradient-to-br from-[#111827] to-[#081226] border-white/10 overflow-hidden relative">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 relative z-10">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 px-3 py-1">
                    <ShieldAlert className="mr-1.5 h-3.5 w-3.5" /> Critical Threat Detected
                  </Badge>
                  <span className="text-sm text-slate-400 flex items-center">
                    <Clock className="mr-1.5 h-3.5 w-3.5" /> {formatDate(currentAnalysisEmail.receivedAt)}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  {currentAnalysisEmail.subject}
                </h1>
                <p className="text-lg text-slate-400">From: <span className="text-slate-300">{currentAnalysisEmail.sender}</span></p>
              </div>

              <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">AI Copilot Summary</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {currentAnalysisEmail.summary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Category", value: currentAnalysisEmail.category, icon: AlertTriangle },
                  { label: "Target", value: currentAnalysisEmail.recipient, icon: Mail },
                  { label: "Confidence", value: `${aiAnalysis.confidence}%`, icon: Activity },
                  { label: "File", value: currentAnalysisEmail.fileName || "Pasted", icon: FileText },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <item.icon className="h-4 w-4 text-slate-400 mb-2" />
                    <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-white truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
              <h3 className="text-sm font-medium text-slate-400 mb-6 text-center">Overall Threat Score</h3>
              <ThreatScoreRing score={currentAnalysisEmail.threatScore} />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Detailed Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-white/10 rounded-none p-0 h-auto mb-8 gap-6">
            {[
              { value: "ai", label: "AI Analysis", icon: Bot },
              { value: "headers", label: "Headers & Auth", icon: Shield },
              { value: "urls", label: "URL Analysis", icon: Globe },
              { value: "attachments", label: "Attachments", icon: FileWarning },
              { value: "timeline", label: "Attack Timeline", icon: Activity },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none px-0 py-4 text-slate-400 data-[state=active]:text-white transition-all"
              >
                <tab.icon className="mr-2 h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* AI Analysis Tab */}
          <TabsContent value="ai" className="space-y-6 mt-0 outline-none">
            <div className="grid lg:grid-cols-[1fr_400px] gap-6">
              <div className="space-y-6">
                <Card className="p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Bot className="h-5 w-5 text-purple-400" /> Behavioral Indicators
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: "Urgency & Time Pressure", value: aiAnalysis.urgency, color: "#ef4444" },
                      { label: "Authority Exploitation", value: aiAnalysis.authority, color: "#f59e0b" },
                      { label: "Fear & Intimidation", value: aiAnalysis.fear, color: "#f59e0b" },
                      { label: "Credential Theft Intent", value: aiAnalysis.credentialTheft, color: "#ef4444" },
                      { label: "Financial Fraud", value: aiAnalysis.financialFraud, color: "#3b82f6" },
                      { label: "Grammar & Spelling", value: aiAnalysis.grammarScore, color: "#22c55e" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-300">{item.label}</span>
                          <span className="text-sm font-bold" style={{ color: item.color }}>
                            {item.value}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 sm:p-8 border-red-500/20 bg-red-500/5">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-red-400" /> Recommended Actions
                  </h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, i) => {
                      const colors = {
                        danger: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
                        warning: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
                        info: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
                      };
                      const c = colors[rec.level];
                      return (
                        <div key={i} className={cn("p-4 rounded-xl border flex items-start gap-4", c.bg, c.border)}>
                          <div className={cn("mt-1 shrink-0", c.text)}>
                            {rec.level === 'danger' ? <XCircle className="h-5 w-5" /> : 
                             rec.level === 'warning' ? <AlertTriangle className="h-5 w-5" /> : 
                             <CheckCircle2 className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4 className={cn("text-sm font-semibold mb-1", c.text)}>{rec.title}</h4>
                            <p className="text-sm text-slate-300">{rec.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Threat Radar</h3>
                  <div className="h-[300px]">
                    <ThreatRadarChart data={radarData} />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Key Evidence</h3>
                  <div className="space-y-3">
                    {aiAnalysis.indicators.map((ind, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{ind}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Headers Tab */}
          <TabsContent value="headers" className="mt-0 outline-none">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white">Authentication Analysis</h3>
                  <p className="text-sm text-slate-400 mt-1">SPF, DKIM, and DMARC verification results</p>
                </div>
                <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20">
                  Authentication Failed
                </Badge>
              </div>

              <div className="grid gap-4">
                {headerAnalysis.map((h, i) => {
                  const s = getStatusColor(h.status);
                  return (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className="flex items-center gap-4 sm:w-1/4 shrink-0">
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                          <StatusIcon status={h.status} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{h.field}</p>
                          <p className="text-xs" style={{ color: s.color }}>{s.label}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-2">
                          <code className="text-xs text-slate-300 break-all">{h.value}</code>
                        </div>
                        <p className="text-sm text-slate-400">{h.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* URLs Tab */}
          <TabsContent value="urls" className="mt-0 outline-none">
            <div className="space-y-6">
              {urlAnalysis.map((url, i) => {
                const threat = getThreatLevel(url.riskScore);
                return (
                  <Card key={i} className="p-6 sm:p-8 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: threat.color }} />
                    
                    <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge style={{ backgroundColor: threat.bg, color: threat.color, borderColor: `${threat.color}30` }}>
                            {threat.label} Risk
                          </Badge>
                          <span className="text-sm text-slate-400">Category: <span className="text-white">{url.category}</span></span>
                        </div>
                        <h3 className="text-lg font-mono text-white break-all">{url.url}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4 shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="text-center px-4 border-r border-white/10">
                          <p className="text-2xl font-bold" style={{ color: threat.color }}>{url.riskScore}</p>
                          <p className="text-xs text-slate-500">Risk Score</p>
                        </div>
                        <div className="text-center px-4">
                          <p className="text-lg font-semibold text-white">{url.whoisAge}</p>
                          <p className="text-xs text-slate-500">Domain Age</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-slate-300">Redirect Chain Analysis</h4>
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                        {url.redirectChain.map((r, j) => (
                          <div key={j} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                              <div className={cn(
                                "h-6 w-6 rounded-full flex items-center justify-center border-2 z-10 bg-[#111827]",
                                j === url.redirectChain.length - 1 ? "border-red-500 text-red-500" : "border-slate-500 text-slate-500"
                              )}>
                                <span className="text-[10px] font-bold">{j + 1}</span>
                              </div>
                              {j < url.redirectChain.length - 1 && (
                                <div className="w-0.5 h-8 bg-white/10 -mb-4 mt-1" />
                              )}
                            </div>
                            <div className="pt-0.5">
                              <code className={cn(
                                "text-sm break-all",
                                j === url.redirectChain.length - 1 ? "text-red-400" : "text-slate-300"
                              )}>
                                {r}
                              </code>
                              {j === url.redirectChain.length - 1 && (
                                <p className="text-xs text-red-500/70 mt-1 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" /> Malicious payload destination
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="mt-0 outline-none">
            <div className="space-y-6">
              {attachmentAnalysis.map((att, i) => {
                const threat = getThreatLevel(att.riskLevel === "critical" ? 91 : att.riskLevel === "high" ? 74 : 40);
                return (
                  <Card key={i} className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-6 justify-between mb-8">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                          <FileWarning className="h-7 w-7 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{att.filename}</h3>
                          <p className="text-sm text-slate-400">{att.type} • {att.size}</p>
                        </div>
                      </div>
                      <Badge style={{ backgroundColor: threat.bg, color: threat.color, borderColor: `${threat.color}30` }} className="h-fit px-4 py-1.5 text-sm">
                        {threat.label} Risk
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xs text-slate-500 mb-1">SHA-256 Hash</p>
                        <code className="text-xs text-slate-300 break-all">{att.hash}</code>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Macros Detected</p>
                          <p className="text-sm font-medium text-white">{att.hasMacro ? "Yes" : "No"}</p>
                        </div>
                        {att.hasMacro ? <XCircle className="h-6 w-6 text-red-500" /> : <CheckCircle2 className="h-6 w-6 text-green-500" />}
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Malware Found</p>
                          <p className="text-sm font-medium text-white">{att.malwareDetected ? "Yes" : "No"}</p>
                        </div>
                        {att.malwareDetected ? <AlertTriangle className="h-6 w-6 text-red-500" /> : <CheckCircle2 className="h-6 w-6 text-green-500" />}
                      </div>
                    </div>

                    {att.signatures.length > 0 && (
                      <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20">
                        <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                          <Bug className="h-4 w-4" /> Identified Threat Signatures
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {att.signatures.map((sig, j) => (
                            <Badge key={j} variant="outline" className="bg-red-500/10 text-red-300 border-red-500/20 font-mono text-xs">
                              {sig}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-0 outline-none">
            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
              <Card className="p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white mb-8">Analysis Execution Timeline</h3>
                <div className="relative ml-4 sm:ml-8">
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 opacity-30" />
                  
                  <div className="space-y-8">
                    {threatTimeline.map((event, i) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8 sm:pl-12"
                      >
                        <div className="absolute left-[-20px] top-1 h-10 w-10 rounded-full bg-[#111827] border-2 border-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h4 className="text-base font-semibold text-white">{event.title}</h4>
                            <Badge variant="outline" className="w-fit bg-black/40 text-slate-400 border-white/10 font-mono text-xs">
                              {event.timestamp}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{event.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 sm:p-8 bg-gradient-to-b from-orange-500/10 to-red-500/10 border-red-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Attack Simulation</h3>
                    <p className="text-sm text-red-400/80">Projected impact if opened</p>
                  </div>
                </div>
                
                <div className="space-y-0 relative">
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-red-500/20" />
                  {[
                    { step: 1, title: "Email Received", icon: "📧", desc: "Victim receives convincing Microsoft security email" },
                    { step: 2, title: "Link Clicked", icon: "🖱️", desc: "Victim clicks 'Verify Account' link in email body" },
                    { step: 3, title: "Fake Login Page", icon: "🌐", desc: "Redirected to pixel-perfect Microsoft clone on micros0ft-verify.com" },
                    { step: 4, title: "Credentials Stolen", icon: "🔑", desc: "Email and password captured and sent to attacker server in Russia" },
                    { step: 5, title: "Attachment Opened", icon: "📎", desc: "Macro-enabled document executes Trojan.MacroMalware.A on victim's machine" },
                    { step: 6, title: "Account Compromised", icon: "💀", desc: "Attacker gains full access to Microsoft 365, Azure AD, and corporate email" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 relative py-4">
                      <div className="h-10 w-10 rounded-full bg-[#111827] border-2 border-red-500/30 flex items-center justify-center text-lg z-10 shrink-0 shadow-lg">
                        {item.icon}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
