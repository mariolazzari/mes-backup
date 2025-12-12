"use server";
import { delCache, setCache } from "@/lib/cache";
import { query } from "@/lib/db";
import {
  actionError,
  generalError,
  getErrorMessage,
  noActionError,
} from "@/lib/error";
import { ActionState } from "@/types/ActionState";
import { Mes } from "@/types/Mes";
import { revalidatePath } from "next/cache";

const CACHE_KEY = "prods:list";

export async function getProds(): Promise<Mes[]> {
  const prods = await query<Mes>("SELECT * FROM prod order by id desc", []);
  await setCache(CACHE_KEY, prods);

  return prods;
}

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
            flag_hu_comp    = $16,
            um_cons         = $17,
            qta_cons        = $18,
            hold            = $19
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
          mes.flag_hu_comp,
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
                      flag_hu_comp,
                      um_cons,
                      qta_cons,
                      hold
          )
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
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
          mes.flag_hu_comp,
          mes.um_cons,
          mes.qta_cons,
          mes.hold,
        ]
      );
    }
    await delCache(CACHE_KEY);

    revalidatePath("/mes");

    return { success: true, error: "" };
  } catch (ex) {
    const error = getErrorMessage(ex);
    return { success: false, error };
  }
}

export async function deleteMes(_prevState: ActionState, formData: FormData) {
  const id = formData.get("id");
  if (!id || typeof id !== "number") {
    return actionError<Mes>("id", "ID produzione non valido");
  }

  try {
    await query("Update prod set hold=true WHERE id = $1", [id]);
    await delCache(CACHE_KEY);

    revalidatePath("/mes");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore cancellazione produzione:");
  }
}

export async function restoreMes(_prevState: ActionState, formData: FormData) {
  const id = formData.get("id");
  if (!id || typeof id !== "number") {
    return actionError<Mes>("id", "ID produzione non valido");
  }

  try {
    await query("Update prod set hold=false WHERE id = $1", [id]);
    await delCache(CACHE_KEY);

    revalidatePath("/mes");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore recupero produzione:");
  }
}
