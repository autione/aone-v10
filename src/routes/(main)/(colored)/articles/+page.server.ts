import type { PageServerLoad } from "./$types";

import * as table from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { and, eq, ilike } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const query = event.url.searchParams.get("q") || "";

  let pageNum = Math.max(1, Number(event.url.searchParams.get("p")) || 1);
  const sort = event.url.searchParams.get("s") || "latest";

  const filter = and(query ? ilike(table.post.title, `%${query}%`) : undefined, eq(table.post.visibility, "public"));
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
      sort,

      page: pageNum,
      maxPages,

      total: count,
      returned: posts.length
    },
    posts
  };
};
