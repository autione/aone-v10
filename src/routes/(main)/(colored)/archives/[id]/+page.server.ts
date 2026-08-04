import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const post = await db.query.post.findFirst({
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
    where: eq(table.post.id, event.params.id)
  });

  if (!post) return redirect(303, "/archives");

  return { post };
};
