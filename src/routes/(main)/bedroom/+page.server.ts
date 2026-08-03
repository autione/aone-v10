import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import * as auth from "$lib/server/auth";
import * as table from "$lib/server/db/schema";
import validators from "$lib/server/validators";

import { eq } from "drizzle-orm";
import { hash, verify } from "@node-rs/argon2";

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) return fail(401);

    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, "/bedroom/login");
  },

  changePassword: async (event) => {
    if (!event.locals.session || !event.locals.user) return fail(401);
    const formData = await event.request.formData();

    const currentPassword = formData.get("current-password") as string;
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (!validators.userPassword.safeParse(currentPassword).success) return fail(400, { error: "MalformedCurrentPassword" });
    if (!validators.userPassword.safeParse(newPassword).success) return fail(400, { error: "MalformedNewPassword" });
    if (confirmPassword !== newPassword) return fail(400, { error: "InvalidPasswordMatching" });

    const [existingUser] = await db.select().from(table.user).where(eq(table.user.id, event.locals.user.id));

    const validPassword = await verify(existingUser.passwordHash, currentPassword, auth.hashOptions);
    if (!validPassword) return fail(400, { error: "InvalidCredentials" });

    const passwordHash = await hash(newPassword, auth.hashOptions);

    try {
      await db.update(table.user).set({ passwordHash }).where(eq(table.user.id, existingUser.id));
    } catch (err) {
      console.error(err);
      return fail(500, { error: "InternalError" });
    }
  },

  updateUser: async (event) => {
    if (!event.locals.session || !event.locals.user) return fail(401);
    const formData = await event.request.formData();

    const email = formData.get("email") as string;
    const displayName = formData.get("displayName") as string;
    const username = formData.get("username") as string;
    const avatar = formData.get("avatar") as string;

    if (!validators.userEmail.safeParse(email).success) return fail(400, { error: "MalformedEmail" });
    if (!validators.userDisplayName.safeParse(displayName).success) return fail(400, { error: "MalformedDisplayName" });
    if (!validators.userName.safeParse(username).success) return fail(400, { error: "MalformedUsername" });
    if (avatar.length > 0 && !validators.userAvatar.safeParse(avatar).success) return fail(400, { error: "MalformedAvatarURL" });

    const cdnMatch = "files.auti.one/user-avatars";
    if (!avatar.match(cdnMatch)) {
      const current = event.locals.user.avatar || "";
      const path = `user-avatars/${event.locals.user.id}`;

      if (current.match(cdnMatch) && current.endsWith(path)) {
        try {
          await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCID}/r2/buckets/autione-primary/objects/${path}`, {
            method: "DELETE",
            headers: [["Authorization", `Bearer ${env.CLOUDFLARE_USER_TOKEN}`]]
          });

          console.log("Removed old avatar object from storage");
        } catch (error) {
          console.warn("Failed to remove old avatar object:", error);
        }
      }
    }

    await db.update(table.user).set({ email, displayName, username, avatar }).where(eq(table.user.id, event.locals.user.id));
  },

  uploadAvatar: async (event) => {
    if (!event.locals.session || !event.locals.user) return fail(401);
    const formData = await event.request.formData();

    const file = formData.get("file") as File;
    if (!file) return fail(400, { error: "InvalidFile" });

    const path = `user-avatars/${event.locals.user.id}`;

    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCID}/r2/buckets/autione-primary/objects/${path}`;
      const auth: [string, string] = ["Authorization", `Bearer ${env.CLOUDFLARE_USER_TOKEN}`];

      // check if object already exists
      const res = await fetch(url, { method: "GET", headers: [auth] });
      if (res.status !== 404) await fetch(url, { method: "DELETE", headers: [auth] });

      try {
        // upload avatar
        const upload = await fetch(url, {
          method: "PUT",
          headers: [["Content-Type", file.type], auth],
          body: await file.arrayBuffer()
        });

        const data = await upload.json();
        if (!data.success) throw new Error(JSON.stringify(data));

        // change avatar url in db
        await db
          .update(table.user)
          .set({ avatar: `https://files.auti.one/${path}` })
          .where(eq(table.user.id, event.locals.user.id));
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
