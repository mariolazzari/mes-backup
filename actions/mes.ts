"use server";

import { query } from "@/lib/db";
import { actionError, generalError, noActionError } from "@/lib/error";
import { ActionState } from "@/types/ActionState";
import { Mes } from "@/types/Mes";
import { revalidatePath } from "next/cache";

export async function getProds(): Promise<Mes[]> {
  return await query<Mes>("SELECT * FROM prod order by id desc", []);
}

export async function saveProd(_prevState: ActionState, formData: FormData) {
  const id = formData.get("id");
  //   if (!cod || typeof cod !== "string") {
  //     return actionError<Scrap>("cod", "Codice unità di misura non valido");
  //   }
  //   if (cod.length < 1) {
  //     return actionError<Scrap>(
  //       "cod",
  //       "Codice causale scarto deve contenere almeno 1 carattere"
  //     );
  //   }

  try {
    // await query(
    //   `
    //     INSERT INTO scrap (cod, descrizione)
    //     VALUES ($1, $2)
    //     ON CONFLICT (cod)
    //     DO UPDATE SET descrizione = EXCLUDED.descrizione
    //   `,
    //   [cod, descrizione]
    // );

    revalidatePath("/mes");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore salvataggio produzione:");
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
