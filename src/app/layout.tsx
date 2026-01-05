import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import GrainOverlay from "@/components/ui/GrainOverlay";
import DynamicBackground from "@/components/ui/DynamicBackground";
import CustomCursor from "@/components/ui/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Raj | Product Designer",
  description: "Elite growth systems for high-performance brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(syne.variable, inter.variable, "bg-matte-black text-off-white antialiased")}>
        <CustomCursor />
        <DynamicBackground />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
