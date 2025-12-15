import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConnecTech #27757 | GridLock - Precision Gridding Tool",
  description: "GridLock is a revolutionary precision gridding tool for archaeological excavation. Built by ConnecTech, a FIRST LEGO League team from Bayview Glen School.",
  keywords: ["GridLock", "archaeology", "excavation", "gridding tool", "FIRST LEGO League", "ConnecTech", "Bayview Glen"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
