import { query } from "@/lib/db";
import { Um } from "@/types/Um";

export async function getUms(): Promise<Um[]> {
  const ums = await query<Um>("SELECT * FROM um order by descrizione", []);
  return ums;
}
