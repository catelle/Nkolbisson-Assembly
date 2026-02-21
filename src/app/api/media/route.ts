import { NextResponse } from "next/server";
import { supabaseServer, supabaseBucket } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseServer.storage.from(supabaseBucket).list("uploads");
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const files = data.map((file) => {
    const { data: urlData } = supabaseServer.storage.from(supabaseBucket).getPublicUrl(`uploads/${file.name}`);
    return {
      name: file.name,
      url: urlData.publicUrl,
      createdAt: file.created_at
    };
  });

  return NextResponse.json(files);
}
