import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { TRPCError } from "@trpc/server";

const JWT_SECRET = process.env.JWT_SECRET || "trueframe-local-auth-secret-key-2026";

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(6).max(100),
        displayName: z.string().min(1).max(100).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);
      const result = await db.insert(localUsers).values({
        username: input.username,
        passwordHash,
        displayName: input.displayName || input.username,
      });

      const token = jwt.sign(
        { userId: Number(result[0].insertId), type: "local" },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      return { token, userId: Number(result[0].insertId) };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (results.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const user = results[0];
      const valid = await bcrypt.compare(input.password, user.passwordHash);

      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const token = jwt.sign(
        { userId: user.id, type: "local" },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      return { token, userId: user.id };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const authHeader = ctx.req.headers.get("x-local-auth-token");
    if (!authHeader) {
      return null;
    }

    try {
      const decoded = jwt.verify(authHeader, JWT_SECRET) as {
        userId: number;
        type: string;
      };

      if (decoded.type !== "local") {
        return null;
      }

      const db = getDb();
      const results = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.id, decoded.userId))
        .limit(1);

      if (results.length === 0) {
        return null;
      }

      const user = results[0];
      return {
        id: user.id,
        name: user.displayName || user.username,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      };
    } catch {
      return null;
    }
  }),
});
