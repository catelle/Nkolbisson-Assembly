import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { getSession, requireAdmin } from "@/lib/auth-helpers";
import type { PrayerSubjectDoc } from "@/lib/content";

export async function GET() {
  const session = await getSession();
  const db = await getDb();
  const collection = db.collection<PrayerSubjectDoc>("prayer_subjects");

  if (session?.user?.role === "admin") {
    const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(docs);
  }

  const docs = await collection.find({ active: true }).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    title?: { fr?: string; en?: string };
    description?: { fr?: string; en?: string };
    active?: boolean;
  };

  if (!body?.title?.fr && !body?.title?.en) {
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const doc: PrayerSubjectDoc = {
    _id: new ObjectId(),
    title: {
      fr: body.title?.fr?.trim() || "",
      en: body.title?.en?.trim() || ""
    },
    description: {
      fr: body.description?.fr?.trim() || "",
      en: body.description?.en?.trim() || ""
    },
    active: body.active !== false,
    createdAt: now,
    updatedAt: now
  };

  const db = await getDb();
  await db.collection<PrayerSubjectDoc>("prayer_subjects").insertOne(doc);

  return NextResponse.json({ id: doc._id.toString() });
}
