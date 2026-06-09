import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ProjectBlock — AI Usage Metering & Audit Trail",
  description: "The missing infrastructure layer between your app and your LLM. Usage metering + EU AI Act–ready audit trails in one SDK.",
  keywords: "AI metering, audit trail, EU AI Act, LLM infrastructure, API gateway",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>{children}</body>
    </html>
  );
}
