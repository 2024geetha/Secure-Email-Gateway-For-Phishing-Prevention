"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recentScans } from "@/lib/mock-data";
import { getThreatLevel, formatDate } from "@/lib/utils";

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
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">History</h1>
        <p className="text-sm text-[#666] mt-0.5">
          All previous email scans, chronologically organized.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#444]" />
        <Input
          placeholder="Search scan history..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Timeline */}
      {Object.entries(grouped).map(([date, scans]) => (
        <div key={date}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs font-medium text-[#555] whitespace-nowrap">{date}</span>
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
          </div>

          <div className="space-y-2">
            {scans.map((scan, i) => {
              const threat = getThreatLevel(scan.threatScore);
              const isOpen = expanded === scan.id;

              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => setExpanded(isOpen ? null : scan.id)}
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                    >
                      <div
                        className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${threat.color}12`, border: `1px solid ${threat.color}20` }}
                      >
                        <Mail className="h-4 w-4" style={{ color: threat.color }} />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
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
                        <div className="text-right hidden sm:block">
                          <div className="text-sm font-bold" style={{ color: threat.color }}>
                            {scan.threatScore}
                          </div>
                          <div className="text-[10px] text-[#444]">score</div>
                        </div>
                        <Badge
                          style={{
                            backgroundColor: threat.bg,
                            color: threat.color,
                            borderColor: `${threat.color}30`,
                          }}
                          className="text-[10px] hidden sm:flex"
                        >
                          {threat.label}
                        </Badge>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-[#555]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#555]" />
                        )}
                      </div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0 border-t border-[rgba(255,255,255,0.06)]">
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-2.5">
                                <p className="text-[10px] text-[#555]">Threat Score</p>
                                <p className="text-sm font-bold mt-0.5" style={{ color: threat.color }}>
                                  {scan.threatScore}/100
                                </p>
                              </div>
                              <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-2.5">
                                <p className="text-[10px] text-[#555]">Category</p>
                                <p className="text-xs font-medium text-white mt-0.5">{scan.category}</p>
                              </div>
                              <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-2.5">
                                <p className="text-[10px] text-[#555]">Status</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <CheckCircle2 className="h-3 w-3 text-[#22c55e]" />
                                  <p className="text-xs font-medium text-white capitalize">{scan.status}</p>
                                </div>
                              </div>
                              <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-2.5">
                                <p className="text-[10px] text-[#555]">File</p>
                                <p className="text-xs font-medium text-white mt-0.5 truncate">
                                  {scan.fileName || "Pasted content"}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Link href="/dashboard/report">
                                <Button variant="outline" size="sm" className="text-xs h-7">
                                  View Full Report
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm" className="text-xs h-7 text-[#ef4444] hover:text-[#ef4444]">
                                Delete
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
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Mail className="h-12 w-12 text-[#333] mb-4" />
          <p className="text-sm text-[#555] mb-1">No scans found</p>
          <p className="text-xs text-[#444]">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
