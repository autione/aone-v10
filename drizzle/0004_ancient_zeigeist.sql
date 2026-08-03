CREATE TYPE "public"."project_category" AS ENUM('games', 'websites', 'apps', 'services', 'other');--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "category" SET DATA TYPE project_category;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "category" SET DEFAULT 'other';--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'deprecated';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "visible" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;