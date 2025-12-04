import { z } from "zod";

export const umSchema = z.object({
  cod: z.string().min(1, "Il codice è obbligatorio"),
  descrizione: z.string().min(1, "La descrizione è obbligatoria"),
});
