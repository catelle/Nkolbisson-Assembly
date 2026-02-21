import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
  const status = { mongodb: false, supabase: false, timestamp: new Date().toISOString() };

  try {
    const db = await getDb();
    await db.admin().ping();
    status.mongodb = true;
  } catch (error) {
    console.error("MongoDB health check failed:", error);
  }

  try {
    const { error } = await supabaseServer.storage.listBuckets();
    if (!error) status.supabase = true;
  } catch (error) {
    console.error("Supabase health check failed:", error);
  }

  return NextResponse.json(status);
}
