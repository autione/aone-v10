CREATE TYPE "public"."post_visibility" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TABLE "invites" (
	"code" text PRIMARY KEY NOT NULL,
	"current_uses" integer NOT NULL,
	"max_uses" integer NOT NULL,
	"expires_at" timestamp with time zone,
	"issued_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"author_id" text NOT NULL,
	"thumbnail" text,
	"created_at" timestamp with time zone NOT NULL,
	"visibility" "post_visibility" DEFAULT 'public' NOT NULL,
	"collection" text,
	"pinned" boolean
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"flags" json DEFAULT '[]'::json NOT NULL,
	"avatar" text,
	"display_name" text NOT NULL,
	"username" text NOT NULL,
	"invite_code" text,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_issued_by_user_id_fk" FOREIGN KEY ("issued_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;