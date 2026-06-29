import { NextResponse } from "next/server";
import { getCurrentUser } from "./session";

// Guard for route handlers. Returns { user } on success, or { error: Response }
// to return immediately.
//
//   const { user, error } = await requireUser(["teacher", "admin"]);
//   if (error) return error;
export async function requireUser(roles) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: NextResponse.json({ error: "Not signed in." }, { status: 401 }) };
  }
  if (roles && !roles.includes(user.role)) {
    return { error: NextResponse.json({ error: "Not allowed." }, { status: 403 }) };
  }
  return { user };
}
