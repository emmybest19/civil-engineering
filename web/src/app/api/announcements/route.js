import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";
import { requireUser } from "@/lib/apiAuth";

// GET — announcements relevant to the current user.
export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  await connectDB();

  // Students see "all" + "student"; teachers see "all" + "teacher"; admin sees all.
  let filter = {};
  if (user.role === "student") filter = { audience: { $in: ["all", "student"] } };
  else if (user.role === "teacher") filter = { audience: { $in: ["all", "teacher"] } };

  const announcements = await Announcement.find(filter)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name")
    .lean();

  return NextResponse.json({ announcements });
}

// POST — create an announcement (teacher/admin).
export async function POST(request) {
  const { user, error } = await requireUser(["teacher", "admin"]);
  if (error) return error;

  const { title, body, audience } = await request.json();
  if (!title || !body) {
    return NextResponse.json({ error: "Title and body are required." }, { status: 400 });
  }

  await connectDB();
  const announcement = await Announcement.create({
    title,
    body,
    audience: ["all", "student", "teacher"].includes(audience) ? audience : "all",
    createdBy: user.id,
  });

  return NextResponse.json({ announcement }, { status: 201 });
}
