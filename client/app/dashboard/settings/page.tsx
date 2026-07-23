"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Key,
  Palette,
  AlertTriangle,
  Shield,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-[#a855f7]" : "bg-[rgba(168,85,247,0.25)]"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    criticalThreats: true,
    weeklyReport: true,
    newMalware: false,
    apiAlerts: true,
    marketingEmails: false,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  const apiKeys = [
    { name: "Production API Key", key: "sk_live_4xK9pQ2mR8nL7wT3", created: "Jul 1, 2026", lastUsed: "2 hours ago" },
    { name: "Development API Key", key: "sk_test_9aB3cD6eF1gH4iJ7", created: "Jun 15, 2026", lastUsed: "Yesterday" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#666] mt-0.5">Manage your account preferences and security settings.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile"><User className="mr-2 h-3.5 w-3.5" />Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-3.5 w-3.5" />Notifications</TabsTrigger>
          <TabsTrigger value="api"><Key className="mr-2 h-3.5 w-3.5" />API Keys</TabsTrigger>
          <TabsTrigger value="danger"><AlertTriangle className="mr-2 h-3.5 w-3.5" />Danger Zone</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-white mb-5">Profile Information</h3>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">AK</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">Change Photo</Button>
                <p className="text-xs text-[#555] mt-1.5">JPG, PNG up to 2MB</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", placeholder: "Alex", defaultValue: "Alex" },
                { label: "Last Name", placeholder: "Kumar", defaultValue: "Kumar" },
                { label: "Email Address", placeholder: "alex@company.com", defaultValue: "alex@company.com" },
                { label: "Job Title", placeholder: "Security Engineer", defaultValue: "Security Engineer" },
              ].map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <label className="text-xs font-medium text-[#888]">{field.label}</label>
                  <Input defaultValue={field.defaultValue} placeholder={field.placeholder} />
                </div>
              ))}
            </div>

            <div className="space-y-1.5 mt-4">
              <label className="text-xs font-medium text-[#888]">Organization</label>
              <Input defaultValue="Acme Security Corp" placeholder="Your organization" />
            </div>

            <div className="mt-5 flex gap-3">
              <Button loading={saving} onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-white mb-1">Security</h3>
            <p className="text-xs text-[#555] mb-5">Manage your account security settings.</p>

            <div className="space-y-4">
              {[
                {
                  label: "Two-Factor Authentication",
                  desc: "Add an extra layer of security to your account",
                  value: true,
                  badge: "Enabled",
                  badgeColor: "success",
                },
                {
                  label: "Session Management",
                  desc: "View and manage active sessions",
                  value: false,
                  badge: "2 active",
                  badgeColor: "secondary",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <Badge variant={item.badgeColor as "success" | "secondary"} className="text-[10px]">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#555]">{item.desc}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Manage <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-white mb-1">Notification Preferences</h3>
            <p className="text-xs text-[#555] mb-6">Choose what you want to be notified about.</p>

            <div className="space-y-5">
              {[
                {
                  key: "criticalThreats" as const,
                  label: "Critical Threat Alerts",
                  desc: "Get notified immediately when a critical threat is detected",
                  badge: "Recommended",
                },
                {
                  key: "weeklyReport" as const,
                  label: "Weekly Security Report",
                  desc: "Receive a weekly summary of your email security stats",
                },
                {
                  key: "newMalware" as const,
                  label: "New Malware Signatures",
                  desc: "Alert when new malware families are added to the database",
                },
                {
                  key: "apiAlerts" as const,
                  label: "API Usage Alerts",
                  desc: "Notify when API rate limits are approaching",
                },
                {
                  key: "marketingEmails" as const,
                  label: "Product Updates",
                  desc: "News about Sentinel AI features and improvements",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      {item.badge && (
                        <Badge variant="default" className="text-[10px]">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#555]">{item.desc}</p>
                  </div>
                  <Toggle
                    checked={notifications[item.key]}
                    onChange={(v) => setNotifications((prev) => ({ ...prev, [item.key]: v }))}
                  />
                </div>
              ))}
            </div>

            <Separator className="my-5" />
            <Button loading={saving} onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">API Keys</h3>
                <p className="text-xs text-[#555] mt-0.5">Manage your API keys for programmatic access.</p>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-3.5 w-3.5" /> Create Key
              </Button>
            </div>

            <div className="space-y-3">
              {apiKeys.map((key, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-[rgba(168,85,247,0.2)] bg-[rgba(255,255,255,0.02)] p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-white">{key.name}</p>
                      <p className="text-xs text-[#555] mt-0.5">
                        Created {key.created} · Last used {key.lastUsed}
                      </p>
                    </div>
                    <Badge variant="default" className="shrink-0 text-[10px]">Active</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-lg border border-[rgba(168,85,247,0.2)] bg-[rgba(0,0,0,0.3)] px-3 py-2">
                      <code className="text-xs font-mono text-[#888]">
                        {showApiKey ? key.key : `${key.key.slice(0, 12)}${"•".repeat(16)}`}
                      </code>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 text-[#ef4444] border-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.4)]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-[rgba(168,85,247,0.15)] bg-[rgba(168,85,247,0.05)] p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-[#a855f7] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-[#a855f7]">API Security Notice</p>
                  <p className="text-xs text-[#555] mt-1">
                    Never share your API keys publicly. Keys are encrypted at rest using AES-256. Rotate keys immediately if compromised.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Danger Zone */}
        <TabsContent value="danger">
          <Card className="p-6 border-[rgba(239,68,68,0.2)]">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
              <h3 className="text-sm font-semibold text-[#ef4444]">Danger Zone</h3>
            </div>
            <p className="text-xs text-[#555] mb-6">
              These actions are irreversible. Please proceed with extreme caution.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Delete Scan History",
                  desc: "Permanently delete all scan history and reports. This cannot be undone.",
                },
                {
                  title: "Revoke All API Keys",
                  desc: "Immediately revoke all API keys. Any integrations using these keys will stop working.",
                },
                {
                  title: "Delete Account",
                  desc: "Permanently delete your account and all associated data. This action cannot be reversed.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[rgba(239,68,68,0.12)] bg-[rgba(239,68,68,0.04)] p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-[#666] mt-0.5">{item.desc}</p>
                  </div>
                  <Button variant="destructive" size="sm" className="shrink-0">
                    {item.title.split(" ")[0]}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
