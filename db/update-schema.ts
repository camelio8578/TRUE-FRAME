import { getDb } from "../api/queries/connection";
import { sql } from "drizzle-orm";

async function main() {
  const db = getDb();

  // Create comments table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS comments (
      id serial AUTO_INCREMENT PRIMARY KEY,
      videoId bigint unsigned NOT NULL,
      authorName varchar(100) NOT NULL,
      authorEmail varchar(320),
      content text NOT NULL,
      isGlowFeedback boolean DEFAULT false,
      createdAt timestamp DEFAULT now()
    )
  `);

  // Create glow_feedback table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS glow_feedback (
      id serial AUTO_INCREMENT PRIMARY KEY,
      sessionId varchar(255) NOT NULL,
      videoId bigint unsigned NOT NULL,
      perceivedColor varchar(50) NOT NULL,
      accuracyRating int NOT NULL,
      helpfulness int NOT NULL,
      notes text,
      createdAt timestamp DEFAULT now()
    )
  `);

  // Create video_views table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS video_views (
      id serial AUTO_INCREMENT PRIMARY KEY,
      sessionId varchar(255) NOT NULL,
      videoId bigint unsigned NOT NULL,
      createdAt timestamp DEFAULT now()
    )
  `);

  // Add columns to videos table
  try {
    await db.execute(sql`ALTER TABLE videos ADD COLUMN title varchar(255)`);
  } catch { /* exists */ }
  try {
    await db.execute(sql`ALTER TABLE videos ADD COLUMN description text`);
  } catch { /* exists */ }
  try {
    await db.execute(sql`ALTER TABLE videos ADD COLUMN isPublic boolean DEFAULT true`);
  } catch { /* exists */ }
  try {
    await db.execute(sql`ALTER TABLE videos ADD COLUMN viewCount int DEFAULT 0`);
  } catch { /* exists */ }

  console.log("Schema updated successfully");
}

main().catch(console.error);
