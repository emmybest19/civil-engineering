import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

// Fallback redirect (middleware normally handles this first).
export default async function DashboardIndex() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  redirect(`/dashboard/${user.role}`);
}
