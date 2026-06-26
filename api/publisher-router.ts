import { z } from "zod";
import { desc, like } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { publisherAttestations } from "@db/schema";

export const publisherRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select()
      .from(publisherAttestations)
      .orderBy(desc(publisherAttestations.createdAt));
    return results;
  }),

  getAttestations: publicQuery
    .input(z.object({ domain: z.string() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.domain) {
        return db
          .select()
          .from(publisherAttestations)
          .where(like(publisherAttestations.publisherDomain, `%${input.domain}%`))
          .orderBy(desc(publisherAttestations.createdAt));
      }
      return db
        .select()
        .from(publisherAttestations)
        .orderBy(desc(publisherAttestations.createdAt));
    }),

  seed: publicQuery.mutation(async () => {
    const db = getDb();

    const existing = await db.select().from(publisherAttestations).limit(1);
    if (existing.length > 0) {
      return { seeded: false, message: "Already seeded" };
    }

    const seedData = [
      {
        publisherName: "Reuters",
        publisherDomain: "reuters.com",
        attestationType: "verified" as const,
        videoUrl: "https://reuters.com/video/election-coverage-2026",
        confidence: 95,
      },
      {
        publisherName: "BBC News",
        publisherDomain: "bbc.com",
        attestationType: "verified" as const,
        videoUrl: "https://bbc.com/news/video/world-2026",
        confidence: 92,
      },
      {
        publisherName: "Associated Press",
        publisherDomain: "apnews.com",
        attestationType: "verified" as const,
        videoUrl: "https://apnews.com/article/video-12345",
        confidence: 94,
      },
      {
        publisherName: "The Guardian",
        publisherDomain: "theguardian.com",
        attestationType: "verified" as const,
        videoUrl: "https://theguardian.com/world/video/2026",
        confidence: 88,
      },
      {
        publisherName: "Unknown Channel X",
        publisherDomain: "channelx-unknown.com",
        attestationType: "disputed" as const,
        videoUrl: "https://channelx-unknown.com/video/claim-123",
        confidence: 35,
      },
      {
        publisherName: "National Geographic",
        publisherDomain: "nationalgeographic.com",
        attestationType: "verified" as const,
        videoUrl: "https://nationalgeographic.com/video/wildlife-2026",
        confidence: 90,
      },
      {
        publisherName: "CNN",
        publisherDomain: "cnn.com",
        attestationType: "verified" as const,
        videoUrl: "https://cnn.com/video/politics/2026",
        confidence: 85,
      },
      {
        publisherName: "Deepfake News Network",
        publisherDomain: "dfnn-fake.com",
        attestationType: "retracted" as const,
        videoUrl: "https://dfnn-fake.com/video/fake-news-456",
        confidence: 8,
      },
    ];

    for (const data of seedData) {
      await db.insert(publisherAttestations).values(data);
    }

    return { seeded: true, count: seedData.length };
  }),
});
