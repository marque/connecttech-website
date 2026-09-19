import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UNEARTHED 2025–26 | ConnecTech #27757",
  description:
    "Explore ConnecTech's 2025–26 UNEARTHED season: GridLock, our robots, team, and Core Values in action.",
};

export default function UnearthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
