import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) return fail(401);

  const results = await db.select().from(table.post).where(eq(table.post.id, event.params.id));
  const post = results.at(0);
  if (!post) return redirect(303, "/bedroom/posts");

  return { post };
};

export const actions: Actions = {
  save: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);

    const post = (await db.select().from(table.post).where(eq(table.post.id, event.params.id))).at(0);
    if (!post) return fail(404, { error: "PostNotFound", message: "Post not found" });

    const canEdit = user.flags.includes("manage-posts:all") || (user.flags.includes("manage-posts") && post.authorId === user.id);
    if (!canEdit) return fail(403);

    const formData = await event.request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const visibility = formData.get("visibility") as string;
    const thumbnail = formData.get("thumbnail") as string;
    const pinned = formData.get("pinned") as string;

    if (typeof title !== "string") return fail(400, { error: "InvalidTitle" });
    if (typeof description !== "string") return fail(400, { error: "InvalidDescription" });
    if (typeof content !== "string") return fail(400, { error: "InvalidContent" });

    if (typeof thumbnail !== "string") return fail(400, { error: "InvalidThumbnail" });
    if (typeof visibility !== "string" || (visibility !== "public" && visibility !== "private")) return fail(400, { error: "InvalidVisibility" });
    if (typeof pinned !== "string" || (pinned !== "true" && pinned !== "false")) return fail(400, { error: "InvalidPinned" });

    return {
      post: await db
        .update(table.post)
        .set({
          title,
          description,
          content,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          visibility,
          pinned: pinned == "true"
        })
        .where(eq(table.post.id, event.params.id))
        .returning()
    };
  },
  delete: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);

    const post = (await db.select().from(table.post).where(eq(table.post.id, event.params.id))).at(0);
    if (!post) return fail(404, { error: "PostNotFound", message: "Post not found" });

    const canDelete = user.flags.includes("manage-posts:all") || (user.flags.includes("manage-posts") && post.authorId === user.id);
    if (!canDelete) return fail(403);

    await db.delete(table.post).where(eq(table.post.id, event.params.id));
    return redirect(303, "/bedroom/posts");
  }
};
