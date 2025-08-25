import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Frameworks
  app.get("/api/frameworks", async (req, res) => {
    try {
      const frameworks = await storage.getFrameworks();
      res.json(frameworks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch frameworks" });
    }
  });

  app.get("/api/frameworks/:id", async (req, res) => {
    try {
      const framework = await storage.getFramework(req.params.id);
      if (!framework) {
        return res.status(404).json({ message: "Framework not found" });
      }
      res.json(framework);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch framework" });
    }
  });



  // Selector questions
  app.get("/api/selector/questions", async (req, res) => {
    try {
      const questions = await storage.getSelectorQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch selector questions" });
    }
  });

  // Framework comparisons
  app.get("/api/comparisons", async (req, res) => {
    try {
      const comparisons = await storage.getFrameworkComparisons();
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comparisons" });
    }
  });

  // Search
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const results = await storage.searchContent(q);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Framework recommendation based on answers
  app.post("/api/selector/recommend", async (req, res) => {
    try {
      const { answers } = req.body;
      
      // Simple recommendation logic based on answers
      const frameworks = await storage.getFrameworks();
      let recommendations = frameworks;
      
      // Filter based on compliance needs
      if (answers.objective === 'compliance') {
        recommendations = frameworks.filter(f => f.isMandatory || f.id === 'gri');
      } else if (answers.objective === 'materiality') {
        recommendations = frameworks.filter(f => f.id === 'sasb' || f.id === 'esrs');
      }
      
      // Score and sort recommendations
      const scoredRecommendations = recommendations.map(framework => ({
        framework,
        score: calculateRecommendationScore(framework, answers),
        reasons: getRecommendationReasons(framework, answers)
      })).sort((a, b) => b.score - a.score);
      
      res.json(scoredRecommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function calculateRecommendationScore(framework: any, answers: any): number {
  let score = 50; // Base score
  
  // Adjust based on answers
  if (answers.objective === 'compliance' && framework.isMandatory) {
    score += 30;
  }
  
  if (answers.objective === 'materiality' && framework.id === 'sasb') {
    score += 25;
  }
  
  if (answers.scope === 'comprehensive' && framework.id === 'gri') {
    score += 20;
  }
  
  return Math.min(100, score);
}

function getRecommendationReasons(framework: any, answers: any): string[] {
  const reasons = [];
  
  if (answers.objective === 'compliance' && framework.isMandatory) {
    reasons.push("Meets regulatory compliance requirements");
  }
  
  if (answers.objective === 'materiality' && framework.hasIndustrySpecificity) {
    reasons.push("Provides industry-specific guidance");
  }
  
  if (framework.focusAreas.includes("Climate") && answers.priorities?.includes("climate")) {
    reasons.push("Strong focus on climate-related disclosures");
  }
  
  return reasons;
}
