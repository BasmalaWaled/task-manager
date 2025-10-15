import "server-only";
import { userRequired } from "../user/is-user-authenticated";
import { db } from "@/lib/db";

export const getUserWorkspaces = async () => {
  try {
    const { user } = await userRequired();

    if (!user) {
      throw new Error("User not found");
    }

    const workspace = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        onboardingCompleted: true, // ✅ مهم جداً
        workspaces: {
          select: {
            id: true,
            userId: true,
            workspaceId: true,
            accessLevel: true,
            createdAt: true,
            workspace: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!workspace) return null;

    return {
      onboardingCompleted: workspace.onboardingCompleted,
      workspaces: workspace.workspaces,
    };
  } catch (error) {
    console.error("Error in getUserWorkspaces:", error);
    throw error;
  }
};

