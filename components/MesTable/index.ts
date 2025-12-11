import { WorkCenter } from "@/types";
import { Mes } from "@/types/Mes";
import { Dispatch, SetStateAction } from "react";

export type MesTableProps = {
  mes: Mes[];
  wcs: WorkCenter[];
};

type MesFormMode = "insert" | "update" | "clone";

export type MesFormProps = {
  mode: MesFormMode;
  mes: Partial<Mes>;
  wcs: WorkCenter[];
  disabled?: boolean;
};

type MesStatusMode = "delete" | "restore";

export type MesStatusProps = {
  mode: MesStatusMode;
  mes: Mes;
};

export type MesFormGroupProps = {
  selected: Partial<Mes>;
  setSelected: Dispatch<SetStateAction<Partial<Mes>>>;
};

export type MesFormGeneralProps = MesFormGroupProps & {
  wcs: WorkCenter[];
};

export * from "./MesForm";
