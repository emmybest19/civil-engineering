import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireUser } from "@/lib/apiAuth";

// GET — the current user's full profile.
export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  await connectDB();
  const profile = await User.findById(user.id)
    .select("name email role matricNumber level position phone image")
    .lean();

  if (!profile) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ profile });
}

// PUT — update fields the user owns. Email, role, matric and level stay admin-controlled.
export async function PUT(request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const body = await request.json();
  const update = {};
  for (const f of ["name", "phone", "image"]) {
    if (f in body) update[f] = body[f];
  }
  if (user.role === "teacher" && "position" in body) {
    update.position = body.position;
  }

  await connectDB();
  const profile = await User.findByIdAndUpdate(user.id, update, { new: true })
    .select("name email role matricNumber level position phone image")
    .lean();

  return NextResponse.json({ profile });
}
