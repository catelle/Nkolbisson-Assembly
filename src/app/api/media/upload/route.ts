import { NextResponse } from "next/server";
import { supabaseServer, supabaseBucket } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-helpers";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File size exceeds 1MB limit" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `uploads/${Date.now()}-${safeName}`;

  const { error } = await supabaseServer.storage
    .from(supabaseBucket)
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseServer.storage.from(supabaseBucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
