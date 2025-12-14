"use server";
import { query } from "@/lib/db";
import {
  actionError,
  generalError,
  getErrorMessage,
  noActionError,
} from "@/lib/error";
import { FormAction } from "@/types";
import { Mes } from "@/types/Mes";
import { revalidatePath } from "next/cache";

type GetProds = (
  page?: number,
  pageSize?: number
) => Promise<{ prods: Mes[]; total: number }>;

export const getProds: GetProds = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;
  const [prods, totals] = await Promise.all([
    query<Mes>("SELECT * FROM prod ORDER BY id DESC LIMIT $1 OFFSET $2", [
      pageSize,
      offset,
    ]),
    query<{ total: string }>("SELECT count(id) as total FROM prod", []),
  ]);

  return { prods, total: +totals[0].total };
};

export async function saveMes(mes: Mes) {
  try {
    if (mes.id > 0) {
      // update mes
      await query(
        `
          UPDATE prod
          SET
            odp             = $2,
            operatore       = $3,
            wc              = $4,
            fase            = $5,
            prodotto        = $6,
            um_prod         = $7,
            qta_prodotta    = $8,
            hu_prod_ok      = $9,
            qta_scartata    = $10,
            hu_scarto       = $11,
            data_ora_inizio = $12,
            data_ora_fine   = $13,
            componente      = $14,
            hu_comp         = $15,
            um_cons         = $16,
            qta_cons        = $17,
            hold            = $18
          WHERE id = $1
        `,
        [
          mes.id,
          mes.odp,
          mes.operatore,
          mes.wc,
          mes.fase,
          mes.prodotto,
          mes.um_prod,
          mes.qta_prodotta,
          mes.hu_prod_ok,
          mes.qta_scartata,
          mes.hu_scarto,
          mes.data_ora_inizio,
          mes.data_ora_fine,
          mes.componente,
          mes.hu_comp,
          mes.um_cons,
          mes.qta_cons,
          mes.hold,
        ]
      );
    } else {
      // insert mes
      await query(
        `INSERT INTO prod (
          odp,
          operatore,
          wc,
          fase,
          prodotto,
          um_prod,
          qta_prodotta,
          hu_prod_ok,
          qta_scartata,
          hu_scarto,
          data_ora_inizio,
          data_ora_fine,
          componente,
          hu_comp,
          um_cons,
          qta_cons,
          hold
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        [
          mes.odp,
          mes.operatore,
          mes.wc,
          mes.fase,
          mes.prodotto,
          mes.um_prod,
          mes.qta_prodotta,
          mes.hu_prod_ok,
          mes.qta_scartata,
          mes.hu_scarto,
          mes.data_ora_inizio,
          mes.data_ora_fine,
          mes.componente,
          mes.hu_comp,
          mes.um_cons,
          mes.qta_cons,
          mes.hold,
        ]
      );
    }

    revalidatePath("/mes");

    return { success: true, error: "" };
  } catch (ex) {
    const error = getErrorMessage(ex);
    return { success: false, error };
  }
}

export const deleteMes: FormAction = async (_prevState, formData) => {
  const id = Number(formData.get("id"));
  if (!id || typeof id !== "number") {
    return actionError<Mes>("id", "ID produzione non valido");
  }

  try {
    await query("Update prod set hold=true WHERE id = $1", [id]);
    revalidatePath("/mes");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore elimina produzione:");
  }
};

export const restoreMes: FormAction = async (_prevState, formData) => {
  const id = Number(formData.get("id"));
  if (!id || typeof id !== "number") {
    return actionError<Mes>("id", "ID produzione non valido");
  }

  try {
    await query("Update prod set hold=false WHERE id = $1", [id]);
    revalidatePath("/mes");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore recupero produzione:");
  }
};
