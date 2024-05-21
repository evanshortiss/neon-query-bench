import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchFunction = (input: string | URL | Request, init?: RequestInit | undefined) => {
  if (init) {
    // Disable Next.js fetch caching: https://nextjs.org/docs/app/api-reference/functions/fetch
    (init as any).cache = 'no-store'
  }

  return fetch(input, init)
};

export type DatabaseWrapper = Awaited<ReturnType<typeof getDatabaseWrapper>>;

export default function getDatabaseWrapper(dbUrl: string) {
  const sql = neon(dbUrl);
  const db = drizzle(sql, { schema });

  return db;
}
