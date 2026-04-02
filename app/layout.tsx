import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Moderustic } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const moderustic = Moderustic({
  variable: "--font-moderustic",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "mdhildebrand",
  description: "Portfolio site coming soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={moderustic.className}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
