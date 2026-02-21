import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin } from "@/lib/auth-helpers";
import type { QuestionDoc } from "@/lib/content";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { answerText?: string; isPublic?: boolean };
  if (!body.answerText) {
    return NextResponse.json({ error: "Missing answer" }, { status: 400 });
  }

  const db = await getDb();
  await db.collection<QuestionDoc>("questions").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        publicAnswer: body.isPublic ? body.answerText : "",
        status: body.isPublic ? "answered" : "private"
      }
    }
  );

  return NextResponse.json({ ok: true });
}
