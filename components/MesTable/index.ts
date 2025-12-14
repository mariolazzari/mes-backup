import { Mes } from "@/types/Mes";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export type MesTableProps = {
  mes: Mes[];
  page: number;
  size: number;
  total: number;
};

type MesFormMode = "insert" | "update" | "clone";

export type MesFormProps = {
  mode: MesFormMode;
  mes?: Mes;
  disabled?: boolean;
};

type MesStatusMode = "delete" | "restore";

export type MesStatusProps = {
  mode: MesStatusMode;
  mes: Mes;
};

export type MesFormGroupProps = {
  selected?: Mes;
  setSelected: Dispatch<SetStateAction<Mes>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const emptyMes: Mes = {
  id: -1,
  odp: "",
  operatore: "",
  wc: "",
  fase: "",
  prodotto: "",
  um_prod: "MT",
  qta_prodotta: 0,
  hu_prod_ok: "",
  qta_scartata: 0,
  hu_scarto: "",
  data_ora_inizio: new Date(),
  data_ora_fine: new Date(),
  componente: "",
  hu_comp: "",
  flag_hu_comp: "",
  um_cons: "MT",
  qta_cons: 0,
  hold: false,
};

export * from "./MesForm";
