import LecturerManager from "@/components/dashboard/LecturerManager";

export default function AdminLecturers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Lecturers</h1>
      <LecturerManager />
    </div>
  );
}
