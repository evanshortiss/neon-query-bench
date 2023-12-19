import type { Config } from "drizzle-kit";
export default {
  driver: 'pg',
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
} satisfies Config;
