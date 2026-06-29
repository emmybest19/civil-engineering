import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lecturer from "@/models/Lecturer";
import { requireUser } from "@/lib/apiAuth";

const FIELDS = ["name", "position", "image", "qualifications", "specialization", "bio", "contact"];

// PUT — admin edits a lecturer.
export async function PUT(request, { params }) {
  const { error } = await requireUser(["admin"]);
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const update = {};
  for (const f of FIELDS) {
    if (f in body) update[f] = body[f];
  }

  await connectDB();
  const lecturer = await Lecturer.findByIdAndUpdate(id, update, { new: true });
  if (!lecturer) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ lecturer });
}

// DELETE — admin removes a lecturer.
export async function DELETE(_request, { params }) {
  const { error } = await requireUser(["admin"]);
  if (error) return error;

  const { id } = await params;
  await connectDB();
  const deleted = await Lecturer.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
