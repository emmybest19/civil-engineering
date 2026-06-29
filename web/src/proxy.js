import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/auth";

// Maps a role to its dashboard home.
const roleHome = {
  student: "/dashboard/student",
  teacher: "/dashboard/teacher",
  admin: "/dashboard/admin",
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await verifyToken(token);

  // Not signed in → send to login (preserve intended destination).
  if (!user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // /dashboard root → redirect to the role's home.
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return NextResponse.redirect(new URL(roleHome[user.role] || "/dashboard/student", request.url));
  }

  // Enforce role boundaries on each section.
  for (const [role, home] of Object.entries(roleHome)) {
    if (pathname.startsWith(`/dashboard/${role}`) && user.role !== role) {
      return NextResponse.redirect(new URL(roleHome[user.role] || "/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
