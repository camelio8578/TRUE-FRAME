import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

// OAuth users (Kimi)
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Local auth users (username/password)
export const localUsers = mysqlTable("local_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  displayName: varchar("displayName", { length: 255 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type LocalUser = typeof localUsers.$inferSelect;
export type InsertLocalUser = typeof localUsers.$inferInsert;

// Videos uploaded for analysis
export const videos = mysqlTable("videos", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  userType: mysqlEnum("userType", ["oauth", "local"]).default("oauth"),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: bigint("fileSize", { mode: "number" }).notNull(),
  duration: int("duration"),
  resolution: varchar("resolution", { length: 50 }),
  uploadStatus: mysqlEnum("uploadStatus", ["uploading", "processing", "completed", "failed"]).default("uploading"),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  isPublic: boolean("isPublic").default(true),
  viewCount: int("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

// Scores for analyzed videos
export const scores = mysqlTable("scores", {
  id: serial("id").primaryKey(),
  videoId: bigint("videoId", { mode: "number", unsigned: true }).notNull(),
  overallScore: int("overallScore").notNull(),
  category: mysqlEnum("category", ["verified", "uncertain", "synthetic"]).notNull(),
  detectionScore: int("detectionScore").notNull(),
  c2paScore: int("c2paScore").notNull(),
  publisherScore: int("publisherScore").notNull(),
  c2paPresent: boolean("c2paPresent").default(false),
  detectionConfidence: decimal("detectionConfidence", { precision: 4, scale: 2 }).notNull(),
  processingTime: int("processingTime"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Score = typeof scores.$inferSelect;
export type InsertScore = typeof scores.$inferInsert;

// Publisher attestations
export const publisherAttestations = mysqlTable("publisher_attestations", {
  id: serial("id").primaryKey(),
  publisherName: varchar("publisherName", { length: 255 }).notNull(),
  publisherDomain: varchar("publisherDomain", { length: 255 }).notNull(),
  attestationType: mysqlEnum("attestationType", ["verified", "disputed", "retracted"]).notNull(),
  videoUrl: varchar("videoUrl", { length: 500 }),
  confidence: int("confidence").notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PublisherAttestation = typeof publisherAttestations.$inferSelect;
export type InsertPublisherAttestation = typeof publisherAttestations.$inferInsert;

// Comments on videos (public)
export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  videoId: bigint("videoId", { mode: "number", unsigned: true }).notNull(),
  authorName: varchar("authorName", { length: 100 }).notNull(),
  authorEmail: varchar("authorEmail", { length: 320 }),
  content: text("content").notNull(),
  isGlowFeedback: boolean("isGlowFeedback").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// Glow feedback (required after 3 video views)
export const glowFeedback = mysqlTable("glow_feedback", {
  id: serial("id").primaryKey(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  videoId: bigint("videoId", { mode: "number", unsigned: true }).notNull(),
  perceivedColor: varchar("perceivedColor", { length: 50 }).notNull(),
  accuracyRating: int("accuracyRating").notNull(),
  helpfulness: int("helpfulness").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GlowFeedback = typeof glowFeedback.$inferSelect;
export type InsertGlowFeedback = typeof glowFeedback.$inferInsert;

// Video views (for tracking the 3-video limit)
export const videoViews = mysqlTable("video_views", {
  id: serial("id").primaryKey(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  videoId: bigint("videoId", { mode: "number", unsigned: true }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VideoView = typeof videoViews.$inferSelect;
export type InsertVideoView = typeof videoViews.$inferInsert;
