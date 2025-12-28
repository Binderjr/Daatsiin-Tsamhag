import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export * from "./models/auth";

// Properties table
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  status: text("status").notNull(), // for_sale, for_rent, sold, rented
  type: text("type").notNull(), // residential, commercial, land
  imageUrl: text("image_url").notNull(),
  location: text("location").notNull(),
  sqft: integer("sqft").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Investments table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Reference to users.id (varchar)
  propertyId: integer("property_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site visits table
export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  visitedAt: timestamp("visited_at").defaultNow(),
});

// Schemas
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true, createdAt: true });
export const insertInvestmentSchema = createInsertSchema(investments).omit({ id: true, createdAt: true, status: true });
export const insertVisitSchema = createInsertSchema(visits).omit({ id: true, visitedAt: true });

// Types
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Visit = typeof visits.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
