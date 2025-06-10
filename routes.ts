import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }

      // Check if user exists by username
      let user = await storage.getUserByUsername(username);
      
      // If user doesn't exist, create a new one
      if (!user) {
        const newUser = await storage.createUser({
          username,
          name: username.charAt(0).toUpperCase() + username.slice(1),
          email: `${username}@pylearn.com`
        });
        user = newUser;
      }

      // Store user ID in session
      req.session.userId = user.id;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user
  app.get("/api/user", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Get all learning stages
  app.get("/api/stages", async (req, res) => {
    try {
      const stages = await storage.getAllStages();
      res.json(stages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get stages" });
    }
  });

  // Get stage by ID
  app.get("/api/stages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const stage = await storage.getStage(id);
      if (!stage) {
        return res.status(404).json({ message: "Stage not found" });
      }
      res.json(stage);
    } catch (error) {
      res.status(500).json({ message: "Failed to get stage" });
    }
  });

  // Get lessons by stage
  app.get("/api/stages/:stageId/lessons", async (req, res) => {
    try {
      const stageId = parseInt(req.params.stageId);
      const lessons = await storage.getLessonsByStage(stageId);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to get lessons" });
    }
  });

  // Get lesson by ID
  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lesson = await storage.getLesson(id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to get lesson" });
    }
  });

  // Update lesson completion
  app.patch("/api/lessons/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isCompleted } = req.body;
      
      const completionSchema = z.object({
        isCompleted: z.boolean()
      });
      
      const validatedData = completionSchema.parse({ isCompleted });
      const lesson = await storage.updateLessonCompletion(id, validatedData.isCompleted);
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lesson completion" });
    }
  });

  // Get problems by stage
  app.get("/api/stages/:stageId/problems", async (req, res) => {
    try {
      const stageId = parseInt(req.params.stageId);
      const problems = await storage.getProblemsByStage(stageId);
      res.json(problems);
    } catch (error) {
      res.status(500).json({ message: "Failed to get problems" });
    }
  });

  // Get problem by ID
  app.get("/api/problems/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const problem = await storage.getProblem(id);
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }
      res.json(problem);
    } catch (error) {
      res.status(500).json({ message: "Failed to get problem" });
    }
  });

  // Update problem completion
  app.patch("/api/problems/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isCompleted } = req.body;
      
      const completionSchema = z.object({
        isCompleted: z.boolean()
      });
      
      const validatedData = completionSchema.parse({ isCompleted });
      const problem = await storage.updateProblemCompletion(id, validatedData.isCompleted);
      res.json(problem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update problem completion" });
    }
  });

  // Get projects by stage
  app.get("/api/stages/:stageId/projects", async (req, res) => {
    try {
      const stageId = parseInt(req.params.stageId);
      const projects = await storage.getProjectsByStage(stageId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to get projects" });
    }
  });

  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to get project" });
    }
  });

  // Update project completion
  app.patch("/api/projects/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isCompleted } = req.body;
      
      const completionSchema = z.object({
        isCompleted: z.boolean()
      });
      
      const validatedData = completionSchema.parse({ isCompleted });
      const project = await storage.updateProjectCompletion(id, validatedData.isCompleted);
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project completion" });
    }
  });

  // Get user progress
  app.get("/api/user/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user progress" });
    }
  });

  // Get resources by stage
  app.get("/api/stages/:stageId/resources", async (req, res) => {
    try {
      const stageId = parseInt(req.params.stageId);
      const resources = await storage.getResourcesByStage(stageId);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to get resources" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
