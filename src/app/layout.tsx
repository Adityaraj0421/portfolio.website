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
  description: "Elite growth systems for high-performance brands. Specializing in minimalist luxury design and scalable digital products.",
  keywords: [
    "Product Designer",
    "UX/UI Design",
    "Minimalist Design",
    "High-Performance Web",
    "Aditya Raj",
    "Fobet Media",
    "Growth Systems",
    "Digital Strategy",
  ],
  authors: [{ name: "Aditya Raj", url: "https://fobetmedia.com" }],
  creator: "Aditya Raj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fobetmedia.com",
    title: "Aditya Raj | Product Designer",
    description: "Elite growth systems for high-performance brands. Specializing in minimalist luxury design.",
    siteName: "Aditya Raj Portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Aditya Raj - Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj | Product Designer",
    description: "Elite growth systems for high-performance brands.",
    creator: "@adityaraj", // Assuming a handle, can be updated later if known
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
