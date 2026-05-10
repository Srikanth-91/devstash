import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardMain from "@/components/dashboard/DashboardMain";
import { getSidebarData } from "@/lib/db/collections";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = session.user.id;
  const sidebarData = await getSidebarData(userId);

  return (
    <DashboardShell sidebarData={sidebarData} user={session.user}>
      <DashboardMain userId={userId} />
    </DashboardShell>
  );
}
