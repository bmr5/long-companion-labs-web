import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    }

    const { error } = await getSupabase().from("waitlist").insert({
      email,
      source: req.headers.get("referer") || "direct",
      created_at: new Date().toISOString(),
    });

    if (error) {
      // Duplicate email — treat as success
      if (error.code === "23505") {
        return NextResponse.json({ success: true, duplicate: true });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
