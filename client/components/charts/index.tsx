"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  Legend,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[rgba(168,85,247,0.25)] bg-[#0a0014] px-3 py-2 shadow-xl">
      {label && <p className="text-xs text-[#666] mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-[#b3b3b3] capitalize">{entry.name}:</span>
          <span className="text-xs font-medium text-white">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

interface ChartProps {
  data: Record<string, string | number>[];
  className?: string;
}

// Weekly scans area chart
export function WeeklyScansChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200} className={className}>
      <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="scansGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="threatsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="scans"
          stroke="#a855f7"
          strokeWidth={1.5}
          fill="url(#scansGrad)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="threats"
          stroke="#ef4444"
          strokeWidth={1.5}
          fill="url(#threatsGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Threat categories pie chart
const PIE_COLORS = ["#a855f7", "#ef4444", "#f59e0b", "#6366f1", "#ec4899"];

export function ThreatCategoriesPie({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200} className={className}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Top brands bar chart
export function TopBrandsChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200} className={className}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barSize={12}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#a855f7" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Monthly trends line chart
export function MonthlyTrendChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220} className={className}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(v) => <span className="text-[11px] text-[#666] capitalize">{v}</span>}
        />
        <Line type="monotone" dataKey="phishing" stroke="#ef4444" strokeWidth={1.5} dot={false} />
        <Line type="monotone" dataKey="malware" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
        <Line type="monotone" dataKey="spam" stroke="#6366f1" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Threat radar chart
export function ThreatRadarChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220} className={className}>
      <RadarChart cx="50%" cy="50%" outerRadius={80} data={data}>
        <PolarGrid stroke="rgba(168,85,247,0.2)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#666", fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#444", fontSize: 10 }} />
        <Radar name="Threat Level" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.12} strokeWidth={1.5} />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// Simple area chart (reusable)
export function SimpleAreaChart({
  data,
  dataKey,
  color = "#a855f7",
  className,
}: ChartProps & { dataKey: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={60} className={className}>
      <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#grad-${color})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
