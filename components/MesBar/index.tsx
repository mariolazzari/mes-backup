import { Mes, Scrap, WorkCenter } from "@/types";

export type MesBarProps = {
  wcs: WorkCenter[];
  scraps: Scrap[];
  selected: Partial<Mes>;
  disableActions: boolean;
};

export * from "./MesBar";
