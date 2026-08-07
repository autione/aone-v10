import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  if (!user) return fail(401);
  if (!user.flags.includes("manage-users")) return fail(403);

  const users = await db.query.user.findMany({
    columns: { passwordHash: false },
    orderBy: (user, { asc }) => [asc(user.username)]
  });

  const invites = await db.query.inviteKey.findMany({
    orderBy: (user, { desc }) => [desc(user.expiresAt)]
  });

  return {
    users,
    invites
  };
};

export const actions: Actions = {
  newInvite: async (event) => {
    const user = event.locals.user;
    if (!user) return fail(401);
    if (!user.flags.includes("invite-users")) return fail(403);

    const formData = await event.request.formData();

    const maxUses = Number(formData.get("maxUses"));
    if (typeof maxUses !== "number" || maxUses < 1) return fail(400, { error: "InvalidLimit" });

    const rawExpiration = formData.get("expiresAt") as string;
    if (typeof rawExpiration !== "string") return fail(400, { error: "InvalidExpiration" });

    const expiresAt = new Date(rawExpiration);
    if (isNaN(expiresAt.getTime())) return fail(400, { error: "InvalidExpiration" });

    const rnd = Date.now() / 1000 + Math.floor(Math.random() * 999999 + 1);
    const code = `${user.username[0]}${user.id.substring(0, 5)}-${rnd.toString(32).substring(0, 6)}`.toUpperCase();

    await db.insert(table.inviteKey).values({
      code,
      maxUses,
      expiresAt,
      currentUses: 0,
      issuedBy: user.id
    });
  }
};
