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
  Activity,
  Crosshair,
  ShieldAlert
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
import { cn } from "@/lib/utils";

export default function ThreatIntelligencePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Threat Intelligence</h1>
          <p className="text-slate-400 mt-1">
            Real-time global threat visibility and attack campaign tracking.
          </p>
        </div>
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1.5 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
          Live Feed Active
        </Badge>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Active Threat Domains", value: "12,847", icon: Globe, color: "#ef4444", change: "+247", desc: "Monitored globally" },
          { label: "Malware Families", value: "384", icon: Bug, color: "#f59e0b", change: "+12", desc: "Signatures updated" },
          { label: "Targeted Brands", value: "527", icon: Crosshair, color: "#8b5cf6", change: "+8", desc: "Being impersonated" },
          { label: "Countries Tracked", value: "191", icon: Flag, color: "#3b82f6", change: "stable", desc: "Origin locations" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 pointer-events-none transition-opacity group-hover:opacity-40" style={{ backgroundColor: item.color }} />
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-full bg-white/5 border border-white/10",
                      item.change.startsWith('+') ? "text-red-400" : "text-slate-400"
                    )}>
                      {item.change} today
                    </span>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-white tracking-tight mb-1">{item.value}</div>
                  <div className="text-sm font-medium text-slate-300">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-white/10 rounded-none p-0 h-auto mb-8 gap-6">
          {[
            { value: "overview", label: "Overview", icon: Activity },
            { value: "domains", label: "Threat Domains", icon: Globe },
            { value: "brands", label: "Targeted Brands", icon: ShieldAlert },
            { value: "countries", label: "Origin Countries", icon: Flag },
            { value: "malware", label: "Malware Families", icon: Bug },
          ].map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none px-0 py-4 text-slate-400 data-[state=active]:text-white transition-all whitespace-nowrap"
            >
              <tab.icon className="mr-2 h-4 w-4" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-0 outline-none space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-400" /> Attack Vectors Over Time
              </h3>
              <div className="h-[300px]">
                <MonthlyTrendChart data={monthlyTrendData} />
              </div>
            </Card>

            <Card className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-purple-400" /> Threat Radar
              </h3>
              <div className="h-[300px]">
                <ThreatRadarChart data={radarData} />
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick summary cards for other tabs */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-white">Top Malware</h3>
                <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">Critical</Badge>
              </div>
              <div className="space-y-4">
                {malwareFamilies.slice(0, 4).map((mw, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Bug className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{mw.name}</p>
                        <p className="text-xs text-slate-500">{mw.type}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white">{mw.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-white">Top Targets</h3>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">Brands</Badge>
              </div>
              <div className="space-y-4">
                {targetedBrands.slice(0, 4).map((brand, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                        {brand.logo}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{brand.brand}</p>
                        <p className="text-xs text-slate-500">{brand.percentage}% of attacks</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white">{brand.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-white">Top Origins</h3>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Countries</Badge>
              </div>
              <div className="space-y-4">
                {countryThreats.slice(0, 4).map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-xs text-blue-400">
                        {c.code}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{c.country}</p>
                        <p className="text-xs text-slate-500">{c.percentage}% of traffic</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white">{c.attacks}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Threat Domains */}
        <TabsContent value="domains" className="mt-0 outline-none">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {threatDomains.map((domain, i) => {
              const threat = getThreatLevel(domain.riskScore);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${threat.color}15`, border: `1px solid ${threat.color}30` }}
                      >
                        <Globe className="h-6 w-6" style={{ color: threat.color }} />
                      </div>
                      <Badge
                        style={{ backgroundColor: threat.bg, color: threat.color, borderColor: `${threat.color}30` }}
                      >
                        {threat.label} Risk
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-mono font-medium text-white break-all mb-2">
                      {domain.domain}
                    </h3>
                    <p className="text-sm text-slate-400 mb-6">{domain.threatType}</p>
                    
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Detections</p>
                        <p className="text-lg font-bold text-white">{domain.count.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Risk Score</p>
                        <p className="text-lg font-bold" style={{ color: threat.color }}>{domain.riskScore}/100</p>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-white/5">
                        <p className="text-xs text-slate-500 mb-1">Last Seen</p>
                        <p className="text-sm text-slate-300">{domain.lastSeen}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* Targeted Brands */}
        <TabsContent value="brands" className="mt-0 outline-none">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetedBrands.map((brand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 h-full flex flex-col items-center text-center group">
                  <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {brand.logo}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{brand.brand}</h3>
                  <p className="text-sm text-slate-400 mb-6">{brand.percentage}% of all impersonations</p>
                  
                  <div className="w-full p-4 rounded-xl bg-black/20 border border-white/5 mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">Attack Volume</span>
                      {brand.trend === "up" ? (
                        <span className="flex items-center text-xs text-red-400"><TrendingUp className="h-3 w-3 mr-1" /> Rising</span>
                      ) : brand.trend === "down" ? (
                        <span className="flex items-center text-xs text-green-400"><TrendingDown className="h-3 w-3 mr-1" /> Falling</span>
                      ) : (
                        <span className="flex items-center text-xs text-slate-400"><Minus className="h-3 w-3 mr-1" /> Stable</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white">{brand.count.toLocaleString()}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Countries */}
        <TabsContent value="countries" className="mt-0 outline-none">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Flag className="h-5 w-5 text-blue-400" /> Most Dangerous Origins
              </h3>
              <div className="space-y-6">
                {countryThreats.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-xs text-blue-400 font-bold">
                          {c.code}
                        </div>
                        <span className="text-base font-medium text-white">{c.country}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-white block">
                          {c.attacks.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">{c.percentage}% of total</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.percentage / 35) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6 sm:p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" /> Global Heatmap
              </h3>
              <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                {/* Abstract map visualization */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
                }} />
                
                {/* Map points */}
                <div className="absolute top-[30%] left-[20%] h-4 w-4 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] animate-pulse" />
                <div className="absolute top-[40%] left-[60%] h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(245,158,11,1)] animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-[25%] left-[75%] h-5 w-5 rounded-full bg-red-500 shadow-[0_0_25px_rgba(239,68,68,1)] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[60%] left-[30%] h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,1)] animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-[50%] left-[80%] h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse" style={{ animationDelay: '2s' }} />
                
                <div className="relative z-10 text-center p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                  <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-80" />
                  <p className="text-base font-semibold text-white">Interactive 3D Globe</p>
                  <p className="text-sm text-slate-400 mt-2 max-w-[200px]">
                    Visualizing real-time attack vectors and origin points globally.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Malware Families */}
        <TabsContent value="malware" className="mt-0 outline-none">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {malwareFamilies.map((mw, i) => {
              const threat = getThreatLevel(
                mw.severity === "critical" ? 91 : mw.severity === "high" ? 70 : 40
              );
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${threat.color}15`, border: `1px solid ${threat.color}30` }}
                      >
                        <Bug className="h-6 w-6" style={{ color: threat.color }} />
                      </div>
                      <Badge
                        style={{ backgroundColor: threat.bg, color: threat.color, borderColor: `${threat.color}30` }}
                      >
                        {mw.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{mw.name}</h3>
                    <p className="text-sm text-slate-400 mb-6">{mw.type}</p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">Total Detections</span>
                          <span className="text-sm font-bold text-white">{mw.count.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(mw.count / 1500) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: threat.color }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">First Detected</span>
                        <span className="text-slate-300 font-medium">{mw.firstDetected}</span>
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
