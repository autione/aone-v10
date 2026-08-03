import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  const results = await db.select().from(table.project).where(eq(table.project.id, event.params.id));
  const project = results.at(0);
  if (!project) return redirect(303, "/projects");

  return { project };
};
