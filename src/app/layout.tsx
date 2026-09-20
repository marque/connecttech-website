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
  title: "ConnecTech #27757 | BIOGLOW 2026–27",
  description:
    "Small bricks. Bigger possibilities. Meet ConnecTech, Bayview Glen's FIRST LEGO League team, and discover BIOGLOW, FIRSTLikeAGirl and ConnecTech Consult.",
  keywords: [
    "BIOGLOW",
    "biodiversity",
    "FIRST LEGO League",
    "ConnecTech",
    "Bayview Glen",
    "FIRSTLikeAGirl",
  ],
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
