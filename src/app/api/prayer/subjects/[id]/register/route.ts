import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import type { PrayerParticipantDoc, PrayerSubjectDoc } from "@/lib/content";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    whatsapp?: string;
  };

  if (!body?.name?.trim() || !body?.email?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const db = await getDb();
  const subject = await db.collection<PrayerSubjectDoc>("prayer_subjects").findOne({
    _id: new ObjectId(id),
    active: true
  });

  if (!subject) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  const existing = await db.collection<PrayerParticipantDoc>("prayer_participants").findOne({
    subjectId: id,
    email: body.email.trim().toLowerCase()
  });

  if (existing) {
    return NextResponse.json({ id: existing._id.toString(), alreadyRegistered: true });
  }

  const doc: PrayerParticipantDoc = {
    _id: new ObjectId(),
    subjectId: id,
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    whatsapp: body.whatsapp?.trim() || "",
    createdAt: new Date().toISOString()
  };

  await db.collection<PrayerParticipantDoc>("prayer_participants").insertOne(doc);

  return NextResponse.json({ id: doc._id.toString() });
}
