import getDatabaseWrapper from "./db";
import { User } from "./schema";
import { ApplicationConfig, QueryRunnerResult } from "./types";

export function getQueryRunner(config: ApplicationConfig) {
  const neonRegion = new URL(config.DATABASE_URL).hostname.split(/\.([^]*)/)[1];

  return async function performQueries(count = 5): Promise<QueryRunnerResult> {
    const db = await getDatabaseWrapper(config.DATABASE_URL);
    const queryTimes: { start: number; end: number }[] = [];
    let results: (typeof User.$inferSelect)[] = [];

    for (let i = 0; i < count; i++) {
      const start = Date.now();
      results = await db.query.User.findMany({
        limit: 5,
        orderBy: User.createdAt,
      });
      queryTimes.push({
        start,
        end: Date.now(),
      });
    }

    return { results, queryTimes, neonRegion };
  };
}
