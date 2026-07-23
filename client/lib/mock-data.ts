import type {
  EmailScan,
  HeaderRecord,
  URLRecord,
  AttachmentRecord,
  AIAnalysisResult,
  ThreatTimelineEvent,
  RecommendationItem,
  ThreatDomain,
  TargetedBrand,
  CountryThreat,
  MalwareFamily,
  NotificationItem,
  ChartDataPoint,
  DashboardStats,
} from "@/types";

export const dashboardStats: DashboardStats = {
  emailsScanned: 48291,
  threatsBlocked: 3847,
  highRiskEmails: 612,
  avgThreatScore: 23,
  emailsScannedChange: 12.4,
  threatsBlockedChange: -5.2,
  highRiskChange: 8.1,
  avgScoreChange: -2.3,
};

export const weeklyScansData: ChartDataPoint[] = [
  { name: "Mon", scans: 6200, threats: 420 },
  { name: "Tue", scans: 7100, threats: 380 },
  { name: "Wed", scans: 8400, threats: 610 },
  { name: "Thu", scans: 7800, threats: 540 },
  { name: "Fri", scans: 9200, threats: 720 },
  { name: "Sat", scans: 5100, threats: 290 },
  { name: "Sun", scans: 4490, threats: 210 },
];

export const threatCategoriesData: ChartDataPoint[] = [
  { name: "Phishing", value: 38 },
  { name: "Malware", value: 22 },
  { name: "Spam", value: 18 },
  { name: "Impersonation", value: 14 },
  { name: "BEC", value: 8 },
];

export const topImpersonatedBrands: ChartDataPoint[] = [
  { name: "Microsoft", value: 312 },
  { name: "Google", value: 278 },
  { name: "Apple", value: 195 },
  { name: "PayPal", value: 167 },
  { name: "Amazon", value: 143 },
  { name: "DHL", value: 98 },
];

export const monthlyTrendData: ChartDataPoint[] = [
  { name: "Jan", phishing: 320, malware: 180, spam: 420 },
  { name: "Feb", phishing: 280, malware: 210, spam: 390 },
  { name: "Mar", phishing: 410, malware: 190, spam: 450 },
  { name: "Apr", phishing: 350, malware: 240, spam: 380 },
  { name: "May", phishing: 480, malware: 280, spam: 510 },
  { name: "Jun", phishing: 520, malware: 310, spam: 470 },
  { name: "Jul", phishing: 390, malware: 260, spam: 430 },
];

export const radarData: ChartDataPoint[] = [
  { subject: "Phishing", A: 85, fullMark: 100 },
  { subject: "Malware", A: 62, fullMark: 100 },
  { subject: "Spoofing", A: 74, fullMark: 100 },
  { subject: "BEC", A: 45, fullMark: 100 },
  { subject: "Ransomware", A: 38, fullMark: 100 },
  { subject: "Zero-Day", A: 28, fullMark: 100 },
];

export const recentScans: EmailScan[] = [
  {
    id: "scan-001",
    subject: "Urgent: Verify Your Microsoft Account Now",
    sender: "security@micros0ft-verify.com",
    receivedAt: "2026-07-23T08:34:00Z",
    threatScore: 91,
    threatLevel: "critical",
    category: "Phishing / Credential Theft",
    status: "completed",
    fileName: "microsoft_verify.eml",
  },
  {
    id: "scan-002",
    subject: "Your Apple ID has been locked",
    sender: "noreply@apple-id-security.net",
    receivedAt: "2026-07-23T07:12:00Z",
    threatScore: 87,
    threatLevel: "critical",
    category: "Account Takeover",
    status: "completed",
    fileName: "apple_locked.eml",
  },
  {
    id: "scan-003",
    subject: "Invoice #INV-4892 Payment Due",
    sender: "billing@paypal-invoices.org",
    receivedAt: "2026-07-22T21:45:00Z",
    threatScore: 74,
    threatLevel: "high",
    category: "Financial Fraud",
    status: "completed",
    fileName: "invoice_4892.eml",
  },
  {
    id: "scan-004",
    subject: "DHL Package Delivery Notification",
    sender: "tracking@dhl-express-delivery.info",
    receivedAt: "2026-07-22T18:20:00Z",
    threatScore: 68,
    threatLevel: "high",
    category: "Phishing",
    status: "completed",
  },
  {
    id: "scan-005",
    subject: "Q3 Budget Approval Required ASAP",
    sender: "cfo@company-external.co",
    receivedAt: "2026-07-22T15:00:00Z",
    threatScore: 55,
    threatLevel: "medium",
    category: "Business Email Compromise",
    status: "completed",
  },
  {
    id: "scan-006",
    subject: "Team lunch meeting tomorrow",
    sender: "hr@acme.com",
    receivedAt: "2026-07-22T12:30:00Z",
    threatScore: 8,
    threatLevel: "clean",
    category: "Legitimate",
    status: "completed",
  },
];

