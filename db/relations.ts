import { relations } from "drizzle-orm";
import { users, localUsers, videos, scores } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

export const localUsersRelations = relations(localUsers, ({ many }) => ({
  videos: many(videos),
}));

export const videosRelations = relations(videos, ({ one }) => ({
  score: one(scores, {
    fields: [videos.id],
    references: [scores.videoId],
  }),
}));

export const scoresRelations = relations(scores, ({ one }) => ({
  video: one(videos, {
    fields: [scores.videoId],
    references: [videos.id],
  }),
}));
