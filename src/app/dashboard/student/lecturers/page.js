import LecturerDirectory from "@/components/dashboard/LecturerDirectory";

export default function StudentLecturers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lecturers</h1>
      <p className="text-gray-600 text-sm">Browse the department&apos;s faculty.</p>
      <LecturerDirectory />
    </div>
  );
}
