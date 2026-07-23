"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Mail,
  History,
  Globe,
  FileText,
  Settings,
  ChevronLeft,
  Shield,
  Zap,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analyze", label: "Analyze Email", icon: Mail },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/threat-intelligence", label: "Threat Intel", icon: Globe },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
];

const bottomItems = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-[rgba(255,255,255,0.06)] bg-[#050505] overflow-hidden"
    >
      {/* Logo */}
      <div className="flex h-14 items-center px-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)]">
            <Shield className="h-4 w-4 text-[#10b981]" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-semibold text-white whitespace-nowrap"
              >
                Sentinel AI
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={onToggle}
          className={cn(
            "ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#666] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors",
            collapsed && "ml-0 mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors group relative",
                  active
                    ? "bg-[rgba(16,185,129,0.1)] text-[#10b981]"
                    : "text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.15)]"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                  />
                )}
                <Icon className={cn("h-4 w-4 shrink-0 relative z-10", active && "text-[#10b981]")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="whitespace-nowrap relative z-10"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[rgba(255,255,255,0.06)] py-3 px-2 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "text-[#10b981] bg-[rgba(16,185,129,0.08)]"
                    : "text-[#888] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}

        {/* Profile */}
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-2.5 py-2 mt-2",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarFallback className="text-[10px]">AK</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="text-xs font-medium text-white truncate">Alex Kumar</p>
                <p className="text-[10px] text-[#555] truncate">alex@company.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
