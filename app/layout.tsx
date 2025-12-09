import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/types";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Login - MES",
  description: "Created by Mario Lazzari",
};

function RootLayout({ children }: Layout) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