export const headerAnalysis: HeaderRecord[] = [
  {
    field: "SPF",
    value: "v=spf1 include:micros0ft-verify.com ~all",
    status: "failed",
    description: "SPF record does not authorize the sending server. Domain appears to be spoofed.",
  },
  {
    field: "DKIM",
    value: "dkim=fail (signature verification failed)",
    status: "failed",
    description: "DKIM signature is invalid or missing. Email integrity cannot be verified.",
  },
  {
    field: "DMARC",
    value: "dmarc=fail action=quarantine",
    status: "failed",
    description: "DMARC policy is not satisfied. Email fails alignment checks.",
  },
  {
    field: "Reply-To",
    value: "attacker@harvested-creds.ru",
    status: "warning",
    description: "Reply-To address differs from sender and points to a suspicious domain.",
  },
  {
    field: "From",
    value: "Microsoft Security <security@micros0ft-verify.com>",
    status: "failed",
    description: "Domain uses homograph attack (0 instead of o) to impersonate Microsoft.",
  },
  {
    field: "Received Chain",
    value: "via mx.micros0ft-verify.com [185.220.101.47] (Tor exit node)",
    status: "failed",
    description: "Email originated from a known Tor exit node, indicating anonymization attempts.",
  },
];

export const urlAnalysis: URLRecord[] = [
  {
    url: "https://micros0ft-verify.com/account/security",
    status: "critical",
    redirectChain: [
      "https://micros0ft-verify.com/account/security",
      "https://harvested-creds.ru/login",
    ],
    whoisAge: "3 days",
    riskScore: 97,
    category: "Credential Harvesting",
  },
  {
    url: "https://1drv.ms/safe-link-preview",
    status: "medium",
    redirectChain: ["https://1drv.ms/safe-link-preview", "https://phish-kit.xyz/onedrive"],
    whoisAge: "12 days",
    riskScore: 72,
    category: "Phishing Kit",
  },
  {
    url: "https://bit.ly/3xK9pQ2",
    status: "high",
    redirectChain: [
      "https://bit.ly/3xK9pQ2",
      "https://t.co/abc123",
      "https://malware-dropper.com/payload",
    ],
    whoisAge: "N/A (shortener)",
    riskScore: 85,
    category: "Malware Distribution",
  },
];

export const attachmentAnalysis: AttachmentRecord[] = [
  {
    filename: "Microsoft_Security_Update.docm",
    hash: "5e8b9f2a1c3d4e6f7890abcd1234ef56",
    type: "Word Document with Macros",
    size: "1.2 MB",
    riskLevel: "critical",
    hasMacro: true,
    malwareDetected: true,
    signatures: ["Trojan.MacroMalware.A", "Downloader.VBA.Generic"],
  },
  {
    filename: "account_verification.pdf",
    hash: "a1b2c3d4e5f6789012345678abcdef90",
    type: "PDF Document",
    size: "384 KB",
    riskLevel: "high",
    hasMacro: false,
    malwareDetected: false,
    signatures: ["JS/Exploit.PDF.CVE-2024-1234"],
  },
];

