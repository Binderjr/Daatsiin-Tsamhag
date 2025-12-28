import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth setup
  await setupAuth(app);
  registerAuthRoutes(app);

  // Properties
  app.get(api.properties.list.path, async (req, res) => {
    const properties = await storage.getProperties();
    res.json(properties);
  });

  app.get(api.properties.get.path, async (req, res) => {
    const property = await storage.getProperty(Number(req.params.id));
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  });

  app.post(api.properties.create.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.properties.create.input.parse(req.body);
      const property = await storage.createProperty(input);
      res.status(201).json(property);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Investments
  app.get(api.investments.list.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = (req.user as any).claims.sub;
    const investments = await storage.getInvestments(userId);
    res.json(investments);
  });

  app.post(api.investments.create.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const input = api.investments.create.input.parse(req.body);
      const investment = await storage.createInvestment(input);
      res.status(201).json(investment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Visits
  app.post(api.visits.log.path, async (req, res) => {
    try {
      const input = api.visits.log.input.parse(req.body);
      await storage.logVisit(input);
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.get(api.visits.stats.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      // Allow for now, or restrict to admin
      // return res.status(401).json({ message: "Unauthorized" });
    }
    const total = await storage.getVisitCount();
    res.json({ total });
  });

  // Seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const props = await storage.getProperties();
  if (props.length === 0) {
    await storage.createProperty({
      title: "Modern Apartment",
      description: "A beautiful 2-bedroom apartment in the city center.",
      price: 250000,
      status: "for_sale",
      type: "residential",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      location: "New York, NY",
      sqft: 1200
    });
    await storage.createProperty({
      title: "Commercial Office Space",
      description: "Spacious office with great views.",
      price: 500000,
      status: "for_rent",
      type: "commercial",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      location: "San Francisco, CA",
      sqft: 3500
    });
    await storage.createProperty({
      title: "Luxury Villa",
      description: "5-bedroom villa with a pool.",
      price: 1200000,
      status: "for_sale",
      type: "residential",
      imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      location: "Miami, FL",
      sqft: 4500
    });
  }
}
