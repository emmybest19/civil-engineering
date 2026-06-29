import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Announcement from "@/models/Announcement";
import { requireUser } from "@/lib/apiAuth";

// DELETE — admin can delete any; teacher can delete their own.
export async function DELETE(_request, { params }) {
  const { user, error } = await requireUser(["teacher", "admin"]);
  if (error) return error;

  const { id } = await params;
  await connectDB();

  const announcement = await Announcement.findById(id);
  if (!announcement) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (user.role !== "admin" && String(announcement.createdBy) !== user.id) {
    return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  }

  await announcement.deleteOne();
  return NextResponse.json({ ok: true });
}
