import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { AuthResponse, AuthError } from "lib/auth/types";

const WP_URL = "https://www.genesispeptides.com";

export async function GET(): Promise<NextResponse<AuthResponse | AuthError>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Fetch current user from WP using the JWT token
  const wpRes = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!wpRes.ok) {
    // Token is invalid or expired — clear cookie
    cookieStore.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const wpUser = await wpRes.json();

  return NextResponse.json({
    user: {
      id: wpUser.id,
      email: wpUser.email ?? "",
      displayName: wpUser.name ?? wpUser.slug ?? "",
      firstName: wpUser.first_name,
      lastName: wpUser.last_name,
    },
  });
}
