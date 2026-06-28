import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://project-block.com"),
  title: "ProjectBlock — AI Usage Metering & Audit Trail",
  description: "The missing infrastructure layer between your app and your LLM. Usage metering + EU AI Act–ready audit trails in one SDK. pip install projectblock.",
  keywords: "AI metering, audit trail, EU AI Act, LLM infrastructure, API gateway, AI compliance, usage tracking, budget gate, GDPR",
  authors: [{ name: "Saad Kaicar" }],
  openGraph: {
    title: "ProjectBlock — Meter. Audit. Ship with confidence.",
    description: "The missing infrastructure layer between your app and your LLM. EU AI Act–ready audit trails in 3 lines of code.",
    url: "https://project-block.com",
    siteName: "ProjectBlock",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProjectBlock — Meter. Audit. Ship with confidence.",
    description: "The missing infrastructure layer between your app and your LLM. EU AI Act–ready audit trails in 3 lines of code.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "ProjectBlock",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "description": "AI usage metering and EU AI Act-ready audit trail infrastructure for developers building AI products.",
              "url": "https://project-block.com",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "0",
                "highPrice": "199",
                "priceCurrency": "EUR",
                "offerCount": "4"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
