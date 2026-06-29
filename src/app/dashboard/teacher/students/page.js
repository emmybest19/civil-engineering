import StudentsList from "@/components/dashboard/StudentsList";

export default function TeacherStudents() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Students</h1>
      <StudentsList />
    </div>
  );
}
