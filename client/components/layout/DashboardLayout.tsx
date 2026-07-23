"use client";

import React from "react";
import { motion } from "framer-motion";
import { FloatingNavbar } from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="glow-blob bg-purple-600/20 w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="glow-blob bg-blue-600/20 w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />
      
      <FloatingNavbar />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
}
