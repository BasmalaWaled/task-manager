import React from "react";
import { CreateWorkspaceForm } from "@/components/workspace/create-workspace-form";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { redirect } from "next/navigation";

const Page = async () => {
  const data = await getUserWorkspaces();

  // لو المستخدم لسه مخلصش الـ onboarding
  if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-lg">
        <CreateWorkspaceForm />
      </div>
    </div>
  );
};

export default Page;
