"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  File,
  X,
  ChevronRight,
  ShieldAlert,
  Search,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { recentScans } from "@/lib/mock-data";
import { getThreatLevel, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AnalyzePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [rawEmail, setRawEmail] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "message/rfc822": [".eml"],
      "application/vnd.ms-outlook": [".msg"],
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setProgress(0);
    const steps = [15, 35, 55, 72, 88, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(step);
    }
    await new Promise((r) => setTimeout(r, 300));
    window.location.href = "/dashboard/report";
  };

  const analysisSteps = [
    { label: "Parsing headers & metadata", done: progress >= 15 },
    { label: "Extracting & resolving URLs", done: progress >= 35 },
    { label: "Scanning attachments for malware", done: progress >= 55 },
    { label: "Running AI behavioral analysis", done: progress >= 72 },
    { label: "Generating threat score & report", done: progress >= 88 },
    { label: "Analysis complete", done: progress >= 100 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <ShieldAlert className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Analyze Email Threat
          </h1>
          <p className="text-purple-200 text-base">
            Upload an .eml or .msg file, or paste raw headers for instant AI-powered threat analysis.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        {/* Main Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-1 sm:p-2 bg-gradient-to-b from-[#0a0014] to-[#090014] border-purple-500/20 shadow-2xl">
            <Tabs defaultValue="upload" className="w-full">
              <div className="px-4 pt-4 pb-2">
                <TabsList className="w-full grid grid-cols-2 bg-black/40 border border-purple-500/10 p-1 rounded-xl">
                  <TabsTrigger value="upload" className="rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 transition-all">
                    <Upload className="mr-2 h-4 w-4" /> File Upload
                  </TabsTrigger>
                  <TabsTrigger value="paste" className="rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 transition-all">
                    <FileText className="mr-2 h-4 w-4" /> Paste Raw
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4 sm:p-6">
                <TabsContent value="upload" className="mt-0 outline-none">
                  <motion.div
                    {...(getRootProps() as React.HTMLAttributes<HTMLDivElement>)}
                    whileHover={{ scale: uploadedFile ? 1 : 1.01 }}
                    whileTap={{ scale: uploadedFile ? 1 : 0.99 }}
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 sm:p-20 text-center cursor-pointer transition-all duration-300 overflow-hidden",
                      isDragActive
                        ? "border-purple-500 bg-purple-500/10 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
                        : "border-purple-500/20 hover:border-purple-500/50 hover:bg-white/[0.02]",
                      uploadedFile && "border-purple-500/30 bg-gradient-to-b from-purple-500/5 to-transparent cursor-default"
                    )}
                  >
                    <input {...getInputProps()} />

                    {/* Background glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-500/5 blur-3xl pointer-events-none" />

                    <AnimatePresence mode="wait">
                      {uploadedFile ? (
                        <motion.div
                          key="file"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex flex-col items-center gap-4 relative z-10 w-full max-w-xs"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center relative z-10">
                              <File className="h-10 w-10 text-purple-400" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center z-20 backdrop-blur-md">
                              <CheckCircle2 className="h-4 w-4 text-green-400" />
                            </div>
                          </div>
                          
                          <div className="w-full">
                            <p className="text-base font-semibold text-white truncate px-4">{uploadedFile.name}</p>
                            <p className="text-sm text-purple-200 mt-1">
                              {(uploadedFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFile(null);
                            }}
                            className="mt-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors"
                          >
                            <X className="mr-2 h-4 w-4" /> Remove File
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-5 relative z-10"
                        >
                          <div className="relative group">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="h-20 w-20 rounded-full bg-purple-500/5 border border-purple-500/20 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                              <Upload className={cn("h-8 w-8 transition-colors duration-300", isDragActive ? "text-purple-400" : "text-purple-200 group-hover:text-purple-400")} />
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xl font-semibold text-white mb-2">
                              {isDragActive ? "Drop to analyze" : "Drag & drop email file"}
                            </p>
                            <p className="text-sm text-purple-200 max-w-[260px] mx-auto leading-relaxed">
                              Upload a suspicious email to instantly scan for phishing, malware, and impersonation.
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="bg-purple-500/5 text-purple-100 border-purple-500/20">.eml</Badge>
                            <Badge variant="outline" className="bg-purple-500/5 text-purple-100 border-purple-500/20">.msg</Badge>
                            <span className="text-xs text-purple-300/70">Max 25MB</span>
                          </div>
                          
                          <Button variant="secondary" className="mt-4 rounded-xl pointer-events-none">
                            Browse Files
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>

                <TabsContent value="paste" className="mt-0 outline-none">
                  <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                    <div className="absolute top-0 inset-x-0 h-10 bg-black/40 border-b border-purple-500/10 flex items-center px-4 z-10">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <span className="ml-4 text-xs font-mono text-purple-300/70">raw-email-headers.txt</span>
                    </div>
                    <Textarea
                      placeholder={`Paste raw email headers and body here...\n\nFrom: security@micros0ft-verify.com\nTo: user@company.com\nSubject: Urgent: Verify Your Microsoft Account\nDate: Thu, 23 Jul 2026 08:34:00 +0000\n...\n`}
                      className="min-h-[360px] sm:min-h-[420px] font-mono text-xs sm:text-sm bg-[#0a0f1c] border-none pt-14 pb-4 px-4 sm:px-6 resize-none focus-visible:ring-0 text-purple-100 placeholder:text-slate-600 leading-relaxed"
                      value={rawEmail}
                      onChange={(e) => setRawEmail(e.target.value)}
                    />
                  </div>
                </TabsContent>

                {/* Analysis Progress */}
                <AnimatePresence>
                  {analyzing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 relative">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                          <Zap className="h-24 w-24 text-purple-500" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></span>
                              </div>
                              <span className="text-base font-semibold text-white">
                                AI Analysis in Progress
                              </span>
                            </div>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                              {progress}%
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-black/40 overflow-hidden mb-6 border border-purple-500/10">
                            <motion.div
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 relative"
                            >
                              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]" />
                            </motion.div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                            {analysisSteps.map((step, i) => (
                              <div key={i} className="flex items-center gap-3">
                                {step.done ? (
                                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                                  </div>
                                ) : progress > (i - 1) * 20 ? (
                                  <div className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin shrink-0" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border border-purple-500/20 shrink-0" />
                                )}
                                <span className={cn(
                                  "text-sm transition-colors duration-300",
                                  step.done ? "text-purple-100" : progress > (i - 1) * 20 ? "text-white font-medium" : "text-purple-300/70"
                                )}>
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Bar */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-purple-500/20">
                  <div className="flex items-center gap-2 text-sm text-purple-200">
                    <ShieldAlert className="h-4 w-4 text-purple-400" />
                    Powered by Sentinel AI Engine
                  </div>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-10 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                    onClick={handleAnalyze}
                    disabled={(!uploadedFile && !rawEmail.trim()) || analyzing}
                    loading={analyzing}
                  >
                    {!analyzing && <Search className="mr-2 h-5 w-5" />}
                    {analyzing ? "Processing..." : "Analyze Email"}
                  </Button>
                </div>
              </div>
            </Tabs>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card className="p-5 bg-gradient-to-br from-[#0a0014] to-[#1e1b4b]/50 border-purple-500/20">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10">
                <FileText className="mr-3 h-4 w-4 text-purple-400" /> View Sample Report
              </Button>
              <Button variant="secondary" className="w-full justify-start rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10">
                <Globe className="mr-3 h-4 w-4 text-blue-400" /> Check Domain Rep
              </Button>
            </div>
          </Card>

          {/* Recent Uploads */}
          <Card className="p-0 overflow-hidden border-purple-500/20">
            <div className="p-5 border-b border-purple-500/10 flex items-center justify-between bg-black/20">
              <h3 className="text-sm font-semibold text-white">Recent Scans</h3>
              <Link href="/dashboard/history" className="text-xs text-purple-400 hover:text-purple-300 flex items-center">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentScans.slice(0, 4).map((scan) => {
                const threat = getThreatLevel(scan.threatScore);
                return (
                  <Link key={scan.id} href="/dashboard/report" className="block hover:bg-white/[0.02] transition-colors p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center border mt-0.5"
                        style={{ backgroundColor: threat.bg, borderColor: `${threat.color}30` }}
                      >
                        <Mail className="h-4 w-4" style={{ color: threat.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate mb-1">{scan.subject}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-purple-300/70 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {formatDate(scan.receivedAt).split(',')[0]}
                          </span>
                          <span className="text-xs font-bold" style={{ color: threat.color }}>
                            {scan.threatScore}/100
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
