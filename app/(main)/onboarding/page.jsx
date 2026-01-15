import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage() {
  // ✅ Step 1: Hard auth check at page level
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // ✅ Step 2: Safe call
  const status = await getUserOnboardingStatus();

  // status can never be null here, but we still guard
  if (status?.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}
