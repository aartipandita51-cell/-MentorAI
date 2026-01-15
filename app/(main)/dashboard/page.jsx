import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function DashboardPage() {
  // ✅ 1. Auth check FIRST
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // ✅ 2. Safe call (no destructuring yet)
  const status = await getUserOnboardingStatus();

  // ✅ 3. Redirect if not onboarded
  if (!status?.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* dashboard content */}
    </main>
  );
}
