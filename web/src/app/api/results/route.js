import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Result from "@/models/Result";
import { requireUser } from "@/lib/apiAuth";

// GET — students see their own results; teachers/admins see all (optionally
// filtered by ?student=<id>).
export async function GET(request) {
  const { user, error } = await requireUser();
  if (error) return error;

  await connectDB();

  let filter = {};
  if (user.role === "student") {
    filter.student = user.id;
  } else {
    const studentId = request.nextUrl.searchParams.get("student");
    if (studentId) filter.student = studentId;
  }

  const results = await Result.find(filter)
    .sort({ createdAt: -1 })
    .populate("student", "name matricNumber level")
    .lean();

  return NextResponse.json({ results });
}

// POST — upload/record a result (teacher/admin).
export async function POST(request) {
  const { user, error } = await requireUser(["teacher", "admin"]);
  if (error) return error;

  const { student, course, session, semester, score, grade } = await request.json();
  if (!student || !course) {
    return NextResponse.json(
      { error: "Student and course are required." },
      { status: 400 }
    );
  }

  await connectDB();
  const result = await Result.create({
    student,
    course,
    session,
    semester: ["first", "second"].includes(semester) ? semester : "first",
    score: score === "" || score == null ? undefined : Number(score),
    grade,
    uploadedBy: user.id,
  });

  return NextResponse.json({ result }, { status: 201 });
}
