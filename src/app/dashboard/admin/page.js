import Card from "@/components/Card";
import { getCurrentUser } from "@/lib/session";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Signed in as {user.name}.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Students</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Teachers</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Lecturers</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Announcements</p>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold mb-2">Administration</h2>
        <p className="text-gray-600 text-sm">
          Manage lecturers and students, post announcements, and oversee the
          department portal from the sidebar.
        </p>
      </Card>
    </div>
  );
}
