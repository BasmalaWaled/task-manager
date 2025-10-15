import { auth } from "@/auth";

export const getCurrentUser = async () => {
  const session = await auth();
  
  if (!session?.user) {
    return { user: null };
  }

  return { 
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  };
};
