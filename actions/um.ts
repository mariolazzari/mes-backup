"use server";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { actionError, generalError, noActionError } from "@/lib/error";
import { ServerAction, Um } from "@/types";
import { delCache, getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "um:list";

export async function getUms(): Promise<Um[]> {
  const cached = await getCache<Um[]>(CACHE_KEY);
  if (cached) {
    return cached;
  }

  const ums = await query<Um>("SELECT * FROM um order by descrizione", []);
  await setCache<Um[]>(CACHE_KEY, ums);

  return ums;
}

export const saveUm: ServerAction = async (_prevState, formData) => {
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
    await delCache(CACHE_KEY);

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore salvataggio unità di misura:");
  }
};

export const deleteUm: ServerAction = async (_prevState, formData) => {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return actionError<Um>("cod", "Codice unità di misura non valido");
  }

  try {
    await query("DELETE FROM um WHERE cod = $1", [cod]);
    await delCache(CACHE_KEY);

    revalidatePath("/um");

    return noActionError();
  } catch (ex) {
    return generalError(ex, "Errore eliminazione unità di misura:");
  }
};
