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
    { label: "Parsing headers", done: progress >= 15 },
    { label: "Extracting URLs", done: progress >= 35 },
    { label: "Scanning attachments", done: progress >= 55 },
    { label: "AI analysis", done: progress >= 72 },
    { label: "Generating report", done: progress >= 88 },
    { label: "Complete", done: progress >= 100 },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analyze Email</h1>
        <p className="text-sm text-[#666] mt-0.5">
          Upload an .eml or .msg file, or paste raw email content for instant threat analysis.
        </p>
      </div>

      {/* Upload card */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="upload">
            <TabsList className="mb-6">
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-3.5 w-3.5" /> Upload File
              </TabsTrigger>
              <TabsTrigger value="paste">
                <FileText className="mr-2 h-3.5 w-3.5" /> Paste Raw Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <div
                {...(getRootProps() as React.HTMLAttributes<HTMLDivElement>)}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200",
                  isDragActive
                    ? "border-[#10b981] bg-[rgba(16,185,129,0.05)]"
                    : "border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.02)] hover:border-[rgba(16,185,129,0.3)]",
                  uploadedFile && "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.04)]"
                )}
              >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                  {uploadedFile ? (
                    <motion.div
                      key="file"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="h-14 w-14 rounded-xl bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center">
                        <File className="h-7 w-7 text-[#10b981]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{uploadedFile.name}</p>
                        <p className="text-xs text-[#555] mt-0.5">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        className="text-xs text-[#666] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <X className="h-3 w-3" /> Remove
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="h-14 w-14 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                        <Upload className={cn("h-7 w-7", isDragActive ? "text-[#10b981]" : "text-[#444]")} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {isDragActive ? "Drop your email here" : "Drop email file here"}
                        </p>
                        <p className="text-xs text-[#555] mt-1">
                          Supports .eml and .msg formats · Max 25 MB
                        </p>
                      </div>
                      <Button variant="outline" size="sm" type="button">
                        Browse Files
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>

            <TabsContent value="paste">
              <Textarea
                placeholder={`Paste raw email headers and body here...\n\nFrom: security@micros0ft-verify.com\nTo: user@company.com\nSubject: Urgent: Verify Your Microsoft Account\nDate: Thu, 23 Jul 2026 08:34:00 +0000\n...\n`}
                className="min-h-[200px] font-mono text-xs"
                value={rawEmail}
                onChange={(e) => setRawEmail(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          {/* Analysis progress */}
          <AnimatePresence>
            {analyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.15)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-4 w-4 text-[#10b981]" />
                  </motion.div>
                  <span className="text-sm font-medium text-[#10b981]">
                    Analyzing... {progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden mb-4">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full bg-[#10b981]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {analysisSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      {step.done ? (
                        <CheckCircle2 className="h-3 w-3 text-[#22c55e] shrink-0" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-[rgba(255,255,255,0.1)] shrink-0" />
                      )}
                      <span className={step.done ? "text-[#888]" : "text-[#444]"}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-[#555]">
              Results available in <span className="text-[#10b981]">&lt; 3 seconds</span>
            </p>
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={(!uploadedFile && !rawEmail.trim()) || analyzing}
              loading={analyzing}
            >
              <Zap className="mr-2 h-4 w-4" />
              {analyzing ? "Analyzing..." : "Analyze Now"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent uploads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Recent Uploads</CardTitle>
            <Link href="/dashboard/history">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-[#666]">
                View All <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {recentScans.slice(0, 5).map((scan, i) => {
              const threat = getThreatLevel(scan.threatScore);
              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  className="flex items-center gap-3 rounded-lg p-2.5 -mx-2.5 cursor-pointer transition-colors"
                >
                  <div
                    className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${threat.color}12` }}
                  >
                    <Mail className="h-4 w-4" style={{ color: threat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{scan.subject}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="h-3 w-3 text-[#444]" />
                      <span className="text-xs text-[#555]">{formatDate(scan.receivedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold" style={{ color: threat.color }}>
                      {scan.threatScore}
                    </span>
                    <Badge
                      style={{
                        backgroundColor: threat.bg,
                        color: threat.color,
                        borderColor: `${threat.color}30`,
                      }}
                      className="text-[10px]"
                    >
                      {threat.label}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
