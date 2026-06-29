import Card from "@/components/Card";
import { getCurrentUser } from "@/lib/session";

export default async function TeacherDashboard() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="text-gray-600">Manage your students, results, and announcements.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Students</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Results uploaded</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Announcements posted</p>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold mb-2">Quick actions</h2>
        <p className="text-gray-600 text-sm">
          Use the sidebar to upload results, view your students, and post
          announcements to the department.
        </p>
      </Card>
    </div>
  );
}
