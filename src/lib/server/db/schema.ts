import { relations } from "drizzle-orm";
import { pgTable, pgEnum, text, timestamp, integer, json, boolean } from "drizzle-orm/pg-core";

export type UserFlag = "admin" | "deactivated";

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
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id),

  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
  visibility: postVisibility("visibility").default("public").notNull(),

  collection: text("collection"),
  pinned: boolean("pinned")
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

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Post = typeof post.$inferSelect;
export type InviteKey = typeof inviteKey.$inferSelect;
