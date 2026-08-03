/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import * as table from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { and, eq, ilike } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) return fail(401);

  const query = event.url.searchParams.get("q") || "";
  const category = (event.url.searchParams.get("c") || "all") as "all" | string;
  const status = (event.url.searchParams.get("s") || "all") as "all" | string;

  const filter = and(
    query ? ilike(table.project.title, `%${query}%`) : undefined,
    category !== "all" ? eq(table.project.category, category as any) : undefined,
    status !== "all" ? eq(table.project.status, status as any) : undefined
  );

  const projects = await db.query.project.findMany({
    columns: {
      description: false
    },
    where: filter,
    orderBy: (projects, { desc }) => [desc(projects.title)]
  });

  return {
    query: {
      term: query,
      category,
      status
    },
    projects
  };
};

export const actions: Actions = {
  create: async (event) => {
    if (!event.locals.user) return fail(401);

    const formData = await event.request.formData();
    const id = formData.get("id") as string;

    if (typeof id !== "string" || id.length < 1) return fail(400, { error: "InvalidSlug" });

    await db.insert(table.project).values({
      id,
      visible: false,
      title: "Untitled Project",
      timeframe: [new Date().getFullYear(), true]
    });

    return redirect(303, `/bedroom/projects/${id}`);
  }
};
