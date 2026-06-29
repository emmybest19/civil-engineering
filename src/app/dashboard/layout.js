import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getCurrentUser } from "@/lib/session";

const navByRole = {
  student: [
    { href: "/dashboard/student", label: "Overview" },
    { href: "/dashboard/student/announcements", label: "Announcements" },
    { href: "/dashboard/student/results", label: "Results" },
    { href: "/dashboard/student/lecturers", label: "Lecturers" },
    { href: "/dashboard/student/profile", label: "Profile" },
  ],
  teacher: [
    { href: "/dashboard/teacher", label: "Overview" },
    { href: "/dashboard/teacher/students", label: "My Students" },
    { href: "/dashboard/teacher/results", label: "Upload Results" },
    { href: "/dashboard/teacher/announcements", label: "Announcements" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview" },
    { href: "/dashboard/admin/lecturers", label: "Manage Lecturers" },
    { href: "/dashboard/admin/students", label: "Manage Students" },
    { href: "/dashboard/admin/announcements", label: "Announcements" },
  ],
};

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const items = navByRole[user.role] || [];

  return (
    <div className="md:flex min-h-screen bg-gray-50">
      <DashboardSidebar user={user} items={items} />
      <div className="flex-1 min-w-0">
        <main className="p-6 md:p-8 max-w-5xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
