"use server";
import { query } from "@/lib/db";
import { Um } from "@/types/Um";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types/ActionState";
import { actionError, generalError, noActionError } from "@/lib/error";

export async function getUms(): Promise<Um[]> {
  return await query<Um>("SELECT * FROM um order by descrizione", []);
}

export async function saveUm(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<Um>("cod", "Codice unità di misura non valido");
  }
  if (cod.length < 1) {
    return actionError<Um>(
      "cod",
      "Codice unità di misura deve contenere almeno 1 carattere"
    );
  }

  const descrizione = formData.get("descrizione");
  if (!descrizione || typeof descrizione !== "string") {
    return actionError<Um>(
      "descrizione",
      "Descrizione unità di misura non valido"
    );
  }
  if (descrizione.length < 1) {
    return actionError<Um>(
      "descrizione",
      "La descrizione deve contenere almeno 1 carattere"
    );
  }

  try {
    await query(
      `
        INSERT INTO um (cod, descrizione)
        VALUES ($1, $2)
        ON CONFLICT (cod)
        DO UPDATE SET descrizione = EXCLUDED.descrizione
      `,
      [cod, descrizione]
    );

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore salvataggio unità di misura:");
  }
}

export async function deleteUm(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<Um>("cod", "Codice unità di misura non valido");
  }

  try {
    await query("DELETE FROM um WHERE cod = $1", [cod]);

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore eliminazione unità di misura:");
  }
}
