"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  ChevronRight,
  Activity,
  Globe,
  Bot,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  WeeklyScansChart,
  ThreatCategoriesPie,
} from "@/components/charts";
import {
  dashboardStats,
  weeklyScansData,
  threatCategoriesData,
  recentScans,
} from "@/lib/mock-data";
import { getThreatLevel, formatDate, formatNumber } from "@/lib/utils";

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{formatNumber(displayed)}</span>;
}

const statCards = [
  {
    label: "Emails Scanned",
    value: dashboardStats.emailsScanned,
    change: dashboardStats.emailsScannedChange,
    icon: Mail,
    color: "#8b5cf6", // Purple
    bg: "rgba(139,92,246,0.1)",
  },
  {
    label: "Threats Blocked",
    value: dashboardStats.threatsBlocked,
    change: dashboardStats.threatsBlockedChange,
    icon: Shield,
    color: "#3b82f6", // Blue
    bg: "rgba(59,130,246,0.1)",
  },
  {
    label: "High Risk Emails",
    value: dashboardStats.highRiskEmails,
    change: dashboardStats.highRiskChange,
    icon: AlertTriangle,
    color: "#ef4444", // Red
    bg: "rgba(239,68,68,0.1)",
  },
  {
    label: "Avg Threat Score",
    value: dashboardStats.avgThreatScore,
    change: dashboardStats.avgScoreChange,
    icon: Activity,
    color: "#f59e0b", // Orange
    bg: "rgba(245,158,11,0.1)",
    suffix: "/100",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            System Operational
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Overview</h1>
          <p className="text-purple-200 mt-1">Real-time threat intelligence and email analysis.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Button variant="outline" className="hidden sm:flex rounded-xl">
            <Clock className="mr-2 h-4 w-4 text-purple-200" /> Last 7 Days
          </Button>
          <Link href="/dashboard/analyze">
            <Button className="rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              <Zap className="mr-2 h-4 w-4" /> Analyze Email
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          const positive = card.change > 0;
          const isGoodPositive = card.label === "Emails Scanned" && positive;
          const isBadPositive = (card.label === "Threats Blocked" || card.label === "High Risk Emails") && positive;
          const trendColor = isBadPositive ? "#ef4444" : positive ? "#22c55e" : "#ef4444";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 h-full flex flex-col justify-between group">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: card.bg, border: `1px solid ${card.color}30` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: card.color }} />
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-purple-500/5 border border-purple-500/20"
                    style={{ color: trendColor }}
                  >
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(card.change)}%
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white tracking-tight mb-1">
                    <AnimatedNumber value={card.value} />
                    {card.suffix && <span className="text-lg font-normal text-purple-300/70">{card.suffix}</span>}
                  </div>
                  <p className="text-sm text-purple-200 font-medium">{card.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Threat Activity</h3>
                <p className="text-sm text-purple-200">Scans vs detections over time</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-purple-200 bg-purple-500/5 px-3 py-1.5 rounded-full border border-purple-500/20">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                  Scans
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  Threats
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <WeeklyScansChart data={weeklyScansData} />
            </div>
          </Card>
        </motion.div>

        {/* AI Copilot Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-6"
        >
          <Card className="p-6 flex-1 bg-gradient-to-br from-[#0a0014] to-[#1e1b4b] border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Bot className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">AI Copilot Insights</h3>
                <p className="text-xs text-purple-300">Updated just now</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/20 border border-purple-500/10 backdrop-blur-sm">
                <p className="text-sm text-purple-100 leading-relaxed">
                  "We've detected a <span className="text-red-400 font-medium">32% increase</span> in credential harvesting attempts targeting your finance department over the last 48 hours. I recommend updating your DMARC policies."
                </p>
              </div>
              <Button className="w-full rounded-xl bg-purple-500/10 hover:bg-white/20 text-white border-none shadow-none">
                View Detailed Analysis
              </Button>
            </div>
          </Card>

          <Card className="p-6 flex-1">
            <h3 className="text-base font-semibold text-white mb-4">Threat Distribution</h3>
            <div className="h-[180px]">
              <ThreatCategoriesPie data={threatCategoriesData} />
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-purple-500/10">
              <div>
                <CardTitle>Recent Detections</CardTitle>
                <p className="text-sm text-purple-200 mt-1">Latest high-risk emails isolated</p>
              </div>
              <Link href="/dashboard/history">
                <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white rounded-lg">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-white/5">
                {recentScans.slice(0, 5).map((scan) => {
                  const threat = getThreatLevel(scan.threatScore);
                  return (
                    <Link key={scan.id} href="/dashboard/report" className="block hover:bg-white/[0.02] transition-colors p-4 sm:px-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border"
                          style={{ backgroundColor: threat.bg, borderColor: `${threat.color}30` }}
                        >
                          <Mail className="h-4.5 w-4.5" style={{ color: threat.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{scan.subject}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-purple-200 truncate">{scan.sender}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs text-purple-300/70 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {formatDate(scan.receivedAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-sm font-bold" style={{ color: threat.color }}>
                            {scan.threatScore}/100
                          </span>
                          <Badge
                            style={{ backgroundColor: threat.bg, color: threat.color, borderColor: `${threat.color}30` }}
                            className="text-[10px] px-2 py-0"
                          >
                            {threat.label}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Global Threat Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Global Threat Origins</h3>
                <p className="text-sm text-purple-200">Live attack mapping</p>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                <Globe className="mr-1.5 h-3 w-3" /> Live
              </Badge>
            </div>
            
            <div className="flex-1 rounded-2xl bg-black/20 border border-purple-500/10 relative overflow-hidden flex items-center justify-center min-h-[300px]">
              {/* Abstract map visualization */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
              }} />
              
              {/* Map points */}
              <div className="absolute top-[30%] left-[20%] h-3 w-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse" />
              <div className="absolute top-[40%] left-[60%] h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,1)] animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-[25%] left-[75%] h-4 w-4 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[60%] left-[30%] h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,1)] animate-pulse" style={{ animationDelay: '1.5s' }} />
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                <path d="M 20% 30% Q 40% 10% 75% 25%" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                <path d="M 60% 40% Q 45% 50% 30% 60%" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_15s_linear_infinite_reverse]" />
              </svg>

              <div className="relative z-10 text-center">
                <Globe className="h-12 w-12 text-slate-600 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium text-purple-200">Interactive Map Component</p>
                <p className="text-xs text-purple-300/70 mt-1">Requires WebGL integration</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { country: "Russia", value: "31%", color: "#ef4444" },
                { country: "China", value: "25%", color: "#f59e0b" },
                { country: "North Korea", value: "14%", color: "#8b5cf6" },
              ].map((item, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                  <p className="text-lg font-bold" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-purple-200 mt-1">{item.country}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
