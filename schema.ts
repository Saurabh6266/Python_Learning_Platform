import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  points: integer("points").notNull().default(0),
});

export const learningStages = pgTable("learning_stages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  level: integer("level").notNull(),
  description: text("description").notNull(),
  isUnlocked: boolean("is_unlocked").notNull().default(false),
  totalLessons: integer("total_lessons").notNull().default(0),
  completedLessons: integer("completed_lessons").notNull().default(0),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  stageId: integer("stage_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  duration: integer("duration").notNull(), // in minutes
  isCompleted: boolean("is_completed").notNull().default(false),
  order: integer("order").notNull(),
});

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  stageId: integer("stage_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // Easy, Medium, Hard
  tags: text("tags").array().notNull().default([]),
  source: text("source").notNull(), // LeetCode, HackerRank
  sourceUrl: text("source_url"),
  isCompleted: boolean("is_completed").notNull().default(false),
  solution: text("solution"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  stageId: integer("stage_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  estimatedTime: integer("estimated_time").notNull(), // in hours
  skills: text("skills").array().notNull().default([]),
  isCompleted: boolean("is_completed").notNull().default(false),
  githubUrl: text("github_url"),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  stageId: integer("stage_id").notNull(),
  lessonId: integer("lesson_id"),
  problemId: integer("problem_id"),
  projectId: integer("project_id"),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: text("completed_at"),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  stageId: integer("stage_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // video, article, documentation
  isFree: boolean("is_free").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  points: true,
});

export const insertLearningStageSchema = createInsertSchema(learningStages).omit({
  id: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertProblemSchema = createInsertSchema(problems).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LearningStage = typeof learningStages.$inferSelect;
export type InsertLearningStage = z.infer<typeof insertLearningStageSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Problem = typeof problems.$inferSelect;
export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
