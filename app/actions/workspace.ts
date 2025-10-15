"use server";
import { CreateWorkspaceDataType } from "@/components/workspace/create-workspace-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";

const generateInviteCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createNewWorkspace = async (data: CreateWorkspaceDataType) => {
  try {
    const { user } = await userRequired();
    const validatedData = workspaceSchema.parse(data);

    const workspace = await db.workspace.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: user.id,
        inviteCode: generateInviteCode(),
        members: {
          create: {
            userId: user.id,
            accessLevel: "OWNER",
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    await db.user.update({
      where: { id: user.id },
      data: { onboardingCompleted: true },
    });

    // ✅ رجّع workspace.id بدل redirect
    return { success: true, workspaceId: workspace.id };
  } catch (error) {
    console.error("Error in createNewWorkspace:", error);
    return { success: false, message: "حدث خطأ أثناء إنشاء مساحة العمل. يرجى المحاولة مرة أخرى." };
  }
};
