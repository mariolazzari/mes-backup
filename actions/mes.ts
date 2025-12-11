"use server";

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

export async function getProds(): Promise<Mes[]> {
  return await query<Mes>("SELECT * FROM prod order by id desc", []);
}

export async function saveMes(mes: Mes) {
  try {
    if (mes.id > 0) {
      // update mes
      console.log("UPDATE", mes);
    } else {
      // insert mes
      console.log("INSERT", mes);

      await query(
        `INSERT INTO prod (
                      odp,
                      opertore,
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

    revalidatePath("/mes");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore recupero produzione:");
  }
}
