import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { comments, glowFeedback, videoViews } from "@db/schema";

export const commentRouter = createRouter({
  list: publicQuery
    .input(z.object({ videoId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(comments)
        .where(eq(comments.videoId, input.videoId))
        .orderBy(desc(comments.createdAt));
    }),

  create: publicQuery
    .input(
      z.object({
        videoId: z.number(),
        authorName: z.string().min(1).max(100),
        authorEmail: z.string().email().optional(),
        content: z.string().min(1).max(2000),
        isGlowFeedback: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(comments).values({
        videoId: input.videoId,
        authorName: input.authorName,
        authorEmail: input.authorEmail,
        content: input.content,
        isGlowFeedback: input.isGlowFeedback || false,
      });
      return { id: Number(result[0].insertId) };
    }),

  submitGlowFeedback: publicQuery
    .input(
      z.object({
        sessionId: z.string(),
        videoId: z.number(),
        perceivedColor: z.string(),
        accuracyRating: z.number().min(1).max(5),
        helpfulness: z.number().min(1).max(5),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(glowFeedback).values({
        sessionId: input.sessionId,
        videoId: input.videoId,
        perceivedColor: input.perceivedColor,
        accuracyRating: input.accuracyRating,
        helpfulness: input.helpfulness,
        notes: input.notes,
      });
      return { id: Number(result[0].insertId) };
    }),

  hasSubmittedFeedback: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(glowFeedback)
        .where(eq(glowFeedback.sessionId, input.sessionId))
        .limit(1);
      return results.length > 0;
    }),

  trackView: publicQuery
    .input(z.object({ sessionId: z.string(), videoId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(videoViews).values({
        sessionId: input.sessionId,
        videoId: input.videoId,
      });
      return { success: true };
    }),

  getViewCount: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(videoViews)
        .where(eq(videoViews.sessionId, input.sessionId));
      return results.length;
    }),

  getFeedbackStats: publicQuery.query(async () => {
    const db = getDb();
    const allFeedback = await db.select().from(glowFeedback);
    const allComments = await db
      .select()
      .from(comments)
      .where(eq(comments.isGlowFeedback, true));
    return {
      totalFeedback: allFeedback.length,
      totalGlowComments: allComments.length,
      avgAccuracy: allFeedback.length > 0
        ? (allFeedback.reduce((a, f) => a + f.accuracyRating, 0) / allFeedback.length).toFixed(1)
        : "0",
      avgHelpfulness: allFeedback.length > 0
        ? (allFeedback.reduce((a, f) => a + f.helpfulness, 0) / allFeedback.length).toFixed(1)
        : "0",
    };
  }),
});
