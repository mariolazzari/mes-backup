import { Mes, WorkCenter } from "@/types";

export type MesBarProps = {
  wcs: WorkCenter[];
  selected: Partial<Mes>;
  disableActions: boolean;
};

export * from "./MesBar";
