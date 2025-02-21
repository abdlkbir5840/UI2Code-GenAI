import { integer, pgTable, varchar, timestamp, json } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(0)
});
export const wirfremeToCodeTable = pgTable("wirfremeToCodeTable", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uid:varchar().notNull(),
    imageUrl: varchar(),
    model: varchar(),
    description: varchar(),
    code: json(),
    created_by: varchar()
});