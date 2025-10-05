import { userRequired } from "../user/is-user-authenticated";
import { getDb } from "@/lib/db";

export const getUserWorkspaces = async () => {
  try {
    const db = getDb();
    const { user } = await userRequired();

    if (!user) {
      throw new Error("User not found");
    }

    const workspace = await db.user.findUnique({
      where: { id: user.id },
      include: {
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
    console.error(error);
    return null;
  }
};

