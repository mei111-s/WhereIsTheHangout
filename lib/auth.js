import { cookies } from "next/headers";

const COOKIE_NAME = "mds_admin";

export function isAuthed() {
  const cookieStore = cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  return Boolean(value) && value === process.env.ADMIN_PASSWORD;
}

export function requireAuth() {
  if (!isAuthed()) {
    const err = new Error("Not authorized");
    err.status = 401;
    throw err;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
