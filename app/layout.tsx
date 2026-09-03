import type { Metadata } from "next";
import "./globals.css";
import "./portfolio-system.css";

export const metadata: Metadata = {
  title: { default: "kelli deng portfolio 2026", template: "%s | kelli deng portfolio 2026" },
  description: "Kelli Deng's CMF design portfolio: strategy, product storytelling, agile upgrades and GenAI-assisted exploration.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
