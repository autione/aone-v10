import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const onAuth = event.url.pathname === "/bedroom/login" || event.url.pathname === "/bedroom/deactivated";
  if (!event.locals.user && !onAuth) return redirect(302, "/bedroom/login");
  if (event.locals.user && onAuth) return redirect(302, "/bedroom");

  return { user: event.locals.user };
};
