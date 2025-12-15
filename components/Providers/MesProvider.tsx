"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { Mes, Scrap, Um, WorkCenter } from "@/types";

type MesDataContextType = {
  wcs: WorkCenter[];
  ums: Um[];
  scraps: Scrap[];
  defaults: Partial<Mes> | null;
};

const MesDataContext = createContext<MesDataContextType | null>(null);

type MesProviderProps = {
  value: MesDataContextType;
};

export function MesProvider({
  value,
  children,
}: PropsWithChildren<MesProviderProps>) {
  return (
    <MesDataContext.Provider value={value}>{children}</MesDataContext.Provider>
  );
}

export function useMes() {
  const ctx = useContext(MesDataContext);
  if (!ctx) {
    throw new Error("useMes() hook must be used inside MesProvider");
  }
  return ctx;
}