export const aiAnalysis: AIAnalysisResult = {
  urgency: 92,
  authority: 88,
  fear: 85,
  credentialTheft: 96,
  financialFraud: 42,
  grammarScore: 71,
  confidence: 94,
  summary:
    "This email employs classic social engineering techniques: it impersonates Microsoft using a homograph domain attack (micros0ft-verify.com), creates urgency with account suspension threats, and directs victims to a credential harvesting page. The attached macro-enabled document drops a trojan upon execution. All authentication checks (SPF, DKIM, DMARC) failed, confirming sender spoofing.",
  indicators: [
    "Homograph domain attack targeting Microsoft brand",
    "SPF/DKIM/DMARC all failed — confirmed spoofing",
    "Credential harvesting URL redirects to Russian domain",
    "Macro-enabled attachment contains Trojan.MacroMalware.A",
    "Reply-To header redirects to attacker-controlled inbox",
    "Email originated from Tor exit node (185.220.101.47)",
    "Urgency language: 'Your account will be suspended in 24 hours'",
    "Phishing kit detected: OneDrive lure template",
  ],
};

export const threatTimeline: ThreatTimelineEvent[] = [
  {
    id: "t1",
    title: "Email Received",
    description: "Email received from security@micros0ft-verify.com via Tor exit node",
    timestamp: "08:34:12",
    status: "completed",
  },
  {
    id: "t2",
    title: "Headers Parsed",
    description: "SPF, DKIM, DMARC extraction complete. All authentication checks failed.",
    timestamp: "08:34:13",
    status: "completed",
  },
  {
    id: "t3",
    title: "URLs Extracted",
    description: "3 URLs found. Redirect chains resolved. 2 malicious domains confirmed.",
    timestamp: "08:34:14",
    status: "completed",
  },
  {
    id: "t4",
    title: "Attachment Scanned",
    description: "Macro-enabled document analyzed. Trojan.MacroMalware.A signature detected.",
    timestamp: "08:34:16",
    status: "completed",
  },
  {
    id: "t5",
    title: "AI Detection",
    description: "NLP model analyzed content. Urgency, authority, and fear manipulation detected.",
    timestamp: "08:34:17",
    status: "completed",
  },
  {
    id: "t6",
    title: "Threat Score Generated",
    description: "Final threat score: 91/100 — CRITICAL. Immediate action required.",
    timestamp: "08:34:18",
    status: "completed",
  },
];

export const recommendations: RecommendationItem[] = [
  {
    level: "danger",
    title: "Delete Immediately",
    description:
      "This email is a confirmed phishing attack. Delete it without clicking any links or opening attachments.",
  },
  {
    level: "danger",
    title: "Do Not Open Attachment",
    description:
      "The attached .docm file contains Trojan.MacroMalware.A. Opening it will compromise your system.",
  },
  {
    level: "warning",
    title: "Report to Security Team",
    description:
      "Forward this email as an attachment to your security team at security@yourcompany.com for further investigation.",
  },
  {
    level: "warning",
    title: "Block Sender Domain",
    description:
      "Add micros0ft-verify.com and harvested-creds.ru to your email blocklist immediately.",
  },
  {
    level: "info",
    title: "Notify Colleagues",
    description:
      "Alert your team about this active phishing campaign targeting Microsoft account holders.",
  },
];

export const threatDomains: ThreatDomain[] = [
  {
    domain: "micros0ft-verify.com",
    threatType: "Credential Harvesting",
    firstSeen: "2026-07-20",
    lastSeen: "2026-07-23",
    count: 847,
    riskScore: 97,
  },
  {
    domain: "harvested-creds.ru",
    threatType: "Data Exfiltration",
    firstSeen: "2026-07-15",
    lastSeen: "2026-07-23",
    count: 1243,
    riskScore: 99,
  },
  {
    domain: "apple-id-security.net",
    threatType: "Phishing",
    firstSeen: "2026-07-18",
    lastSeen: "2026-07-22",
    count: 592,
    riskScore: 94,
  },
  {
    domain: "paypal-invoices.org",
    threatType: "Financial Fraud",
    firstSeen: "2026-07-10",
    lastSeen: "2026-07-21",
    count: 734,
    riskScore: 91,
  },
  {
    domain: "dhl-express-delivery.info",
    threatType: "Parcel Scam",
    firstSeen: "2026-07-05",
    lastSeen: "2026-07-20",
    count: 418,
    riskScore: 83,
  },
  {
    domain: "malware-dropper.com",
    threatType: "Malware Distribution",
    firstSeen: "2026-06-28",
    lastSeen: "2026-07-19",
    count: 289,
    riskScore: 98,
  },
];

