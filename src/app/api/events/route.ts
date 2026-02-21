import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { requireAdmin, getSession } from "@/lib/auth-helpers";
import type { EventDoc } from "@/lib/content";
import { ObjectId, type Filter } from "mongodb";

export async function GET() {
  const session = await getSession();
  const db = await getDb();
  const collection = db.collection<EventDoc>("events");
  const filter: Filter<EventDoc> = session?.user?.role === "admin" ? {} : { status: "published" };
  const docs = await collection.find(filter).sort({ startAt: 1 }).toArray();
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = (await request.json()) as Omit<EventDoc, "_id">;
  const now = new Date().toISOString();

  const db = await getDb();
  const result = await db.collection<EventDoc>("events").insertOne({
    ...(data as EventDoc),
    _id: new ObjectId(),
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}
