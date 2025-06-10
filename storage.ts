import { 
  users, 
  learningStages, 
  lessons, 
  problems, 
  projects, 
  userProgress, 
  resources,
  type User, 
  type InsertUser,
  type LearningStage,
  type InsertLearningStage,
  type Lesson,
  type InsertLesson,
  type Problem,
  type InsertProblem,
  type Project,
  type InsertProject,
  type UserProgress,
  type InsertUserProgress,
  type Resource,
  type InsertResource
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User>;
  
  // Learning stages operations
  getAllStages(): Promise<LearningStage[]>;
  getStage(id: number): Promise<LearningStage | undefined>;
  createStage(stage: InsertLearningStage): Promise<LearningStage>;
  updateStageProgress(stageId: number, completedLessons: number): Promise<LearningStage>;
  
  // Lessons operations
  getLessonsByStage(stageId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLessonCompletion(lessonId: number, isCompleted: boolean): Promise<Lesson>;
  
  // Problems operations
  getProblemsByStage(stageId: number): Promise<Problem[]>;
  getProblem(id: number): Promise<Problem | undefined>;
  createProblem(problem: InsertProblem): Promise<Problem>;
  updateProblemCompletion(problemId: number, isCompleted: boolean): Promise<Problem>;
  
  // Projects operations
  getProjectsByStage(stageId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProjectCompletion(projectId: number, isCompleted: boolean): Promise<Project>;
  
  // User progress operations
  getUserProgress(userId: number): Promise<UserProgress[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Resources operations
  getResourcesByStage(stageId: number): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private learningStages: Map<number, LearningStage>;
  private lessons: Map<number, Lesson>;
  private problems: Map<number, Problem>;
  private projects: Map<number, Project>;
  private userProgress: Map<number, UserProgress>;
  private resources: Map<number, Resource>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.learningStages = new Map();
    this.lessons = new Map();
    this.problems = new Map();
    this.projects = new Map();
    this.userProgress = new Map();
    this.resources = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const user: User = {
      id: 1,
      username: "johndoe",
      name: "John Doe",
      email: "john@example.com",
      points: 1250
    };
    this.users.set(1, user);

    // Create learning stages
    const beginnerStage: LearningStage = {
      id: 1,
      name: "Beginner",
      level: 1,
      description: "Python basics, syntax, and fundamental concepts",
      isUnlocked: true,
      totalLessons: 8,
      completedLessons: 8
    };
    
    const intermediateStage: LearningStage = {
      id: 2,
      name: "Intermediate",
      level: 2,
      description: "Object-oriented programming, data structures, and algorithms",
      isUnlocked: true,
      totalLessons: 12,
      completedLessons: 8
    };
    
    const advancedStage: LearningStage = {
      id: 3,
      name: "Advanced",
      level: 3,
      description: "Advanced topics, frameworks, and professional development",
      isUnlocked: false,
      totalLessons: 15,
      completedLessons: 0
    };

    this.learningStages.set(1, beginnerStage);
    this.learningStages.set(2, intermediateStage);
    this.learningStages.set(3, advancedStage);

    // Create lessons for intermediate stage
    const lessonsData = [
      {
        id: 1,
        stageId: 2,
        title: "Classes and Objects Fundamentals",
        description: "Learn how to create classes, instantiate objects, and understand the relationship between them.",
        content: "Comprehensive guide to classes and objects in Python...",
        duration: 25,
        isCompleted: true,
        order: 1
      },
      {
        id: 2,
        stageId: 2,
        title: "Methods and Attributes",
        description: "Understand instance methods, class methods, static methods, and different types of attributes.",
        content: "Deep dive into Python methods and attributes...",
        duration: 30,
        isCompleted: false,
        order: 2
      },
      {
        id: 3,
        stageId: 2,
        title: "Inheritance and Polymorphism",
        description: "Explore inheritance relationships, method overriding, and polymorphic behavior in Python.",
        content: "Complete guide to inheritance and polymorphism...",
        duration: 35,
        isCompleted: false,
        order: 3
      }
    ];

    lessonsData.forEach(lesson => this.lessons.set(lesson.id, lesson));

    // Create problems
    const problemsData = [
      {
        id: 1,
        stageId: 2,
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        source: "LeetCode",
        sourceUrl: "https://leetcode.com/problems/two-sum/",
        isCompleted: true,
        solution: null
      },
      {
        id: 2,
        stageId: 2,
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        difficulty: "Easy",
        tags: ["String", "Stack"],
        source: "LeetCode",
        sourceUrl: "https://leetcode.com/problems/valid-parentheses/",
        isCompleted: false,
        solution: null
      },
      {
        id: 3,
        stageId: 2,
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Medium",
        tags: ["Hash Table", "Sliding Window"],
        source: "LeetCode",
        sourceUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        isCompleted: false,
        solution: null
      }
    ];

    problemsData.forEach(problem => this.problems.set(problem.id, problem));

    // Create projects
    const projectsData = [
      {
        id: 1,
        stageId: 2,
        title: "Object-Oriented Todo App",
        description: "Build a todo application using classes for Task, TodoList, and User management with file persistence.",
        difficulty: "Beginner",
        estimatedTime: 2,
        skills: ["Classes", "File I/O", "Data Management"],
        isCompleted: false,
        githubUrl: null
      },
      {
        id: 2,
        stageId: 2,
        title: "Banking System Simulator",
        description: "Create a banking system with Account, SavingsAccount, and CheckingAccount classes demonstrating inheritance.",
        difficulty: "Intermediate",
        estimatedTime: 4,
        skills: ["Inheritance", "Polymorphism", "Error Handling"],
        isCompleted: false,
        githubUrl: null
      }
    ];

    projectsData.forEach(project => this.projects.set(project.id, project));

    this.currentId = 100; // Start from 100 for new items
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, points: 0 };
    this.users.set(id, user);
    return user;
  }

  async updateUserPoints(userId: number, points: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    user.points = points;
    this.users.set(userId, user);
    return user;
  }

  // Learning stages operations
  async getAllStages(): Promise<LearningStage[]> {
    return Array.from(this.learningStages.values()).sort((a, b) => a.level - b.level);
  }

  async getStage(id: number): Promise<LearningStage | undefined> {
    return this.learningStages.get(id);
  }

  async createStage(insertStage: InsertLearningStage): Promise<LearningStage> {
    const id = this.currentId++;
    const stage: LearningStage = { 
      id,
      name: insertStage.name,
      level: insertStage.level,
      description: insertStage.description,
      isUnlocked: insertStage.isUnlocked ?? false,
      totalLessons: insertStage.totalLessons ?? 0,
      completedLessons: insertStage.completedLessons ?? 0
    };
    this.learningStages.set(id, stage);
    return stage;
  }

  async updateStageProgress(stageId: number, completedLessons: number): Promise<LearningStage> {
    const stage = this.learningStages.get(stageId);
    if (!stage) throw new Error("Stage not found");
    stage.completedLessons = completedLessons;
    this.learningStages.set(stageId, stage);
    return stage;
  }

  // Lessons operations
  async getLessonsByStage(stageId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.stageId === stageId)
      .sort((a, b) => a.order - b.order);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentId++;
    const lesson: Lesson = { 
      ...insertLesson, 
      id,
      isCompleted: insertLesson.isCompleted ?? false
    };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async updateLessonCompletion(lessonId: number, isCompleted: boolean): Promise<Lesson> {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) throw new Error("Lesson not found");
    lesson.isCompleted = isCompleted;
    this.lessons.set(lessonId, lesson);
    return lesson;
  }

  // Problems operations
  async getProblemsByStage(stageId: number): Promise<Problem[]> {
    return Array.from(this.problems.values()).filter(problem => problem.stageId === stageId);
  }

  async getProblem(id: number): Promise<Problem | undefined> {
    return this.problems.get(id);
  }

  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const id = this.currentId++;
    const problem: Problem = { 
      ...insertProblem, 
      id,
      isCompleted: insertProblem.isCompleted ?? false,
      tags: insertProblem.tags ?? [],
      sourceUrl: insertProblem.sourceUrl ?? null,
      solution: insertProblem.solution ?? null
    };
    this.problems.set(id, problem);
    return problem;
  }

  async updateProblemCompletion(problemId: number, isCompleted: boolean): Promise<Problem> {
    const problem = this.problems.get(problemId);
    if (!problem) throw new Error("Problem not found");
    problem.isCompleted = isCompleted;
    this.problems.set(problemId, problem);
    return problem;
  }

  // Projects operations
  async getProjectsByStage(stageId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.stageId === stageId);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = { 
      ...insertProject, 
      id,
      isCompleted: insertProject.isCompleted ?? false,
      skills: insertProject.skills ?? [],
      githubUrl: insertProject.githubUrl ?? null
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProjectCompletion(projectId: number, isCompleted: boolean): Promise<Project> {
    const project = this.projects.get(projectId);
    if (!project) throw new Error("Project not found");
    project.isCompleted = isCompleted;
    this.projects.set(projectId, project);
    return project;
  }

  // User progress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentId++;
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      isCompleted: insertProgress.isCompleted ?? false,
      lessonId: insertProgress.lessonId ?? null,
      problemId: insertProgress.problemId ?? null,
      projectId: insertProgress.projectId ?? null,
      completedAt: insertProgress.completedAt ?? null
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  // Resources operations
  async getResourcesByStage(stageId: number): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.stageId === stageId);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentId++;
    const resource: Resource = { 
      ...insertResource, 
      id,
      isFree: insertResource.isFree ?? true
    };
    this.resources.set(id, resource);
    return resource;
  }
}

export const storage = new MemStorage();
