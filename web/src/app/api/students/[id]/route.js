import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireUser } from "@/lib/apiAuth";

// DELETE — admin removes a student account.
export async function DELETE(_request, { params }) {
  const { error } = await requireUser(["admin"]);
  if (error) return error;

  const { id } = await params;
  await connectDB();

  const deleted = await User.findOneAndDelete({ _id: id, role: "student" });
  if (!deleted) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
