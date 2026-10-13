import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Moderustic } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./_components/StyledComponentsRegistry";

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
  title: "Matt Hildebrand | Web Developer in Vancouver, BC",
  description: "Matt Hildebrand is a Vancouver-based web developer building custom WordPress and React sites.",
  openGraph: {
    title: "Matt Hildebrand | Web Developer in Vancouver, BC",
    description: "Matt Hildebrand is a Vancouver-based web developer building custom WordPress and React sites.",
    url: 'https://mdhildebrand.com',
  }
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
      <body className="min-h-full flex flex-col">
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
