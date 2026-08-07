/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) return fail(401);

  const results = await db.select().from(table.project).where(eq(table.project.id, event.params.id));
  const project = results.at(0);
  if (!project) return redirect(303, "/bedroom/projects");

  return { project };
};

export const actions: Actions = {
  save: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("manage-projects")) return fail(403);

    const formData = await event.request.formData();

    const title = formData.get("title") as string;
    const tagline = formData.get("tagline") as string;
    const description = formData.get("description") as string;

    const contributors = formData.get("contributors") as string;
    const timeframe = formData.get("timeframe") as string;
    const gallery = formData.get("gallery") as string;
    const links = formData.get("links") as string;

    const category = formData.get("category") as string;
    const status = formData.get("status") as string;

    const featured = formData.get("featured") as string;
    const visible = formData.get("visible") as string;

    if (typeof title !== "string") return fail(400, { error: "InvalidTitle" });
    if (typeof tagline !== "string") return fail(400, { error: "InvalidTagline" });
    if (typeof description !== "string") return fail(400, { error: "InvalidDescription" });

    if (typeof contributors !== "string") return fail(400, { error: "InvalidContributors" });
    if (typeof timeframe !== "string") return fail(400, { error: "InvalidTimeframe" });
    if (typeof gallery !== "string") return fail(400, { error: "InvalidGallery" });
    if (typeof links !== "string") return fail(400, { error: "InvalidLinks" });

    if (typeof category !== "string") return fail(400, { error: "InvalidCategory" });
    if (typeof status !== "string") return fail(400, { error: "InvalidStatus" });

    if (typeof featured !== "string" || (featured !== "true" && featured !== "false")) return fail(400, { error: "InvalidFeatured" });
    if (typeof visible !== "string" || (visible !== "true" && visible !== "false")) return fail(400, { error: "InvalidVisible" });

    return {
      project: await db
        .update(table.project)
        .set({
          title,
          tagline,
          description,

          contributors: JSON.parse(contributors),
          timeframe: JSON.parse(timeframe),
          gallery: JSON.parse(gallery),
          links: JSON.parse(links),

          category: category as any,
          status: status as any,

          featured: featured == "true",
          visible: visible == "true"
        })
        .where(eq(table.project.id, event.params.id))
        .returning()
    };
  },

  delete: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("manage-projects")) return fail(403);

    await db.delete(table.project).where(eq(table.project.id, event.params.id));

    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCID}/r2/buckets/autione-primary/objects/project-icons/${event.params.id}`;
      const auth: [string, string] = ["Authorization", `Bearer ${env.CLOUDFLARE_USER_TOKEN}`];

      const res = await fetch(url, { method: "GET", headers: [auth] });
      if (res.status !== 404) await fetch(url, { method: "DELETE", headers: [auth] });
    } catch (error) {
      console.warn("Failed to remove unused project icon:", error);
    }

    return redirect(303, "/bedroom/projects");
  },

  uploadIcon: async (event) => {
    if (!event.locals.session || !event.locals.user) return fail(401);
    const formData = await event.request.formData();

    const file = formData.get("file") as File;
    if (!file) return fail(400, { error: "InvalidFile" });

    const path = `project-icons/${event.params.id}`;

    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCID}/r2/buckets/autione-primary/objects/${path}`;
      const auth: [string, string] = ["Authorization", `Bearer ${env.CLOUDFLARE_USER_TOKEN}`];

      // check if object already exists
      const res = await fetch(url, { method: "GET", headers: [auth] });
      if (res.status !== 404) await fetch(url, { method: "DELETE", headers: [auth] });

      try {
        // upload icon
        const upload = await fetch(url, {
          method: "PUT",
          headers: [["Content-Type", file.type], auth],
          body: await file.arrayBuffer()
        });

        const data = await upload.json();
        if (!data.success) throw new Error(JSON.stringify(data));
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        return fail(500, { error: "UploadError" });
      }
    } catch (error) {
      console.error("Failed to check/overwrite existing object:", error);
      return fail(500, { error: "InternalError" });
    }
  }
};
