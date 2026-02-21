import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { getSession } from "@/lib/auth-helpers";
import type { QuestionDoc } from "@/lib/content";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const collection = db.collection<QuestionDoc>("questions");

  if (session.user.role === "admin") {
    const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(docs);
  }

  const docs = await collection.find({ userId: session.user.id }).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await getSession();
  const body = (await request.json()) as { questionText?: string; isAnonymous?: boolean; isPublic?: boolean };

  if (!body.questionText) {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }

  const db = await getDb();
  const now = new Date().toISOString();

  const doc: QuestionDoc = {
    _id: new ObjectId(),
    questionText: body.questionText,
    createdAt: now,
    status: body.isPublic === false ? "private" : "new",
    userId: session?.user?.id,
    isAnonymous: !session || body.isAnonymous === true,
    publicAnswer: ""
  };

  await db.collection<QuestionDoc>("questions").insertOne(doc);

  return NextResponse.json({ id: doc._id.toString() });
}
