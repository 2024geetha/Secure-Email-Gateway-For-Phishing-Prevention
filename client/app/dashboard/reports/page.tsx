"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    if (sortField !== field) return <ChevronsUpDown className="h-3.5 w-3.5 ml-1 text-[#444]" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3.5 w-3.5 ml-1 text-[#10b981]" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 ml-1 text-[#10b981]" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-[#666] mt-0.5">
            Complete scan history with threat scores and categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileJson className="mr-2 h-3.5 w-3.5" /> Export JSON
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-3.5 w-3.5" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Scans", value: recentScans.length, color: "#10b981" },
          { label: "Threats Found", value: recentScans.filter((s) => s.threatScore >= 60).length, color: "#ef4444" },
          { label: "Clean Emails", value: recentScans.filter((s) => s.threatScore < 20).length, color: "#22c55e" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-xs text-[#555] mt-0.5">{item.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#444]" />
            <Input
              placeholder="Search by subject or sender..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#444] shrink-0" />
            <div className="flex gap-1.5 flex-wrap">
              {ALL_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === level
                      ? "bg-[rgba(16,185,129,0.15)] text-[#10b981] border border-[rgba(16,185,129,0.25)]"
                      : "text-[#666] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-transparent"
                  }`}
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
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Email Subject</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <button
                    className="flex items-center hover:text-white transition-colors"
                    onClick={() => toggleSort("threatScore")}
                  >
                    Score <SortIcon field="threatScore" />
                  </button>
                </TableHead>
                <TableHead>Level</TableHead>
                <TableHead>
                  <button
                    className="flex items-center hover:text-white transition-colors"
                    onClick={() => toggleSort("receivedAt")}
                  >
                    Date <SortIcon field="receivedAt" />
                  </button>
                </TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((scan, i) => {
                const threat = getThreatLevel(scan.threatScore);
                return (
                  <TableRow key={scan.id}>
                    <TableCell className="text-[#555] text-xs">{i + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded-md flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${threat.color}12` }}
                        >
                          <Mail className="h-3 w-3" style={{ color: threat.color }} />
                        </div>
                        <span className="text-sm text-white font-medium truncate max-w-[200px]">
                          {scan.subject}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#666] text-xs max-w-[150px] truncate">
                      {scan.sender}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-[#888]">{scan.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-bold" style={{ color: threat.color }}>
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
                        className="text-[10px] whitespace-nowrap"
                      >
                        {threat.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-[#555]">
                      {formatDate(scan.receivedAt)}
                    </TableCell>
                    <TableCell>
                      <Link href="/dashboard/report">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Mail className="h-10 w-10 text-[#333] mb-3" />
              <p className="text-sm text-[#555]">No results match your search</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(255,255,255,0.06)]">
            <p className="text-xs text-[#555]">
              Showing {filtered.length} of {recentScans.length} results
            </p>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 text-xs bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.25)] text-[#10b981]">
                1
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 text-xs text-[#555]">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
