import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { videoRouter } from "./video-router";
import { scoreRouter } from "./score-router";
import { publisherRouter } from "./publisher-router";
import { financialRouter } from "./financial-router";
import { commentRouter } from "./comment-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  video: videoRouter,
  score: scoreRouter,
  publisher: publisherRouter,
  financial: financialRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
