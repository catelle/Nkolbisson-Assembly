import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin, getSession } from "@/lib/auth-helpers";
import type { UpdateDoc } from "@/lib/content";

export async function GET() {
  const session = await getSession();
  const db = await getDb();
  const filter = session?.user?.role === "admin" ? {} : { status: "published" };
  const docs = await db.collection<UpdateDoc>("updates").find(filter).sort({ publishedAt: -1 }).toArray();
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = (await request.json()) as Omit<UpdateDoc, "_id">;
  const now = new Date().toISOString();

  const db = await getDb();
  const result = await db.collection<UpdateDoc>("updates").insertOne({
    ...(data as UpdateDoc),
    _id: new ObjectId(),
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({ id: result.insertedId.toString() });
}
