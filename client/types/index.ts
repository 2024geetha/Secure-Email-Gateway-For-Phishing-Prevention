export type ThreatLevel = "critical" | "high" | "medium" | "low" | "clean";
export type StatusType = "passed" | "failed" | "warning" | "neutral";
export type RiskLevel = "critical" | "high" | "medium" | "low" | "safe";

export interface EmailScan {
  id: string;
  subject: string;
  sender: string;
  receivedAt: string;
  threatScore: number;
  threatLevel: ThreatLevel;
  category: string;
  status: "completed" | "processing" | "queued";
  fileName?: string;
}

export interface HeaderRecord {
  field: string;
  value: string;
  status: StatusType;
  description: string;
}

export interface URLRecord {
  url: string;
  status: RiskLevel;
  redirectChain: string[];
  whoisAge: string;
  riskScore: number;
  category: string;
}

export interface AttachmentRecord {
  filename: string;
  hash: string;
  type: string;
  size: string;
  riskLevel: RiskLevel;
  hasMacro: boolean;
  malwareDetected: boolean;
  signatures: string[];
}

export interface AIAnalysisResult {
  urgency: number;
  authority: number;
  fear: number;
  credentialTheft: number;
  financialFraud: number;
  grammarScore: number;
  confidence: number;
  summary: string;
  indicators: string[];
}

export interface ThreatTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "active" | "pending";
}

export interface RecommendationItem {
  level: "danger" | "warning" | "info";
  title: string;
  description: string;
}

export interface ThreatDomain {
  domain: string;
  threatType: string;
  firstSeen: string;
  lastSeen: string;
  count: number;
  riskScore: number;
}

export interface TargetedBrand {
  brand: string;
  logo: string;
  count: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

export interface CountryThreat {
  country: string;
  code: string;
  attacks: number;
  percentage: number;
}

export interface MalwareFamily {
  name: string;
  type: string;
  count: number;
  severity: RiskLevel;
  firstDetected: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "threat" | "info" | "warning" | "success";
}

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface DashboardStats {
  emailsScanned: number;
  threatsBlocked: number;
  highRiskEmails: number;
  avgThreatScore: number;
  emailsScannedChange: number;
  threatsBlockedChange: number;
  highRiskChange: number;
  avgScoreChange: number;
}
