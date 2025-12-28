import { db } from "./db";
import {
  properties, investments, visits,
  type InsertProperty, type Property,
  type InsertInvestment, type Investment,
  type InsertVisit, type Visit
} from "@shared/schema";
import { eq, count } from "drizzle-orm";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Investments
  getInvestments(userId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;

  // Visits
  logVisit(visit: InsertVisit): Promise<void>;
  getVisitCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
  }

  async getInvestments(userId: string): Promise<Investment[]> {
    return await db.select().from(investments).where(eq(investments.userId, userId));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db.insert(investments).values(investment).returning();
    return newInvestment;
  }

  async logVisit(visit: InsertVisit): Promise<void> {
    await db.insert(visits).values(visit);
  }

  async getVisitCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(visits);
    return result?.count || 0;
  }
}

export const storage = new DatabaseStorage();
