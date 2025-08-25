import { pgTable, text, varchar, json, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const frameworks = pgTable("frameworks", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  isMandatory: boolean("is_mandatory").default(false),
  hasIndustrySpecificity: boolean("has_industry_specificity").default(false),
  focusAreas: json("focus_areas").$type<string[]>().default([]),
  establishedYear: integer("established_year"),
  keyFeatures: json("key_features").$type<string[]>().default([]),
  targetAudience: text("target_audience"),
  website: text("website"),
  backgroundColor: text("background_color"),
  iconColor: text("icon_color"),
});

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "guide", "template", "training", "case-study"
  category: text("category").notNull(),
  frameworkId: varchar("framework_id"),
  fileType: text("file_type"), // "pdf", "excel", "video", "interactive"
  pageCount: integer("page_count"),
  duration: text("duration"),
  downloadUrl: text("download_url"),
  tags: json("tags").$type<string[]>().default([]),
});

export const selectorQuestions = pgTable("selector_questions", {
  id: varchar("id").primaryKey(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
  options: json("options").$type<{value: string, label: string, description: string}[]>().default([]),
});

export const frameworkComparisons = pgTable("framework_comparisons", {
  id: varchar("id").primaryKey(),
  feature: text("feature").notNull(),
  description: text("description"),
  values: json("values").$type<Record<string, string>>().default({}),
  order: integer("order").notNull(),
});

export const insertFrameworkSchema = createInsertSchema(frameworks);
export const insertResourceSchema = createInsertSchema(resources);
export const insertSelectorQuestionSchema = createInsertSchema(selectorQuestions);
export const insertFrameworkComparisonSchema = createInsertSchema(frameworkComparisons);

export type Framework = typeof frameworks.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type SelectorQuestion = typeof selectorQuestions.$inferSelect;
export type FrameworkComparison = typeof frameworkComparisons.$inferSelect;
export type InsertFramework = z.infer<typeof insertFrameworkSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type InsertSelectorQuestion = z.infer<typeof insertSelectorQuestionSchema>;
export type InsertFrameworkComparison = z.infer<typeof insertFrameworkComparisonSchema>;
