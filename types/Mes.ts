export type Mes = {
  id: number;
  odp: string;
  operatore: string;
  wc: string;
  fase: string;
  prodotto: string;
  um_prod: string;
  nr_fili: number;
  qta_prodotta: number;
  hu_prod_ok: string;
  qta_scartata: number;
  cod_scarto: string;
  hu_scarto: string;
  data_ora_inizio: Date;
  data_ora_fine: Date;
  componente: string;
  hu_comp: string;
  flag_hu_comp: string;
  um_cons: string;
  qta_cons: number;
  hold: boolean;
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
