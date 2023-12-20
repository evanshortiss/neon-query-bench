import { faker } from "@faker-js/faker";
import { getConfig } from "./src/config";
import getDatabaseWrapper from "./src/db";
import { User } from "./src/schema";

async function seed() {
  console.log('Start seed operation...')
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

  console.log('Seed operation success...')
}

seed()
