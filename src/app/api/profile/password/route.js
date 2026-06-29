import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireUser } from "@/lib/apiAuth";
import { hashPassword, verifyPassword } from "@/lib/auth";

// PUT — change own password.
export async function PUT(request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const { currentPassword, newPassword } = await request.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Current and new password are required." },
      { status: 400 }
    );
  }
  if (newPassword.length < 6) {
    return NextResponse.json(
      { error: "New password must be at least 6 characters." },
      { status: 400 }
    );
  }

  await connectDB();
  const dbUser = await User.findById(user.id).select("+password");
  if (!dbUser || !(await verifyPassword(currentPassword, dbUser.password))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  dbUser.password = await hashPassword(newPassword);
  await dbUser.save();

  return NextResponse.json({ ok: true });
}
