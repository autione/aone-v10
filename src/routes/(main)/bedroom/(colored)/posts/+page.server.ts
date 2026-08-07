import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import * as table from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { and, eq, ilike } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) return fail(401);

  const query = event.url.searchParams.get("q") || "";
  const visibility = (event.url.searchParams.get("v") || "all") as "all" | "public" | "private";

  let pageNum = Math.max(1, Number(event.url.searchParams.get("p")) || 1);
  const sort = event.url.searchParams.get("s") || "latest";

  const filter = and(query ? ilike(table.post.title, `%${query}%`) : undefined, visibility !== "all" ? eq(table.post.visibility, visibility) : undefined);
  const count = await db.$count(table.post, filter);

  const maxPages = Math.ceil(count / 10);
  if (pageNum > maxPages) pageNum = maxPages;

  const posts = await db.query.post.findMany({
    with: {
      author: {
        columns: {
          id: true,
          avatar: true,
          displayName: true,
          username: true
        }
      }
    },

    columns: {
      content: false,
      authorId: false
    },

    limit: 10,
    offset: 10 * (pageNum - 1),
    where: filter,
    orderBy: (posts, { asc, desc }) => [desc(posts.pinned), (sort === "latest" ? desc : asc)(posts.createdAt)]
  });

  return {
    query: {
      term: query,
      visibility,
      sort,

      page: pageNum,
      maxPages,

      total: count,
      returned: posts.length
    },
    posts
  };
};

export const actions: Actions = {
  create: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("manage-posts")) return fail(403);

    const formData = await event.request.formData();
    const id = formData.get("id") as string;

    if (typeof id !== "string" || id.length < 1) return fail(400, { error: "InvalidSlug" });

    await db.insert(table.post).values({
      id,
      title: "Untitled Draft",
      content: "",
      createdAt: new Date(),
      visibility: "private",
      authorId: user.id
    });

    return redirect(303, `/bedroom/posts/${id}`);
  }
};
