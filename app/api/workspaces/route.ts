import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/workspaces - Get user's workspaces
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        workspaces: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      onboardingCompleted: user.onboardingCompleted,
      workspaces: user.workspaces.map((uw) => ({
        id: uw.id,
        workspaceId: uw.workspaceId,
        accessLevel: uw.accessLevel,
        workspace: {
          id: uw.workspace.id,
          name: uw.workspace.name,
          description: uw.workspace.description,
          inviteCode: uw.workspace.inviteCode,
        },
      })),
    });
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/workspaces - Create a new workspace

export async function POST(request: Request) {
  try {
    console.log("✅ [START] Create Workspace API called");

    const session = await getServerSession(authOptions);
    console.log("🟢 Session data:", session);

    if (!session?.user?.email) {
      console.log("❌ No session or user email found");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description } = body;
    console.log("📝 Request body:", { name, description });

    // ابحث عن المستخدم من خلال الإيميل
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    console.log("👤 User fetched from DB:", user);

    if (!user) {
      console.log("❌ User not found in database");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // إنشاء workspace جديد
    console.log("🚀 Creating workspace...");
    const workspace = await db.workspace.create({
      data: {
        name,
        description: description || null,
        inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            accessLevel: "OWNER",
          },
        },
      },
      include: {
        members: true,
      },
    });
    console.log("✅ Workspace created successfully:", workspace);

    // تحديث حالة الـ onboarding
    console.log("🔄 Updating user onboarding status...");
    await db.user.update({
      where: { id: user.id },
      data: { onboardingCompleted: true },
    });
    console.log("✅ User onboarding updated.");

    return NextResponse.json({ success: true, workspace });
  } catch (error) {
    console.error("❌ Error creating workspace:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

