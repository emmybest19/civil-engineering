import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import { requireUser } from "@/lib/apiAuth";

// DELETE — teacher/admin remove a result record.
export async function DELETE(_request, { params }) {
  const { error } = await requireUser(["teacher", "admin"]);
  if (error) return error;

  const { id } = await params;
  await connectDB();

  const deleted = await Result.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
