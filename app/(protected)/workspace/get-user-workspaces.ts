import { userRequired } from "@/app/data/user/is-user-authenticated";
import { db } from "@/lib/db";

export const getUserWorkspaces = async () => {
  try {
    const { user } = await userRequired();

  const workspaces = await db.workspace.findMany({
  where: {
    members: {
      some: {
        userId: user.id,
      },
    },
  },
  include: {
    members: true,
  },
});


    return workspaces;
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    return [];
  }
};

