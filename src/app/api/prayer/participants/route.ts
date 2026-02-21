import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { requireAdmin } from "@/lib/auth-helpers";
import type { PrayerParticipantDoc } from "@/lib/content";

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get("subjectId");

  const db = await getDb();
  const filter = subjectId ? { subjectId } : {};
  const participants = await db
    .collection<PrayerParticipantDoc>("prayer_participants")
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(participants);
}
