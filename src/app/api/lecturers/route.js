import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lecturer from "@/models/Lecturer";
import { requireUser } from "@/lib/apiAuth";

// GET — any signed-in user can browse the lecturer directory.
export async function GET() {
  const { error } = await requireUser();
  if (error) return error;

  await connectDB();
  const lecturers = await Lecturer.find().sort({ name: 1 }).lean();
  return NextResponse.json({ lecturers });
}

// POST — admin adds a lecturer.
export async function POST(request) {
  const { error } = await requireUser(["admin"]);
  if (error) return error;

  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  await connectDB();
  const lecturer = await Lecturer.create({
    name: body.name,
    position: body.position || "",
    image: body.image || "",
    qualifications: body.qualifications || "",
    specialization: body.specialization || "",
    bio: body.bio || "",
    contact: body.contact || "",
  });

  return NextResponse.json({ lecturer }, { status: 201 });
}
