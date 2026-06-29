import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role, matricNumber, level, position } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Only allow self-registration as student or teacher; admins are seeded/promoted.
    const safeRole = ["student", "teacher"].includes(role) ? role : "student";

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      role: safeRole,
      matricNumber: safeRole === "student" ? matricNumber : undefined,
      level: safeRole === "student" ? level : undefined,
      position: safeRole === "teacher" ? position : undefined,
    });

    // Account created but not logged in — the user signs in afterwards.
    return NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("register error", err);
    const isDbError = /ENOTFOUND|ECONNREFUSED|querySrv|timed out|ETIMEDOUT|authentication failed|bad auth/i.test(
      err?.message || ""
    );
    const message = isDbError
      ? "Could not reach the database. Check MONGODB_URI in .env.local."
      : "Something went wrong.";
    return NextResponse.json(
      { error: message, detail: process.env.NODE_ENV !== "production" ? err?.message : undefined },
      { status: 500 }
    );
  }
}
