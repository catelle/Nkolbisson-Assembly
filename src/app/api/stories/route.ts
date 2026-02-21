import { NextResponse } from "next/server";
import { ObjectId, type Filter } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin, getSession } from "@/lib/auth-helpers";
import type { StoryDoc } from "@/lib/content";

export async function GET() {
  const session = await getSession();
  const db = await getDb();
  const filter: Filter<StoryDoc> = session?.user?.role === "admin" ? {} : { status: "published" };
  const docs = await db.collection<StoryDoc>("stories").find(filter).toArray();
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = (await request.json()) as Omit<StoryDoc, "_id">;
  const now = new Date().toISOString();

  const db = await getDb();
  const result = await db.collection<StoryDoc>("stories").insertOne({
    ...(data as StoryDoc),
    _id: new ObjectId(),
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}
