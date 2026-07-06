import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Priyanshu Parihar | AI/ML Engineer",
  description: "Portfolio of Priyanshu Parihar, AI/ML Engineer and RAG Systems Builder.",
  openGraph: {
    title: "Priyanshu Parihar | AI/ML Engineer",
    description: "Portfolio of Priyanshu Parihar, AI/ML Engineer and RAG Systems Builder.",
    url: "https://priyanshu-portfolio.vercel.app",
    siteName: "Priyanshu Parihar Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
