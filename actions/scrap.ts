"use server";
import { query } from "@/lib/db";
import { actionError, generalError, noActionError } from "@/lib/error";
import { ActionState } from "@/types/ActionState";
import { Scrap } from "@/types/Scrap";
import { revalidatePath } from "next/cache";

export async function getScraps(): Promise<Scrap[]> {
  return await query<Scrap>("SELECT * FROM scrap order by descrizione", []);
}

export async function saveScrap(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<Scrap>("cod", "Codice unità di misura non valido");
  }
  if (cod.length < 1) {
    return actionError<Scrap>(
      "cod",
      "Codice causale scarto deve contenere almeno 1 carattere"
    );
  }

  const descrizione = formData.get("descrizione");
  if (!descrizione || typeof descrizione !== "string") {
    return actionError<Scrap>(
      "descrizione",
      "Descrizione causale scarto non valida"
    );
  }
  if (descrizione.length < 1) {
    return actionError<Scrap>(
      "descrizione",
      "La descrizione deve contenere almeno 1 carattere"
    );
  }

  try {
    await query(
      `
        INSERT INTO scrap (cod, descrizione)
        VALUES ($1, $2)
        ON CONFLICT (cod)
        DO UPDATE SET descrizione = EXCLUDED.descrizione
      `,
      [cod, descrizione]
    );

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore salvataggio causale scarto:");
  }
}

export async function deleteScrap(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<Scrap>("cod", "Codice causale scarto non valido");
  }

  try {
    await query("DELETE FROM scrap WHERE cod = $1", [cod]);

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore cancellazione causale scarto:");
  }
}
