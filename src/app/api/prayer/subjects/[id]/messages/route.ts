import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin } from "@/lib/auth-helpers";
import type { PrayerMessageDoc } from "@/lib/content";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const messages = await db
    .collection<PrayerMessageDoc>("prayer_subject_messages")
    .find({ subjectId: id })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(messages);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { title?: string; text?: string };
  if (!body?.text?.trim()) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const doc: PrayerMessageDoc = {
    _id: new ObjectId(),
    subjectId: id,
    title: body.title?.trim() || "",
    text: body.text.trim(),
    createdAt: new Date().toISOString(),
    senderRole: "admin"
  };

  const db = await getDb();
  await db.collection<PrayerMessageDoc>("prayer_subject_messages").insertOne(doc);

  return NextResponse.json({ id: doc._id.toString() });
}
