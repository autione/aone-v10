import { redirect } from "@sveltejs/kit";
import * as auth from "$lib/server/auth";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const onAuth = event.url.pathname === "/bedroom/login" || event.url.pathname === "/bedroom/deactivated";
  if (!event.locals.user && !onAuth) return redirect(302, "/bedroom/login");

  if (event.locals.user) {
    if (event.locals.session && event.locals.user.flags.includes("deactivated")) {
      await auth.invalidateSession(event.locals.session.id);
      auth.deleteSessionTokenCookie(event);

      return redirect(302, "/bedroom/deactivated");
    }

    if (onAuth) return redirect(302, "/bedroom");
  }

  return { user: event.locals.user };
};
