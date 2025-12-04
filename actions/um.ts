"use server";
import { query } from "@/lib/db";
import { Um } from "@/types/Um";
import { umSchema } from "@/schemas/um";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types/ActionState";

export async function getUms(): Promise<Um[]> {
  return await query<Um>("SELECT * FROM um order by descrizione", []);
}

export async function saveUm(_prevState: unknown, formData: FormData) {
  const parsed = umSchema.safeParse({
    cod: formData.get("cod"),
    descrizione: formData.get("descrizione"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { cod, descrizione } = parsed.data;

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
    console.error("Errore salvataggio UM:", ex);

    return {
      success: false,
      errors: {
        general: ["Errore durante il salvataggio"],
      },
    };
  }
}

export async function deleteUm(_prevState: ActionState, formData: FormData) {
  const cod = formData.get("cod");

  if (!cod || typeof cod !== "string") {
    return { success: false, errors: ["Cod non valido"] };
  }

  try {
    await query("DELETE FROM um WHERE cod = $1", [cod]);

    revalidatePath("/um");

    return { success: true, errors: [] };
  } catch {
    return { success: false, errors: ["Errore durante l'eliminazione"] };
  }
}
