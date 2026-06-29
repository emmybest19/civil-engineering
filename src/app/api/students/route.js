import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireUser } from "@/lib/apiAuth";

// GET — list student accounts (teacher/admin). Optional ?level=300 filter.
export async function GET(request) {
  const { error } = await requireUser(["teacher", "admin"]);
  if (error) return error;

  await connectDB();
  const level = request.nextUrl.searchParams.get("level");
  const filter = { role: "student" };
  if (level) filter.level = level;

  const students = await User.find(filter)
    .select("name email matricNumber level")
    .sort({ name: 1 })
    .lean();

  return NextResponse.json({ students });
}
