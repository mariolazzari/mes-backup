export type Production = {
  id: number;
  odp: string;
  fase: string;
  prodotto: string;
  um_prod: string;
  qta_prodotta: number;
  hu_prod_ok: string;
  qta_scartata: number;
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
