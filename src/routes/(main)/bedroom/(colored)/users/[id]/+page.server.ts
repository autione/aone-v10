import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) return fail(401);

  const target = await db.query.user.findFirst({
    where: eq(table.user.id, event.params.id),
    columns: {
      passwordHash: false
    }
  });

  if (!target) return redirect(303, "/bedroom/users");
  return { target };
};

export const actions: Actions = {
  resetProfile: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("manage-users")) return fail(403);

    const filter = eq(table.user.id, event.params.id);
    const target = (await db.select().from(table.user).where(filter)).at(0);
    if (!target) return fail(404, { error: "UserNotFound" });

    const username = `user-${target.id}`;

    await db
      .update(table.user)
      .set({
        username,
        displayName: username,
        avatar: null
      })
      .where(filter);
  },

  deactivateAccount: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("manage-users")) return fail(403);

    const filter = eq(table.user.id, event.params.id);
    const target = (await db.select().from(table.user).where(filter)).at(0);
    if (!target) return fail(404, { error: "UserNotFound" });

    let { flags } = target;

    if (flags.includes("account-deactivated")) flags = flags.filter((f) => f !== "account-deactivated");
    else flags.push("account-deactivated");

    await db.update(table.user).set({ flags }).where(filter);
  },

  writeFlags: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("manage-users")) return fail(403);

    const formData = await event.request.formData();

    const flags = formData.get("flags") as string;
    if (typeof flags !== "string") return fail(400, { error: "InvalidFlags" });

    await db
      .update(table.user)
      .set({ flags: JSON.parse(flags) })
      .where(eq(table.user.id, event.params.id));
  }
};
