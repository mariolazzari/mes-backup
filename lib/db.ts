import pkg from "pg";
const { Pool } = pkg;
import type { QueryResultRow } from "pg";

// Configure the pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Fail if connection takes more than 2 seconds
});

// Generic query function
export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  try {
    const { rows } = await pool.query<T>(text, params);
    return rows;
  } catch (ex) {
    console.error("Database query error:", ex, { text, params });
    throw ex;
  }
}
