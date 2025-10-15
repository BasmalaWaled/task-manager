import React from "react";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { redirect } from "next/navigation";
import { userRequired } from "@/app/data/user/is-user-authenticated";

interface Props {
  children: React.ReactNode;
  params: { workspaceId: string };
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const { user } = await userRequired();
  const { workspaceId } = params;

  // ✅ تحقق من إذا كان المستخدم مكمل الـ onboarding
  if (!user.onboardingCompleted) {
    redirect("/onboarding");
  }

  // ✅ هات كل ورش العمل اللي المستخدم عضو فيها
  const data = await getUserWorkspaces();

  // ✅ تحقق من وجود الـ workspace الحالي
  const workspaceExists = data?.workspaces?.some(
    (w) => w.workspaceId === workspaceId
  );

  if (!workspaceExists) {
    redirect("/create-workspace");
  }

  // ✅ لو كل شيء تمام → اعرض الصفحة
  return <>{children}</>;
};

export default WorkspaceIdLayout;

