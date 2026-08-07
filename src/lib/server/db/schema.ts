import { relations } from "drizzle-orm";
import { pgTable, pgEnum, text, timestamp, integer, json, boolean } from "drizzle-orm/pg-core";

// these flags can be completely arbitrary strings in DB. they're only typed for convenience.
export type UserFlag = "invite-users" | "manage-users" | "manage-posts" | "manage-posts:all" | "manage-projects" | "account-protected" | "account-deactivated";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  flags: json("flags").$type<UserFlag[]>().notNull().default([]),

  avatar: text("avatar"),
  displayName: text("display_name").notNull(),
  username: text("username").notNull().unique(),

  inviteCode: text("invite_code")
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull()
});

export const postVisibility = pgEnum("post_visibility", ["public", "private"]);

export const post = pgTable("post", {
  id: text("id").primaryKey(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id),

  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),

  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  visibility: postVisibility("visibility").default("public").notNull(),
  pinned: boolean("pinned").notNull().default(false)
});

export const postsRelations = relations(post, ({ one }) => ({
  author: one(user, { fields: [post.authorId], references: [user.id] })
}));

export const inviteKey = pgTable("invites", {
  code: text("code").primaryKey(),
  currentUses: integer("current_uses").notNull(),
  maxUses: integer("max_uses").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
  issuedBy: text("issued_by").references(() => user.id)
});

type ProjectLink = { label: string; url: string };
type ProjectContributor = { name: string; role: string };

export const projectStatus = pgEnum("project_status", ["active", "developing", "paused", "deprecated"]);
export const projectCategory = pgEnum("project_category", ["games", "websites", "apps", "services", "other"]);

export const project = pgTable("projects", {
  id: text("id").primaryKey(),
  visible: boolean("visible").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),

  title: text("title").default("").notNull(),
  tagline: text("tagline").default("").notNull(),
  description: text("description").default("").notNull(),
  gallery: json("gallery").$type<string[]>().notNull().default([]),

  links: json("links").$type<ProjectLink[]>().notNull().default([]),
  timeframe: json("timeframe").$type<[number, number | true]>().notNull(),
  contributors: json("contributors").$type<ProjectContributor[]>().notNull().default([]),

  category: projectCategory("category").default("other").notNull(),
  status: projectStatus("status").default("deprecated").notNull()
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Post = typeof post.$inferSelect;
export type InviteKey = typeof inviteKey.$inferSelect;
export type Project = typeof project.$inferSelect;
