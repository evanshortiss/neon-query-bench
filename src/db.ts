import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type DatabaseWrapper = Awaited<ReturnType<typeof getDatabaseWrapper>>;

export default function getDatabaseWrapper(dbUrl: string) {
  const sql = neon(dbUrl);
  const db = drizzle(sql, { schema });

  return db;
}
