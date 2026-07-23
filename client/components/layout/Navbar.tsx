"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Shield,
  LayoutDashboard,
  Mail,
  Globe,
  History,
  FileText,
  Settings,
  User,
  Menu,
  X
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analyze", label: "Analyze", icon: Mail },
  { href: "/dashboard/threat-intelligence", label: "Threat Intel", icon: Globe },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
];

export function FloatingNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-300",
          scrolled ? "top-2" : "top-6"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 rounded-full bg-[#081226]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 group-hover:border-purple-500/50 transition-colors">
              <Shield className="h-4.5 w-4.5 text-purple-400" />
            </div>
            <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Sentinel AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link key={item.href} href={item.href}>
                  <div className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-white text-slate-300 group">
                    {active && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <item.icon className={cn("h-4 w-4 transition-colors", active ? "text-purple-400" : "text-slate-400 group-hover:text-purple-400")} />
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-48 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all focus:w-64"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono">⌘K</kbd>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-white/10">
                  <Bell className="h-4.5 w-4.5 text-slate-300" />
                  <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#081226]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl border-white/10 bg-[#111827]/95 backdrop-blur-xl p-2">
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-white">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="p-4 text-center text-sm text-slate-400">No new notifications</div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full p-0 border border-white/10 hover:border-purple-500/50 transition-colors">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-medium text-xs">
                      AK
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border-white/10 bg-[#111827]/95 backdrop-blur-xl p-2">
                <DropdownMenuLabel className="px-3 py-2">
                  <p className="text-sm font-semibold text-white">Alex Kumar</p>
                  <p className="text-xs text-slate-400">alex@company.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer hover:bg-white/5 focus:bg-white/5">
                  <User className="mr-2 h-4 w-4 text-slate-400" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer hover:bg-white/5 focus:bg-white/5" asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4 text-slate-400" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 rounded-full hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl bg-[#081226]/95 backdrop-blur-xl border border-white/10 p-4 shadow-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                      active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                    )}>
                      <item.icon className={cn("h-5 w-5", active ? "text-purple-400" : "text-slate-400")} />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-2" />
              <Link href="/dashboard/settings" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors">
                  <Settings className="h-5 w-5 text-slate-400" />
                  Settings
                </div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
