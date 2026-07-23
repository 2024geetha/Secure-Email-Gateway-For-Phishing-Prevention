import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sentinel AI — Premium Email Security Copilot",
  description:
    "Analyze emails, detect phishing attacks, inspect headers, scan attachments, identify impersonation attempts, and understand cyber threats with explainable AI.",
  keywords: ["email security", "phishing detection", "AI security", "cybersecurity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased bg-[#030712] text-white selection:bg-purple-500/30">
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
