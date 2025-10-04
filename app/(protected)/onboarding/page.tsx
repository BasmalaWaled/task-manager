import { userRequired } from '@/app/data/user/is-user-authenticated';
import { getUserWorkspaces } from '@/app/data/workspace/get-user-workspaces';
import { redirect } from 'next/navigation';
import { OnboardingForm } from '@/components/onboarding-form';
import React from 'react';

const Page = async () => {
  const data = await getUserWorkspaces();
  const { user } = await userRequired(); // ← هنا بنفك المستخدم الحقيقي من الـ object

  // التوجيه حسب الحالة
  if (data?.onboardingCompleted && data?.workspaces.length > 0) {
    redirect("/workspace");
  } else if (data?.onboardingCompleted) {
    redirect("/create-workspace");
  }

  // نكتب الاسم بشكل آمن
  const name = `${(user as any)?.given_name || ""} ${(user as any)?.family_name || ""}`;

  return (
    <div>
      <OnboardingForm
        name={name}
        email={user?.email as string}
        image={user?.picture || ""}
      />
    </div>
  );
};

export default Page;

  