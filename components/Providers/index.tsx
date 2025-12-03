"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
};
