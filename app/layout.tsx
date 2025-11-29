import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/types/Layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login - MES Basic",
  description: "Created by Mario Lazzari",
};

function RootLayout({ children }: Layout) {
  return (
    <html lang="it">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
