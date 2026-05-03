import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardMain from "@/components/dashboard/DashboardMain";
import { getSidebarData } from "@/lib/db/collections";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: { id: true },
  });

  if (!demoUser) {
    throw new Error("Demo user not found. Run `npm run db:seed` to seed the database.");
  }

  const userId = demoUser.id;
  const sidebarData = await getSidebarData(userId);

  return (
    <DashboardShell sidebarData={sidebarData}>
      <DashboardMain userId={userId} />
    </DashboardShell>
  );
}
