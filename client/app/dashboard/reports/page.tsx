"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  FileJson,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Mail,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentScans } from "@/lib/mock-data";
import { getThreatLevel, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ALL_LEVELS = ["All", "Critical", "High Risk", "Medium Risk", "Low Risk", "Clean"];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortField, setSortField] = useState<"threatScore" | "receivedAt" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = recentScans
    .filter((s) => {
      const matchSearch =
        s.subject.toLowerCase().includes(search.toLowerCase()) ||
        s.sender.toLowerCase().includes(search.toLowerCase());
      const level = getThreatLevel(s.threatScore).label;
      const matchFilter = filter === "All" || level === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === "threatScore") {
        return sortDir === "asc" ? a.threatScore - b.threatScore : b.threatScore - a.threatScore;
      }
      if (sortField === "receivedAt") {
        return sortDir === "asc"
          ? new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
          : new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime();
      }
      return 0;
    });

  const toggleSort = (field: "threatScore" | "receivedAt") => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: "threatScore" | "receivedAt" }) => {
    if (sortField !== field) return <ChevronsUpDown className="h-3.5 w-3.5 ml-1 text-purple-300/70" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3.5 w-3.5 ml-1 text-purple-400" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 ml-1 text-purple-400" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports</h1>
          <p className="text-purple-200 mt-1">
            Complete scan history with threat scores and categories.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10">
            <FileJson className="mr-2 h-4 w-4" /> Export JSON
          </Button>
          <Button className="rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Total Scans", value: recentScans.length, color: "#8b5cf6", icon: Search },
          { label: "Threats Found", value: recentScans.filter((s) => s.threatScore >= 60).length, color: "#ef4444", icon: ShieldAlert },
          { label: "Clean Emails", value: recentScans.filter((s) => s.threatScore < 20).length, color: "#22c55e", icon: CheckCircle2 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 pointer-events-none transition-opacity group-hover:opacity-20" style={{ backgroundColor: item.color }} />
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  <item.icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white tracking-tight">{item.value}</div>
                  <div className="text-sm font-medium text-purple-200">{item.label}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-2 sm:p-4 bg-black/20 border-purple-500/10 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-200" />
            <Input
              placeholder="Search by subject or sender..."
              className="pl-12 h-12 rounded-xl bg-purple-500/5 border-purple-500/20 text-base focus-visible:ring-purple-500/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/5 border border-purple-500/20 shrink-0">
              <Filter className="h-4 w-4 text-purple-200" />
              <span className="text-sm font-medium text-purple-100">Filter:</span>
            </div>
            <div className="flex gap-2">
              {ALL_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                    filter === level
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      : "bg-purple-500/5 text-purple-200 border border-transparent hover:bg-purple-500/10 hover:text-white"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden border-purple-500/20">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-black/40">
                <TableRow className="border-purple-500/10 hover:bg-transparent">
                  <TableHead className="w-12 text-center text-purple-200">#</TableHead>
                  <TableHead className="text-purple-200 font-medium">Email Subject</TableHead>
                  <TableHead className="text-purple-200 font-medium">Sender</TableHead>
                  <TableHead className="text-purple-200 font-medium">Category</TableHead>
                  <TableHead>
                    <button
                      className="flex items-center text-purple-200 font-medium hover:text-white transition-colors group"
                      onClick={() => toggleSort("threatScore")}
                    >
                      Score <SortIcon field="threatScore" />
                    </button>
                  </TableHead>
                  <TableHead className="text-purple-200 font-medium">Level</TableHead>
                  <TableHead>
                    <button
                      className="flex items-center text-purple-200 font-medium hover:text-white transition-colors group"
                      onClick={() => toggleSort("receivedAt")}
                    >
                      Date <SortIcon field="receivedAt" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right text-purple-200 font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filtered.map((scan, i) => {
                    const threat = getThreatLevel(scan.threatScore);
                    return (
                      <motion.tr
                        key={scan.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                        className="border-purple-500/10 hover:bg-white/[0.02] transition-colors group"
                      >
                        <TableCell className="text-purple-300/70 text-sm text-center font-mono">{i + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border"
                              style={{ backgroundColor: `${threat.color}15`, borderColor: `${threat.color}30` }}
                            >
                              <Mail className="h-4 w-4" style={{ color: threat.color }} />
                            </div>
                            <span className="text-sm text-white font-medium truncate max-w-[250px]">
                              {scan.subject}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-purple-200 text-sm max-w-[200px] truncate">
                          {scan.sender}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-purple-200">{scan.category}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-base font-bold" style={{ color: threat.color }}>
                            {scan.threatScore}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            style={{
                              backgroundColor: threat.bg,
                              color: threat.color,
                              borderColor: `${threat.color}30`,
                            }}
                            className="whitespace-nowrap px-3 py-1"
                          >
                            {threat.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-purple-200">
                          {formatDate(scan.receivedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href="/dashboard/report">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500/10">
                              <ArrowUpRight className="h-4.5 w-4.5 text-purple-100" />
                            </Button>
                          </Link>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-20 w-20 rounded-full bg-purple-500/5 border border-purple-500/20 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-purple-300/70" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
              <p className="text-purple-200 max-w-sm mx-auto">
                We couldn't find any scans matching your current search and filter criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-xl"
                onClick={() => { setSearch(""); setFilter("All"); }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-purple-500/20 bg-black/20">
            <p className="text-sm text-purple-200">
              Showing <span className="text-white font-medium">{filtered.length}</span> of <span className="text-white font-medium">{recentScans.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl border-purple-500/20 hover:bg-purple-500/10" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl w-9 bg-purple-500/20 border-purple-500/30 text-purple-300">
                1
              </Button>
              <Button variant="ghost" size="sm" className="rounded-xl w-9 text-purple-200 hover:text-white hover:bg-purple-500/10">
                2
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl border-purple-500/20 hover:bg-purple-500/10">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
