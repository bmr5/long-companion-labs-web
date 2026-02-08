import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, size, event, name, city, state, zip } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const source = req.headers.get("referer") || "direct";
    const eventType = event || "waitlist_signup";

    await appendToSheet([
      [
        timestamp,
        eventType,
        email,
        size || "",
        name || "",
        city || "",
        state || "",
        zip || "",
        source,
      ],
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    );
  }
}
