"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Shield,
  Flag,
  Bug,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  threatDomains,
  targetedBrands,
  countryThreats,
  malwareFamilies,
  monthlyTrendData,
} from "@/lib/mock-data";
import { getThreatLevel } from "@/lib/utils";
import { MonthlyTrendChart, ThreatRadarChart } from "@/components/charts";
import { radarData } from "@/lib/mock-data";

export default function ThreatIntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Threat Intelligence</h1>
          <p className="text-sm text-[#666] mt-0.5">
            Real-time global threat visibility and attack campaign tracking.
          </p>
        </div>
        <Badge className="text-xs">
          <div className="h-1.5 w-1.5 rounded-full bg-[#10b981] mr-1.5 animate-pulse" />
          Live Feed
        </Badge>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Threat Domains", value: "12,847", icon: Globe, color: "#ef4444", change: "+247" },
          { label: "Malware Families", value: "384", icon: Bug, color: "#f59e0b", change: "+12" },
          { label: "Targeted Brands", value: "527", icon: Shield, color: "#10b981", change: "+8" },
          { label: "Countries Tracked", value: "191", icon: Flag, color: "#6366f1", change: "stable" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2 }}
            >
              <Card className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}25` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-medium text-[#555]">{item.change} today</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-xs text-[#555]">{item.label}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="domains">
        <TabsList>
          <TabsTrigger value="domains">Threat Domains</TabsTrigger>
          <TabsTrigger value="brands">Targeted Brands</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="malware">Malware</TabsTrigger>
        </TabsList>

        {/* Threat Domains */}
        <TabsContent value="domains">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-3">
              {threatDomains.map((domain, i) => {
                const threat = getThreatLevel(domain.riskScore);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -1 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${threat.color}15` }}
                        >
                          <Globe className="h-4 w-4" style={{ color: threat.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-mono font-medium text-white truncate">
                              {domain.domain}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm font-bold" style={{ color: threat.color }}>
                                {domain.riskScore}
                              </span>
                              <Badge
                                style={{
                                  backgroundColor: threat.bg,
                                  color: threat.color,
                                  borderColor: `${threat.color}30`,
                                }}
                                className="text-[10px]"
                              >
                                {threat.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#555]">
                            <span>{domain.threatType}</span>
                            <span>Count: <span className="text-white">{domain.count.toLocaleString()}</span></span>
                            <span>Last seen: <span className="text-[#888]">{domain.lastSeen}</span></span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-4">
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Threat Radar</h3>
                <ThreatRadarChart data={radarData} />
              </Card>
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Monthly Trends</h3>
                <MonthlyTrendChart data={monthlyTrendData} />
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Targeted Brands */}
        <TabsContent value="brands">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {targetedBrands.map((brand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{brand.logo}</span>
                      <span className="text-sm font-semibold text-white">{brand.brand}</span>
                    </div>
                    {brand.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-[#ef4444]" />
                    ) : brand.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-[#22c55e]" />
                    ) : (
                      <Minus className="h-4 w-4 text-[#666]" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {brand.count.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#555] mb-3">{brand.percentage}% of attacks</div>
                  <Progress
                    value={brand.percentage}
                    max={30}
                    color={brand.trend === "up" ? "#ef4444" : "#10b981"}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Countries */}
        <TabsContent value="countries">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-white mb-5">Most Dangerous Countries</h3>
              <div className="space-y-4">
                {countryThreats.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#555] w-6">{c.code}</span>
                        <span className="text-sm text-white">{c.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white font-medium">
                          {c.attacks.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#555]">{c.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={c.percentage} max={35} color="#ef4444" />
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Attack Origin Map</h3>
              <div className="flex items-center justify-center h-48 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-[#333] mx-auto mb-3" />
                  <p className="text-xs text-[#444]">Interactive world map</p>
                  <p className="text-[11px] text-[#333] mt-1">Real-time attack origins</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {countryThreats.slice(0, 4).map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: `hsl(${0 + i * 15}, 70%, 55%)`,
                      }}
                    />
                    <span className="text-[#888] flex-1">{c.country}</span>
                    <span className="text-white">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Malware Families */}
        <TabsContent value="malware">
          <div className="grid gap-3">
            {malwareFamilies.map((mw, i) => {
              const threat = getThreatLevel(
                mw.severity === "critical" ? 91 : mw.severity === "high" ? 70 : 40
              );
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -1 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${threat.color}12`, border: `1px solid ${threat.color}20` }}
                      >
                        <Bug className="h-4.5 w-4.5" style={{ color: threat.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{mw.name}</span>
                            <Badge
                              style={{
                                backgroundColor: threat.bg,
                                color: threat.color,
                                borderColor: `${threat.color}30`,
                              }}
                              className="text-[10px]"
                            >
                              {mw.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <span className="text-sm font-bold text-white">
                            {mw.count.toLocaleString()} detections
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#555]">
                          <span>{mw.type}</span>
                          <span>First detected: {mw.firstDetected}</span>
                        </div>
                        <Progress value={(mw.count / 1250) * 100} className="mt-2.5" color={threat.color} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
