CREATE TABLE `comments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`videoId` bigint unsigned NOT NULL,
	`authorName` varchar(100) NOT NULL,
	`authorEmail` varchar(320),
	`content` text NOT NULL,
	`isGlowFeedback` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `glow_feedback` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(255) NOT NULL,
	`videoId` bigint unsigned NOT NULL,
	`perceivedColor` varchar(50) NOT NULL,
	`accuracyRating` int NOT NULL,
	`helpfulness` int NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `glow_feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `local_users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`displayName` varchar(255),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `local_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `local_users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `publisher_attestations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`publisherName` varchar(255) NOT NULL,
	`publisherDomain` varchar(255) NOT NULL,
	`attestationType` enum('verified','disputed','retracted') NOT NULL,
	`videoUrl` varchar(500),
	`confidence` int NOT NULL,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `publisher_attestations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`videoId` bigint unsigned NOT NULL,
	`overallScore` int NOT NULL,
	`category` enum('verified','uncertain','synthetic') NOT NULL,
	`detectionScore` int NOT NULL,
	`c2paScore` int NOT NULL,
	`publisherScore` int NOT NULL,
	`c2paPresent` boolean DEFAULT false,
	`detectionConfidence` decimal(4,2) NOT NULL,
	`processingTime` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`avatar` text,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
--> statement-breakpoint
CREATE TABLE `video_views` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(255) NOT NULL,
	`videoId` bigint unsigned NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `video_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned,
	`userType` enum('oauth','local') DEFAULT 'oauth',
	`fileName` varchar(255) NOT NULL,
	`fileSize` bigint NOT NULL,
	`duration` int,
	`resolution` varchar(50),
	`uploadStatus` enum('uploading','processing','completed','failed') DEFAULT 'uploading',
	`title` varchar(255),
	`description` text,
	`isPublic` boolean DEFAULT true,
	`viewCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
