import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { getSession } from "@/lib/auth-helpers";
import type { MessageDoc, QuestionDoc } from "@/lib/content";

async function canAccessQuestion(questionId: string, session: Awaited<ReturnType<typeof getSession>>) {
  if (!session) return false;
  if (session.user.role === "admin") return true;
  const db = await getDb();
  const question = await db.collection<QuestionDoc>("questions").findOne({ _id: new ObjectId(questionId) });
  return question?.userId === session.user.id;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const allowed = await canAccessQuestion(id, session);
  if (!allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const messages = await db
    .collection<MessageDoc>("messages")
    .find({ questionId: id })
    .sort({ createdAt: 1 })
    .toArray();

  return NextResponse.json(messages);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const allowed = await canAccessQuestion(id, session);
  if (!allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { text?: string };
  if (!body.text) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const db = await getDb();
  const doc: MessageDoc = {
    _id: new ObjectId(),
    questionId: id,
    senderRole: session?.user.role === "admin" ? "admin" : "user",
    senderId: session?.user.id,
    text: body.text,
    createdAt: new Date().toISOString()
  };

  await db.collection<MessageDoc>("messages").insertOne(doc);

  return NextResponse.json({ id: doc._id.toString() });
}
