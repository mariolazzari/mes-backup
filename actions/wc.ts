"use server";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { actionError, generalError, noActionError } from "@/lib/error";
import { ServerAction, WorkCenter } from "@/types";

export async function getWorkCenter(): Promise<WorkCenter[]> {
  return await query<WorkCenter>("SELECT * FROM wc order by descrizione", []);
}

export const saveWorkCenter: ServerAction = async (_prevState, formData) => {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<WorkCenter>("cod", "Codice centro di lavoro non valido");
  }
  if (cod.length < 1) {
    return actionError<WorkCenter>(
      "cod",
      "Codice centro di lavoro deve contenere almeno 1 carattere"
    );
  }

  const descrizione = formData.get("descrizione");
  if (!descrizione || typeof descrizione !== "string") {
    return actionError<WorkCenter>(
      "descrizione",
      "Descrizione centro di lavoro non valido"
    );
  }
  if (descrizione.length < 1) {
    return actionError<WorkCenter>(
      "descrizione",
      "La descrizione deve contenere almeno 1 carattere"
    );
  }

  try {
    await query(
      `
        INSERT INTO wc (cod, descrizione)
        VALUES ($1, $2)
        ON CONFLICT (cod)
        DO UPDATE SET descrizione = EXCLUDED.descrizione
      `,
      [cod, descrizione]
    );

    revalidatePath("/wc");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore salvataggio unità di misura:");
  }
};

export const deleteWorkCenter: ServerAction = async (_prevState, formData) => {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<WorkCenter>("cod", "Codice centro di lavoro non valido");
  }

  try {
    await query("DELETE FROM wc WHERE cod = $1", [cod]);

    revalidatePath("/wc");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore eliminazione centro di lavoro:");
  }
};
