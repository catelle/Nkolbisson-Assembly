import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongo";
import { requireAdmin } from "@/lib/auth-helpers";
import type { MinistryDoc } from "@/lib/content";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates = await request.json();
  const db = await getDb();
  await db.collection<MinistryDoc>("ministries").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date().toISOString() } }
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
  await db.collection<MinistryDoc>("ministries").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
