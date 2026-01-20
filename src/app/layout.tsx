import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditya Raj | Product Designer",
  description: "Elite growth systems for high-performance brands. Specializing in minimalist luxury design and scalable digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
