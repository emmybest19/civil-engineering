import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/session";

export default async function PublicLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
