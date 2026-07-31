CREATE TYPE "public"."project_status" AS ENUM('active', 'developing', 'paused', 'deprecated');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"tagline" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"links" json DEFAULT '[]'::json NOT NULL,
	"timeframe" json NOT NULL,
	"category" text DEFAULT '' NOT NULL,
	"status" "project_status" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "pinned" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "pinned" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN "collection";