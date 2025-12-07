"use server";
import { query } from "@/lib/db";
import { Um } from "@/types/Um";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types/ActionState";
import { getErrorMessage } from "@/lib/error";

export async function getUms(): Promise<Um[]> {
  return await query<Um>("SELECT * FROM um order by descrizione", []);
}

export async function saveUm(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return {
      success: false,
      errors: {
        cod: "Codice unità di misura non valido",
      },
    };
  }

  const descrizione = formData.get("descrizione");
  if (!descrizione || typeof descrizione !== "string") {
    return {
      success: false,
      errors: {
        descrizione: "Descrizione unità di misura non valido",
      },
    };
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

    return { success: true, errors: {} };
  } catch (ex) {
    const general = `Errore salvataggio unità di misura: ${getErrorMessage(
      ex
    )}`;
    console.error(general);

    return {
      success: false,
      errors: {
        general,
      },
    };
  }
}

export async function deleteUm(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");
  if (!cod || typeof cod !== "string") {
    return {
      success: false,
      errors: { cod: "Codice unità di misura mancante o non valido" },
    };
  }

  try {
    await query("DELETE FROM um WHERE cod = $1", [cod]);

    revalidatePath("/um");

    return {
      success: true,
      errors: {},
    };
  } catch (ex) {
    console.error("Errore eliminazione UM:", ex);
    const general = getErrorMessage(ex);

    return {
      success: false,
      errors: {
        general,
      },
    };
  }
}
