import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken } from "./auth";

// Read the current user from the session cookie (server components / route handlers).
// Returns the JWT payload { id, role, name, email } or null.
export async function getCurrentUser() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}
