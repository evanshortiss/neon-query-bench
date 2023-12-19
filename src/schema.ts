import { index, serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const User = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => {
    return {
      createdAtIdx: index("created_at_idx").on(table.createdAt),
    };
  },
);
