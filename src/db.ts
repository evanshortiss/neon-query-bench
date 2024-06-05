import { neon, Pool } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

export type DatabaseWrapper = Awaited<ReturnType<typeof getDatabaseWrapper>>;

export default function getDatabaseWrapper(connectionString: string, mode: "http" | "ws") {
  if (mode === "ws") {
    const client = new Pool({ connectionString });
    return drizzleWs(client, { schema, logger: true });
  } else {
    const sql = neon(connectionString);
    return drizzleHttp(sql, { schema, logger: true });
  }
}
