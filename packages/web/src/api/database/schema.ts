import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const quoteRequests = sqliteTable("quote_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  organization: text("organization"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  tripType: text("trip_type").notNull(),
  destination: text("destination"),
  participants: integer("participants"),
  travelDate: text("travel_date"),
  duration: text("duration"),
  budget: text("budget"),
  message: text("message").notNull(),
  locale: text("locale").notNull().default("fr"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});
