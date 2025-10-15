import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/auth-options';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ user: null }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(
    JSON.stringify({
      user: {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
        given_name: session.user?.given_name,
        family_name: session.user?.family_name,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
