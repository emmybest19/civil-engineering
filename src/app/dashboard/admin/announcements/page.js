import Announcements from "@/components/dashboard/Announcements";

export default function AdminAnnouncements() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <Announcements canManage />
    </div>
  );
}
