import { Mes } from "@/types/Mes";

export type MesTableProps = {
  mes: Mes[];
};

type MesFormMode = "insert" | "update" | "clone";

export type MesFormProps = {
  mode: MesFormMode;
  mes?: Mes;
};

type MesStatusMode = "delete" | "restore";

export type MesStatusProps = {
  mode: MesStatusMode;
  mes: Mes;
};

export * from "./MesForm";
