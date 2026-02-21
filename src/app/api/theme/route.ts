import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { requireAdmin } from "@/lib/auth-helpers";

export async function GET() {
  const db = await getDb();
  const theme = await db.collection("theme").findOne({});
  return NextResponse.json(theme || { text: { fr: "", en: "" }, image: "" });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const db = await getDb();
  
  await db.collection("theme").updateOne(
    {},
    { $set: { text: body.text, image: body.image, updatedAt: new Date().toISOString() } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
