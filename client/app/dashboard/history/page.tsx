"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  FileText
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recentScans } from "@/lib/mock-data";
import { getThreatLevel, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = recentScans.filter(
    (s) =>
      s.subject.toLowerCase().includes(search.toLowerCase()) ||
      s.sender.toLowerCase().includes(search.toLowerCase())
  );

  const grouped: Record<string, typeof recentScans> = {};
  filtered.forEach((s) => {
    const date = new Date(s.receivedAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(s);
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Clock className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Scan History
          </h1>
          <p className="text-slate-400 text-base">
            Chronological timeline of all your email threat analyses.
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-2xl mx-auto"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          placeholder="Search history by subject or sender..."
          className="pl-12 h-14 rounded-2xl bg-[#111827] border-white/10 text-base shadow-lg focus-visible:ring-blue-500/50 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Timeline */}
      <div className="relative pt-8">
        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/20 to-transparent" />

        {Object.entries(grouped).map(([date, scans], groupIndex) => (
          <div key={date} className="mb-12 relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="flex items-center gap-4 mb-6 relative z-10"
            >
              <div className="hidden sm:block w-[100px] text-right">
                <span className="text-sm font-semibold text-slate-300">{date.split(',')[0]}</span>
                <p className="text-xs text-slate-500">{date.split(',')[1]}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] ring-4 ring-[#030712] sm:ml-[-5px]" />
              <div className="sm:hidden">
                <span className="text-sm font-semibold text-slate-300">{date}</span>
              </div>
            </motion.div>

            <div className="space-y-4 sm:pl-[140px] pl-10">
              {scans.map((scan, i) => {
                const threat = getThreatLevel(scan.threatScore);
                const isOpen = expanded === scan.id;

                return (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.1 + i * 0.05 }}
                  >
                    <Card className={cn(
                      "overflow-hidden transition-all duration-300 border-white/10",
                      isOpen ? "shadow-[0_0_30px_rgba(0,0,0,0.5)] border-white/20" : "hover:border-white/20"
                    )}>
                      <button
                        onClick={() => setExpanded(isOpen ? null : scan.id)}
                        className="w-full flex flex-col sm:flex-row sm:items-center gap-4 p-5 text-left bg-gradient-to-r from-white/[0.02] to-transparent hover:from-white/[0.04] transition-colors"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div
                            className="h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center border"
                            style={{ backgroundColor: `${threat.color}15`, borderColor: `${threat.color}30` }}
                          >
                            <Mail className="h-5 w-5" style={{ color: threat.color }} />
                          </div>

                          <div className="flex-1 min-w-0 text-left sm:hidden">
                            <p className="text-base font-semibold text-white truncate">{scan.subject}</p>
                            <p className="text-sm text-slate-400 truncate">{scan.sender}</p>
                          </div>
                        </div>

                        <div className="hidden sm:block flex-1 min-w-0 text-left">
                          <p className="text-base font-semibold text-white truncate mb-1">{scan.subject}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-400 truncate max-w-[200px] lg:max-w-[300px]">{scan.sender}</span>
                            <span className="text-slate-600">•</span>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                              <Clock className="h-3.5 w-3.5" />
                              {formatDate(scan.receivedAt).split(',')[1]}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-xl font-bold" style={{ color: threat.color }}>
                                {scan.threatScore}
                              </div>
                              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Score</div>
                            </div>
                            <Badge
                              style={{
                                backgroundColor: threat.bg,
                                color: threat.color,
                                borderColor: `${threat.color}30`,
                              }}
                              className="px-3 py-1 shadow-lg"
                            >
                              {threat.label}
                            </Badge>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 sm:p-6 bg-black/20 border-t border-white/5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <ShieldAlert className="h-4 w-4 text-slate-400" />
                                    <p className="text-xs font-medium text-slate-400">Threat Category</p>
                                  </div>
                                  <p className="text-sm font-semibold text-white">{scan.category}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="h-4 w-4 text-slate-400" />
                                    <p className="text-xs font-medium text-slate-400">Analysis Status</p>
                                  </div>
                                  <p className="text-sm font-semibold text-green-400 capitalize">{scan.status}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 lg:col-span-2">
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-slate-400" />
                                    <p className="text-xs font-medium text-slate-400">Source File</p>
                                  </div>
                                  <p className="text-sm font-mono text-slate-300 truncate">
                                    {scan.fileName || "Pasted raw content"}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/dashboard/report" className="flex-1 sm:flex-none">
                                  <Button className="w-full rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                                    View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button variant="outline" className="rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                                  Delete Record
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No history found</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              We couldn't find any past scans matching your search. Try adjusting your terms or analyze a new email.
            </p>
            <Link href="/dashboard/analyze" className="mt-8">
              <Button size="lg" className="rounded-xl">
                Analyze New Email
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
