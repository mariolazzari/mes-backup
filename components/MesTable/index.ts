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
  setSelected: Dispatch<SetStateAction<Mes>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
} & Partial<{
  selected: Mes;
  autoFocus: keyof Mes;
}>;

export const emptyMes: Mes = {
  id: -1,
  odp: "",
  operatore: "",
  wc: "",
  fase: "",
  prodotto: "",
  um_prod: "MT",
  qta_prodotta: 0,
  nr_fili: 0,
  hu_prod_ok: "",
  qta_scartata: 0,
  hu_scarto: "",
  cod_scarto: "",
  data_ora_inizio: new Date(),
  data_ora_fine: new Date(),
  componente: "",
  hu_comp: "",
  flag_hu_comp: "",
  um_cons: "MT",
  qta_cons: 0,
  hold: false,
};

export type SearchDialogArgs = Partial<{
  from: string;
  to: string;
  odp: string;
  prodotto: string;
}>;

export type SearchDialogProps = {
  onSearchClick: (e: SearchDialogArgs) => void;
};

export * from "./MesForm";
