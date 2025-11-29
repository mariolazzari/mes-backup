import type { Metadata } from "next";
import "../globals.css";
import { Layout } from "@/types/Layout";
import { inter } from "../fonts";
import { AppBar } from "@/components/AppBar";

export const metadata: Metadata = {
  title: "MES - MES Backup",
  description: "Created by Mario Lazzari",
};

function MesLayout({ children }: Layout) {
  return (
    <html lang="it">
      <body className={`${inter.variable} antialiased`}>
        <AppBar />
        <div className="w-full h-[calc(100dvh-50px)] overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}

export default MesLayout;
