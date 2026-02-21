import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongo";
import type { UserDoc } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body as { name?: string; email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const db = await getDb();
  const users = db.collection<UserDoc>("users");

  const existing = await users.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "User exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await users.insertOne({
    _id: new ObjectId(),
    name: name || email.split("@")[0],
    email: email.toLowerCase(),
    username: undefined,
    passwordHash,
    role: "user",
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ ok: true });
}
