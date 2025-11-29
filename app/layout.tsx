import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/types/Layout";
import { inter } from "./fonts";

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
