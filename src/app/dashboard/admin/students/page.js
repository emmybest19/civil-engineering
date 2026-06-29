import StudentsList from "@/components/dashboard/StudentsList";

export default function AdminStudents() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Students</h1>
      <StudentsList canManage />
    </div>
  );
}
