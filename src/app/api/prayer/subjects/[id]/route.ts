import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin } from "@/lib/auth-helpers";
import type { PrayerSubjectDoc, PrayerParticipantDoc, PrayerMessageDoc } from "@/lib/content";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    title?: { fr?: string; en?: string };
    description?: { fr?: string; en?: string };
    active?: boolean;
  };

  const updates: Partial<PrayerSubjectDoc> = {};

  if (body.title) {
    updates.title = {
      fr: body.title.fr?.trim() || "",
      en: body.title.en?.trim() || ""
    };
  }

  if (body.description) {
    updates.description = {
      fr: body.description.fr?.trim() || "",
      en: body.description.en?.trim() || ""
    };
  }

  if (typeof body.active === "boolean") {
    updates.active = body.active;
  }

  updates.updatedAt = new Date().toISOString();

  const db = await getDb();
  await db.collection<PrayerSubjectDoc>("prayer_subjects").updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  await db.collection<PrayerSubjectDoc>("prayer_subjects").deleteOne({ _id: new ObjectId(id) });
  await db.collection<PrayerParticipantDoc>("prayer_participants").deleteMany({ subjectId: id });
  await db.collection<PrayerMessageDoc>("prayer_subject_messages").deleteMany({ subjectId: id });

  return NextResponse.json({ ok: true });
}
