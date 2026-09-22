import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova-Polaris Support Ops Center",
  description: "Route. Ground. Resolve. Multi-agent support with parallel RAG and full traceability."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
