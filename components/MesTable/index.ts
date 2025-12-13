import { Scrap, WorkCenter } from "@/types";
import { Mes } from "@/types/Mes";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export type MesTableProps = {
  mes: Mes[];
  wcs: WorkCenter[];
  scraps: Scrap[];
  page: number;
  size: number;
  total: number;
};

type MesFormMode = "insert" | "update" | "clone";

export type MesFormProps = {
  mode: MesFormMode;
  mes: Partial<Mes>;
  wcs: WorkCenter[];
  scraps: Scrap[];
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
  onChange: ChangeEventHandler<HTMLInputElement>;
} & Partial<{
  wcs: WorkCenter[];
  scraps: Scrap[];
}>;

export * from "./MesForm";
