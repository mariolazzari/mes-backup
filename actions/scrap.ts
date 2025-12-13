"use server";
import { delCache, setCache } from "@/lib/cache";
import { query } from "@/lib/db";
import { actionError, generalError, noActionError } from "@/lib/error";
import { Scrap } from "@/types/Scrap";
import { FormAction } from "@/types/FormAction";
import { revalidatePath } from "next/cache";

const CACHE_KEY = "scraps:list";

export async function getScraps(): Promise<Scrap[]> {
  const scraps = await query<Scrap>(
    "SELECT * FROM scrap order by descrizione",
    []
  );
  await setCache(CACHE_KEY, scraps);

  return scraps;
}

export const saveScrap: FormAction = async (_prevState, formData) => {
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
    await delCache(CACHE_KEY);

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore salvataggio causale scarto:");
  }
};

export const deleteScrap: FormAction = async (_prevState, formData) => {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<Scrap>("cod", "Codice causale scarto non valido");
  }

  try {
    await query("DELETE FROM scrap WHERE cod = $1", [cod]);
    await delCache(CACHE_KEY);

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore eliminazione causale scarto:");
  }
};
