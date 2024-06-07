import getDatabaseWrapper from "./db";
import { User } from "./schema";
import { ApplicationConfig, QueryRunnerResult } from "./types";

export function getQueryRunner(config: ApplicationConfig) {
  return async function performQueries(params?: {
    apiKey?: string,
    count?: number
  }): Promise<QueryRunnerResult> {
    const { apiKey, count = 5 } = params || {}

    if (config.API_KEY && apiKey !== config.API_KEY) {
      throw new Error('provided api key does not match configured API_KEY')
    }

    const db = getDatabaseWrapper(config.DATABASE_URL);
    const queryTimes = await runBenchmark(db, count);

    return { queryTimes };
  };
}

async function runBenchmark(db: ReturnType<typeof getDatabaseWrapper>, count: number) {
  const queryTimes: { start: number; end: number }[] = [];

  for (let i = 0; i < count; i++) {
    const start = Date.now();

    await db.query.User.findMany({
      limit: 5,
      orderBy: User.createdAt,
    });

    queryTimes.push({
      start,
      end: Date.now(),
    });
  }

  return queryTimes
}
