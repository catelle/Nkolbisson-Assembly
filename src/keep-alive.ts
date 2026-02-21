import { getDb } from "./lib/mongo";
import { supabaseServer } from "./lib/supabase";

async function keepAlive() {
  console.log(`[${new Date().toISOString()}] Running keep-alive...`);

  try {
    // MongoDB ping
    const db = await getDb();
    await db.admin().ping();
    console.log("✓ MongoDB pinged successfully");
  } catch (error) {
    console.error("✗ MongoDB ping failed:", error);
  }

  try {
    // Supabase ping - list buckets
    const { data, error } = await supabaseServer.storage.listBuckets();
    if (error) throw error;
    console.log(`✓ Supabase pinged successfully (${data.length} buckets)`);
  } catch (error) {
    console.error("✗ Supabase ping failed:", error);
  }
}

// Run immediately
keepAlive();

// Run every 5 minutes
setInterval(keepAlive, 5 * 60 * 1000);
