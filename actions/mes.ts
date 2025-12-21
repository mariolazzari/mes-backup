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
import { endOfToday, startOfToday } from "date-fns";
//import { setCache } from "@/lib/cache";

//const CACHE_KEY = "mes:last";

export const getProds = async (
  page = 1,
  pageSize = 10,
  from?: string,
  to?: string,
  prodotto?: string,
  odp?: string
) => {
  const offset = page < 1 ? 0 : (page - 1) * Math.abs(pageSize);

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  // Filtri data
  if (from) {
    params.push(from);
    conditions.push(`data_ora_inizio >= $${params.length}`);
  }

  if (to) {
    params.push(to);
    conditions.push(`data_ora_inizio <= $${params.length}`);
  }

  // Filtro prodotto
  if (prodotto) {
    params.push(prodotto);
    conditions.push(`prodotto = $${params.length}`);
  }

  // Filtro odp
  if (odp) {
    params.push(odp);
    conditions.push(`odp = $${params.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const [prods, totals] = await Promise.all([
    query<Mes>(
      `
      SELECT *
      FROM prod
      ${whereClause}
      ORDER BY id DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
      `,
      [...params, Math.abs(pageSize), offset]
    ),
    query<{ total: string }>(
      `
      SELECT COUNT(id) as total
      FROM prod
      ${whereClause}
      `,
      params
    ),
  ]);

  return { prods, total: Number(totals[0].total) };
};

export const getProdsByDate = async (
  startDate = startOfToday(),
  endDate = endOfToday()
) => {
  const dateConditions: string[] = [];
  const params: string[] = [];

  params.push(startDate.toISOString());
  dateConditions.push(`data_ora_inizio >= $${params.length}`);

  params.push(endDate.toISOString());
  dateConditions.push(`data_ora_inizio <= $${params.length}`);

  const whereClause = dateConditions.length
    ? `WHERE ${dateConditions.join(" AND ")}`
    : "";

  const prods = query<Mes>(
    `SELECT * FROM prod ${whereClause} ORDER BY id DESC`,
    params
  );

  return prods;
};

export const saveMes = async (mes: Mes) => {
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

    // save last defaults
    // const { operatore, wc, data_ora_inizio, fase, odp, um_cons, um_prod } = mes;
    // await setCache(CACHE_KEY, {
    //   operatore,
    //   wc,
    //   data_ora_inizio,
    //   fase,
    //   odp,
    //   um_cons,
    //   um_prod,
    // });
    revalidatePath("/mes");

    return { success: true, error: "" };
  } catch (ex) {
    const error = getErrorMessage(ex);
    return { success: false, error };
  }
};

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
