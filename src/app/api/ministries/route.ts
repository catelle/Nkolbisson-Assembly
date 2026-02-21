import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin, getSession } from "@/lib/auth-helpers";
import type { MinistryDoc } from "@/lib/content";

export async function GET() {
  const session = await getSession();
  const db = await getDb();
  const docs = await db.collection<MinistryDoc>("ministries").find({}).toArray();
  if (!session) {
    return NextResponse.json(docs);
  }
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = (await request.json()) as Omit<MinistryDoc, "_id">;
  const now = new Date().toISOString();

  const db = await getDb();
  const result = await db.collection<MinistryDoc>("ministries").insertOne({
    ...(data as MinistryDoc),
    _id: new ObjectId(),
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}
