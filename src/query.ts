import { getConfig } from "./config";
import getDatabaseWrapper from "./db";
import { User } from "./schema";
import { faker } from "@faker-js/faker";

export function getQueryRunner(env: NodeJS.ProcessEnv, count = 5) {
  const config = getConfig(env);

  return async function performQueries(count = 5) {
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

    return { results, queryTimes };
  };
}

export async function seed() {
  const config = getConfig(process.env);
  const db = getDatabaseWrapper(config.DATABASE_URL);

  const data: (typeof User.$inferInsert)[] = [];

  for (let i = 0; i < 50; i++) {
    data.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      createdAt: faker.date.between({
        from: new Date("01/01/2021"),
        to: new Date("12/31/2023"),
      }),
    });
  }

  await db.delete(User);
  await db.insert(User).values(data);
}
