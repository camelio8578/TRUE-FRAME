import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { scores, videos } from "@db/schema";

export const scoreRouter = createRouter({
  getByVideoId: publicQuery
    .input(z.object({ videoId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(scores)
        .where(eq(scores.videoId, input.videoId))
        .limit(1);

      return results[0] || null;
    }),

  getStats: publicQuery.query(async () => {
    const db = getDb();
    const allScores = await db.select().from(scores);

    const total = allScores.length;
    if (total === 0) {
      return {
        totalAnalyzed: 0,
        averageScore: 0,
        verifiedCount: 0,
        uncertainCount: 0,
        syntheticCount: 0,
        c2paCoverage: 0,
      };
    }

    const sum = allScores.reduce((a, s) => a + s.overallScore, 0);
    const verifiedCount = allScores.filter((s) => s.category === "verified").length;
    const uncertainCount = allScores.filter((s) => s.category === "uncertain").length;
    const syntheticCount = allScores.filter((s) => s.category === "synthetic").length;
    const c2paCount = allScores.filter((s) => s.c2paPresent).length;

    return {
      totalAnalyzed: total,
      averageScore: Math.round(sum / total),
      verifiedCount,
      uncertainCount,
      syntheticCount,
      c2paCoverage: Math.round((c2paCount / total) * 100),
    };
  }),

  listRecent: publicQuery
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit || 10;

      const results = await db
        .select({
          score: scores,
          video: videos,
        })
        .from(scores)
        .innerJoin(videos, eq(scores.videoId, videos.id))
        .orderBy(desc(scores.createdAt))
        .limit(limit);

      return results.map((r) => ({
        id: r.score.id,
        videoId: r.score.videoId,
        fileName: r.video.fileName,
        overallScore: r.score.overallScore,
        category: r.score.category,
        detectionScore: r.score.detectionScore,
        c2paScore: r.score.c2paScore,
        publisherScore: r.score.publisherScore,
        c2paPresent: r.score.c2paPresent,
        detectionConfidence: r.score.detectionConfidence,
        processingTime: r.score.processingTime,
        createdAt: r.score.createdAt,
      }));
    }),
});
