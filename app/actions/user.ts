"use server";

import { UserDataType } from "@/components/onboarding-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";

export const createUser = async (data: UserDataType) => {
  try {
    console.log('createUser called with data:', data);
    const { user } = await userRequired();
    const validatedData = userSchema.parse(data);

    // check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: user.id },
      include: { workspaces: true },
    });

    let userData;

    if (existingUser) {
      console.log('Updating existing user...');
      userData = await db.user.update({
        where: { id: user.id },
        data: {
          name: validatedData.name,
          about: validatedData.about,
          country: validatedData.country,
          industryType: validatedData.industryType,
          role: validatedData.role,
          onboardingCompleted: true,
          image: user.picture || "",
        },
        include: { workspaces: true },
      });
    } else {
      console.log('Creating new user...');
      userData = await db.user.create({
        data: {
          id: user.id,
          email: user.email as string,
          name: validatedData.name,
          about: validatedData.about,
          country: validatedData.country,
          industryType: validatedData.industryType,
          role: validatedData.role,
          onboardingCompleted: true,
          image: user.picture || "",
          subscriptions: {
            create: {
              plan: "FREE",
              status: "ACTIVE",
              currentPeriodEnd: new Date(),
              cancelAtPeriodEnd: false,
            },
          },
        },
        include: { workspaces: true },
      });
    }

    const hasWorkspaces = userData.workspaces.length > 0;

    return {
      success: true,
      hasWorkspaces,
      message: "User created/updated successfully",
    };
  } catch (error) {
    console.error("❌ Error in createUser:", error);
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء المستخدم",
    };
  }
};

