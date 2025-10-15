import { db } from "@/lib/db";

export const getWorkspaceById = async (workspaceId: string, userId: string) => {
  try {
    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return workspace;
  } catch (error) {
    console.error('Error in getWorkspaceById:', error);
    return null;
  }
};
