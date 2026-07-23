"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Info,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface NavbarProps {
  sidebarCollapsed: boolean;
}

const notifIcons = {
  threat: { icon: AlertTriangle, color: "#ef4444" },
  warning: { icon: AlertTriangle, color: "#f59e0b" },
  info: { icon: Info, color: "#b3b3b3" },
  success: { icon: CheckCircle2, color: "#22c55e" },
};

export function Navbar({ sidebarCollapsed }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-20 flex h-14 items-center gap-3 border-b border-[rgba(255,255,255,0.06)] bg-[#050505]/95 backdrop-blur-sm px-4 transition-all duration-250",
        sidebarCollapsed ? "left-16" : "left-60"
      )}
    >
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#555]" />
          <input
            type="text"
            placeholder="Search emails, threats..."
            className="h-8 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] pl-8 pr-3 text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[rgba(16,185,129,0.4)] transition-colors"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-4 items-center rounded border border-[rgba(255,255,255,0.1)] px-1 text-[10px] text-[#555]">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[9px] font-bold text-white">
                  {unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between pb-2">
              <span className="text-white text-xs font-semibold">Notifications</span>
              {unread > 0 && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                  {unread} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => {
              const { icon: Icon, color } = notifIcons[n.type];
              return (
                <DropdownMenuItem key={n.id} className="flex items-start gap-2.5 py-2.5 px-3">
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-3 w-3" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-white truncate">{n.title}</p>
                      {!n.read && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10b981]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#666] mt-0.5 line-clamp-1">{n.description}</p>
                    <p className="text-[10px] text-[#444] mt-0.5">{formatDate(n.timestamp)}</p>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Avatar className="h-7 w-7">
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="text-sm font-medium text-white">Alex Kumar</p>
              <p className="text-xs text-[#666]">alex@company.com</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" /> Security Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Zap className="mr-2 h-4 w-4" /> API Keys
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#ef4444] hover:text-[#ef4444]">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
