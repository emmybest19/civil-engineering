import Card from "@/components/Card";
import { getCurrentUser } from "@/lib/session";

export default async function StudentDashboard() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="text-gray-600">Here&apos;s an overview of your activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">Results published</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">0</p>
          <p className="text-gray-600 text-sm">New announcements</p>
        </Card>
        <Card>
          <p className="text-3xl font-bold text-primary">—</p>
          <p className="text-gray-600 text-sm">Current level</p>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold mb-2">Getting started</h2>
        <p className="text-gray-600 text-sm">
          Use the sidebar to check your results, read announcements, and update
          your profile. Data will appear here once your lecturers publish it.
        </p>
      </Card>
    </div>
  );
}
