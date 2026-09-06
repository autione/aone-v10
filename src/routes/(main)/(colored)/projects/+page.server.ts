/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PageServerLoad } from "./$types";

import * as table from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { and, eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const category = (event.url.searchParams.get("c") || "all") as "all" | string;

  const filter = and(category !== "all" ? eq(table.project.category, category as any) : undefined, eq(table.project.visible, true));

  const projects = await db.query.project.findMany({
    columns: {
      description: false,
      visible: false
    },
    where: filter,
    orderBy: (projects, { asc }) => [asc(projects.status), asc(projects.id)]
  });

  return {
    category,
    projects
  };
};
