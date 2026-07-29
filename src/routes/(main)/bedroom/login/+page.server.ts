import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

import { db } from "$lib/server/db";
import * as auth from "$lib/server/auth";
import * as table from "$lib/server/db/schema";
import validators from "$lib/server/validators";

import { eq, or } from "drizzle-orm";
import { hash, verify } from "@node-rs/argon2";
import { encodeHexLowerCase } from "@oslojs/encoding";

export const actions: Actions = {
  login: async (event) => {
    const formData = await event.request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!validators.userEmail.safeParse(email).success) return fail(400, { error: "MalformedEmail" });
    if (!validators.userPassword.safeParse(password).success) return fail(400, { error: "MalformedPassword" });

    const results = await db.select().from(table.user).where(eq(table.user.email, email));

    const existingUser = results.at(0);
    if (!existingUser) return fail(400, { error: "InvalidCredentials" });

    const validPassword = await verify(existingUser.passwordHash, password, auth.hashOptions);
    if (!validPassword) return fail(400, { error: "InvalidCredentials" });

    if (existingUser.flags.includes("deactivated")) return redirect(303, "/bedroom/deactivated");

    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(sessionToken, existingUser.id);
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

    return redirect(302, "/bedroom");
  },

  //---//

  register: async (event) => {
    const formData = await event.request.formData();

    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const inviteCode = formData.get("inviteCode") as string;

    let usedKey: table.InviteKey | null = null;

    if (validators.inviteCode.safeParse(inviteCode).success) {
      const inviteResults = await db.select().from(table.inviteKey).where(eq(table.inviteKey.code, inviteCode));
      const inviteKey = inviteResults.at(0);

      if (!inviteKey) return fail(400, { error: "InvalidInviteCode" });
      if (inviteKey.currentUses >= inviteKey.maxUses) return fail(400, { error: "ExpiredInviteCode" });

      if (inviteKey.expiresAt) {
        const now = new Date();
        if (now.getTime() > inviteKey.expiresAt.getTime()) return fail(400, { error: "ExpiredInviteCode" });
      }

      usedKey = inviteKey;
    } else return fail(400, { error: "MalformedInviteCode" });

    if (!validators.userEmail.safeParse(email).success) return fail(400, { error: "MalformedEmail" });
    if (!validators.userName.safeParse(username).success) return fail(400, { error: "MalformedUsername" });
    if (!validators.userPassword.safeParse(password).success) return fail(400, { error: "MalformedPassword" });
    if (confirmPassword !== password) return fail(400, { error: "InvalidPasswordMatching" });

    const results = await db
      .select()
      .from(table.user)
      .where(or(eq(table.user.email, email), eq(table.user.username, username)));

    const existingUser = results.at(0);
    if (existingUser) return fail(400, { error: "UserAlreadyExists" });

    const userId = generateUserId();
    const passwordHash = await hash(password, auth.hashOptions);

    try {
      await db.insert(table.user).values({
        id: userId,
        email,
        username,
        displayName: username,
        passwordHash,
        inviteCode: usedKey.code
      });

      await db
        .update(table.inviteKey)
        .set({ currentUses: usedKey.currentUses + 1 })
        .where(eq(table.inviteKey.code, usedKey.code));

      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, userId);
      auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (err) {
      console.error(err);
      return fail(500, { error: "InternalError" });
    }

    return redirect(302, "/bedroom");
  }
};

function generateUserId() {
  // ID with 120 bits of entropy, or about the same as UUID v4.
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const id = encodeHexLowerCase(bytes);
  return id;
}
