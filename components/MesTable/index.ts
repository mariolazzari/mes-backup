import { WorkCenter } from "@/types";
import { Mes } from "@/types/Mes";
import { Dispatch, SetStateAction } from "react";

export type MesTableProps = {
  mes: Mes[];
};

type MesFormMode = "insert" | "update" | "clone";

export type MesFormProps = {
  mode: MesFormMode;
  mes?: Mes;
  wcs: WorkCenter[];
};

type MesStatusMode = "delete" | "restore";

export type MesStatusProps = {
  mode: MesStatusMode;
  mes: Mes;
};

export type MesFormGroupProps = {
  selected: Mes;
  setSelected: Dispatch<SetStateAction<Mes>>;
};

export type MesFormGeneralProps = MesFormGroupProps & {
  wcs: WorkCenter[];
};

export * from "./MesForm";
