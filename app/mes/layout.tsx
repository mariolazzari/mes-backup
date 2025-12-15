import { Layout } from "@/types/Layout";
import { AppBar } from "@/components/AppBar";
import { Providers } from "@/components/Providers";
import { SideBar } from "@/components/SideBar";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "MES - ICC",
  description: "Created by Mario Lazzari",
};

function MesLayout({ children }: Layout) {
  return (
    <Providers>
      <SideBar />
      <div className="flex flex-col w-full h-[calc(100dvh-50px)] overflow-y-auto">
        <AppBar />
        <main>{children}</main>
      </div>
    </Providers>
  );
}

export default MesLayout;
