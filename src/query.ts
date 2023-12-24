import getDatabaseWrapper from "./db";
import { User } from "./schema";
import { ApplicationConfig, QueryRunnerResult } from "./types";

export function getQueryRunner(config: ApplicationConfig) {
  const neonRegion = new URL(config.DATABASE_URL).hostname.split(/\.([^]*)/)[1];

  return async function performQueries(params?: {
    apiKey?: string,
    count?: number
  }): Promise<QueryRunnerResult> {
    const { apiKey, count = 5 } = params || {}

    if (config.API_KEY && apiKey !== config.API_KEY) {
      throw new Error('provided api key does not match configured API_KEY')
    }

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
