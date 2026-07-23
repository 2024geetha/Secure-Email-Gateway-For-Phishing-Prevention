"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  WeeklyScansChart,
  ThreatCategoriesPie,
  TopBrandsChart,
  MonthlyTrendChart,
} from "@/components/charts";
import {
  dashboardStats,
  weeklyScansData,
  threatCategoriesData,
  topImpersonatedBrands,
  monthlyTrendData,
  recentScans,
} from "@/lib/mock-data";
import { getThreatLevel, formatDate, formatNumber } from "@/lib/utils";

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
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
    color: "#10b981",
  },
  {
    label: "Threats Blocked",
    value: dashboardStats.threatsBlocked,
    change: dashboardStats.threatsBlockedChange,
    icon: AlertTriangle,
    color: "#ef4444",
  },
  {
    label: "High Risk Emails",
    value: dashboardStats.highRiskEmails,
    change: dashboardStats.highRiskChange,
    icon: Shield,
    color: "#f59e0b",
  },
  {
    label: "Avg Threat Score",
    value: dashboardStats.avgThreatScore,
    change: dashboardStats.avgScoreChange,
    icon: TrendingUp,
    color: "#6366f1",
    suffix: "/100",
  },
];

const threatColors = ["#10b981", "#ef4444", "#f59e0b", "#6366f1", "#ec4899"];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-[#666] mt-0.5">Welcome back, Alex. Here's your security overview.</p>
        </div>
        <Link href="/dashboard/analyze">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Analyze Email
          </Button>
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          const positive = card.change > 0;
          const isGoodPositive = card.label === "Emails Scanned" && positive;
          const isBadPositive =
            (card.label === "Threats Blocked" || card.label === "High Risk Emails") && positive;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -2 }}
            >
              <Card className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}25` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: card.color }} />
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{
                      color: isBadPositive ? "#ef4444" : positive ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {positive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(card.change)}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber value={card.value} />
                    {card.suffix && (
                      <span className="text-sm font-normal text-[#555]">{card.suffix}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#666]">{card.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Weekly Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Weekly Scans</h3>
                <p className="text-xs text-[#555] mt-0.5">Emails scanned vs threats detected</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#555]">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                  Scans
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  Threats
                </div>
              </div>
            </div>
            <WeeklyScansChart data={weeklyScansData} />
          </Card>
        </motion.div>

        {/* Threat Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white">Threat Categories</h3>
              <p className="text-xs text-[#555] mt-0.5">This week's distribution</p>
            </div>
            <ThreatCategoriesPie data={threatCategoriesData} />
            <div className="mt-4 space-y-2">
              {threatCategoriesData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: threatColors[i] }}
                    />
                    <span className="text-[#888]">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Monthly Trends</h3>
                <p className="text-xs text-[#555] mt-0.5">Phishing, malware & spam over time</p>
              </div>
            </div>
            <MonthlyTrendChart data={monthlyTrendData} />
          </Card>
        </motion.div>

        {/* Top Impersonated Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Top Impersonated Brands</h3>
                <p className="text-xs text-[#555] mt-0.5">This month's targets</p>
              </div>
            </div>
            <TopBrandsChart data={topImpersonatedBrands} />
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
              <Link href="/dashboard/history">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[#666]">
                  View All <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-0">
              {recentScans.slice(0, 5).map((scan, i) => {
                const threat = getThreatLevel(scan.threatScore);
                return (
                  <React.Fragment key={scan.id}>
                    {i > 0 && <Separator />}
                    <Link href="/dashboard/report">
                      <motion.div
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                        className="flex items-center gap-4 py-3.5 px-1 -mx-1 rounded-lg cursor-pointer transition-colors"
                      >
                        <div
                          className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${threat.color}15` }}
                        >
                          <Mail className="h-3.5 w-3.5" style={{ color: threat.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{scan.subject}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-[#555] truncate">{scan.sender}</span>
                            <span className="text-[#333]">·</span>
                            <div className="flex items-center gap-1 text-xs text-[#555]">
                              <Clock className="h-3 w-3" />
                              {formatDate(scan.receivedAt)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <div className="text-sm font-bold" style={{ color: threat.color }}>
                              {scan.threatScore}
                            </div>
                            <div className="text-[10px] text-[#555]">score</div>
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
                          <ArrowUpRight className="h-4 w-4 text-[#444]" />
                        </div>
                      </motion.div>
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