export const targetedBrands: TargetedBrand[] = [
  { brand: "Microsoft", logo: "🪟", count: 3124, percentage: 28, trend: "up" },
  { brand: "Google", logo: "🔵", count: 2789, percentage: 25, trend: "up" },
  { brand: "Apple", logo: "🍎", count: 1952, percentage: 17, trend: "stable" },
  { brand: "PayPal", logo: "💙", count: 1674, percentage: 15, trend: "down" },
  { brand: "Amazon", logo: "🟡", count: 1432, percentage: 13, trend: "up" },
  { brand: "DHL", logo: "🟡", count: 984, percentage: 9, trend: "down" },
  { brand: "Netflix", logo: "🔴", count: 876, percentage: 8, trend: "stable" },
  { brand: "Chase Bank", logo: "🏦", count: 743, percentage: 7, trend: "up" },
];

export const countryThreats: CountryThreat[] = [
  { country: "Russia", code: "RU", attacks: 4821, percentage: 31 },
  { country: "China", code: "CN", attacks: 3945, percentage: 25 },
  { country: "North Korea", code: "KP", attacks: 2134, percentage: 14 },
  { country: "Nigeria", code: "NG", attacks: 1876, percentage: 12 },
  { country: "Romania", code: "RO", attacks: 1234, percentage: 8 },
  { country: "Brazil", code: "BR", attacks: 987, percentage: 6 },
  { country: "Iran", code: "IR", attacks: 654, percentage: 4 },
];

export const malwareFamilies: MalwareFamily[] = [
  {
    name: "Emotet",
    type: "Banking Trojan / Dropper",
    count: 1243,
    severity: "critical",
    firstDetected: "2026-07-01",
  },
  {
    name: "QakBot",
    type: "Banking Trojan",
    count: 987,
    severity: "critical",
    firstDetected: "2026-07-05",
  },
  {
    name: "AgentTesla",
    type: "Infostealer",
    count: 834,
    severity: "high",
    firstDetected: "2026-07-08",
  },
  {
    name: "FormBook",
    type: "Infostealer",
    count: 712,
    severity: "high",
    firstDetected: "2026-07-10",
  },
  {
    name: "AsyncRAT",
    type: "Remote Access Trojan",
    count: 589,
    severity: "high",
    firstDetected: "2026-07-12",
  },
  {
    name: "LockBit 3.0",
    type: "Ransomware",
    count: 421,
    severity: "critical",
    firstDetected: "2026-07-15",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Critical Threat Detected",
    description: "Email from micros0ft-verify.com scored 91/100",
    timestamp: "2026-07-23T08:34:00Z",
    read: false,
    type: "threat",
  },
  {
    id: "n2",
    title: "New Malware Signature",
    description: "Emotet variant detected in 3 emails",
    timestamp: "2026-07-23T07:15:00Z",
    read: false,
    type: "warning",
  },
  {
    id: "n3",
    title: "API Rate Limit Warning",
    description: "You've used 85% of your monthly scan quota",
    timestamp: "2026-07-22T23:00:00Z",
    read: true,
    type: "info",
  },
  {
    id: "n4",
    title: "Threat Intelligence Updated",
    description: "47 new threat domains added to blocklist",
    timestamp: "2026-07-22T18:00:00Z",
    read: true,
    type: "success",
  },
];

export const currentAnalysisEmail = {
  id: "scan-001",
  subject: "Urgent: Verify Your Microsoft Account Now",
  sender: "Microsoft Security <security@micros0ft-verify.com>",
  recipient: "user@company.com",
  receivedAt: "2026-07-23T08:34:00Z",
  threatScore: 91,
  threatLevel: "critical" as const,
  category: "Phishing / Credential Theft",
  summary:
    "This email impersonates Microsoft and attempts credential theft via a homograph domain attack.",
  fileName: "microsoft_verify.eml",
};
