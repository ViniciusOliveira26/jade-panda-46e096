import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

// One row per student (Netlify Identity user) holding their study progress.
export const studentProgress = pgTable("student_progress", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  progress: jsonb("progress").notNull().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
