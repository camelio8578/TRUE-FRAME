import { z } from "zod";
import { eq, desc, and } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { videos, scores } from "@db/schema";
import { TRPCError } from "@trpc/server";

export const videoRouter = createRouter({
  upload: publicQuery
    .input(
      z.object({
        fileName: z.string(),
        fileSize: z.number(),
        duration: z.number().optional(),
        resolution: z.string().optional(),
        userId: z.number().optional(),
        userType: z.enum(["oauth", "local"]).optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(videos).values({
        fileName: input.fileName,
        fileSize: input.fileSize,
        duration: input.duration,
        resolution: input.resolution,
        userId: input.userId,
        userType: input.userType || "oauth",
        title: input.title || input.fileName,
        description: input.description,
        isPublic: true,
        uploadStatus: "completed",
      });

      const videoId = Number(result[0].insertId);

      // Run simulated analysis
      const analysisResult = await db.insert(scores).values({
        videoId,
        overallScore: 0,
        category: "uncertain",
        detectionScore: 0,
        c2paScore: 0,
        publisherScore: 0,
        c2paPresent: false,
        detectionConfidence: "0",
      });

      const scoreId = Number(analysisResult[0].insertId);

      return { videoId, scoreId };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const videoResults = await db
        .select()
        .from(videos)
        .where(eq(videos.id, input.id))
        .limit(1);

      if (videoResults.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      const scoreResults = await db
        .select()
        .from(scores)
        .where(eq(scores.videoId, input.id))
        .limit(1);

      return {
        video: videoResults[0],
        score: scoreResults[0] || null,
      };
    }),

  list: publicQuery
    .input(
      z.object({
        userId: z.number().optional(),
        userType: z.enum(["oauth", "local"]).optional(),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();

      if (input.userId) {
        return db
          .select()
          .from(videos)
          .where(
            and(
              eq(videos.userId, input.userId),
              eq(videos.userType, input.userType || "oauth")
            )
          )
          .orderBy(desc(videos.createdAt))
          .limit(input.limit);
      }

      return db
        .select()
        .from(videos)
        .orderBy(desc(videos.createdAt))
        .limit(input.limit);
    }),

  listPublic: publicQuery
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit || 20;
      const videoList = await db
        .select()
        .from(videos)
        .where(eq(videos.isPublic, true))
        .orderBy(desc(videos.createdAt))
        .limit(limit);

      const results = [];
      for (const video of videoList) {
        const scoreResults = await db
          .select()
          .from(scores)
          .where(eq(scores.videoId, video.id))
          .limit(1);
        results.push({
          video,
          score: scoreResults[0] || null,
        });
      }
      return results;
    }),

  incrementViews: publicQuery
    .input(z.object({ videoId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const videoResults = await db
        .select()
        .from(videos)
        .where(eq(videos.id, input.videoId))
        .limit(1);
      if (videoResults.length > 0) {
        const currentViews = videoResults[0].viewCount || 0;
        await db
          .update(videos)
          .set({ viewCount: currentViews + 1 })
          .where(eq(videos.id, input.videoId));
      }
      return { success: true };
    }),

  analyze: publicQuery
    .input(z.object({ videoId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const startTime = Date.now();

      // Get video
      const videoResults = await db
        .select()
        .from(videos)
        .where(eq(videos.id, input.videoId))
        .limit(1);

      if (videoResults.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      const video = videoResults[0];

      // Simulated analysis - generate realistic scores
      // Use file metadata patterns to create deterministic but varied scores
      const fileSize = Number(video.fileSize);
      const nameHash = video.fileName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const seed = (fileSize + nameHash) % 100;

      // Layer 1: AI Detection Analysis (40% weight)
      // Higher scores = more likely authentic
      const hasSyntheticKeywords = /(sora|klings?|runway|deepfake|synthetic|ai.gen|generated)/i.test(video.fileName);
      const detectionBase = hasSyntheticKeywords ? 15 : 65;
      const detectionVariation = (seed % 30) - 15;
      const detectionScore = Math.max(0, Math.min(100, detectionBase + detectionVariation));

      // Layer 2: C2PA Provenance (45% weight)
      // 30% chance of having C2PA metadata in MVP
      const c2paPresent = (seed % 100) < 30;
      const c2paScore = c2paPresent ? Math.max(70, 85 + (seed % 15) - 7) : Math.max(5, 20 + (seed % 20));

      // Layer 3: Publisher Attestations (15% weight)
      // Most videos won't have attestations
      const hasAttestation = (seed % 100) < 15;
      const publisherScore = hasAttestation ? Math.max(60, 75 + (seed % 20) - 10) : Math.max(5, 15 + (seed % 15));

      // Weighted aggregation
      const overallScore = Math.round(
        detectionScore * 0.40 + c2paScore * 0.45 + publisherScore * 0.15
      );

      let category: "verified" | "uncertain" | "synthetic";
      if (overallScore >= 70) {
        category = "verified";
      } else if (overallScore >= 40) {
        category = "uncertain";
      } else {
        category = "synthetic";
      }

      const processingTime = Date.now() - startTime;

      // Update score
      await db
        .update(scores)
        .set({
          overallScore,
          category,
          detectionScore,
          c2paScore,
          publisherScore,
          c2paPresent,
          detectionConfidence: String(Math.round((detectionScore / 100) * 100) / 100),
          processingTime,
        })
        .where(eq(scores.videoId, input.videoId));

      // Update video status
      await db
        .update(videos)
        .set({ uploadStatus: "completed" })
        .where(eq(videos.id, input.videoId));

      return {
        overallScore,
        category,
        detectionScore,
        c2paScore,
        publisherScore,
        c2paPresent,
        detectionConfidence: Math.round((detectionScore / 100) * 100) / 100,
        processingTime,
      };
    }),
});
