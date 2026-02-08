import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { LoginCredentials, AuthResponse, AuthError, WPJwtTokenResponse } from "lib/auth/types";

const WP_URL = "https://www.genesispeptides.com";

export async function POST(request: Request): Promise<NextResponse<AuthResponse | AuthError>> {
  try {
    const body: LoginCredentials = await request.json();
    const { email, password } = body;

    // WP JWT plugin expects form-encoded data
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const wpRes = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!wpRes.ok) {
      const wpError = await wpRes.json().catch(() => null);
      const code = wpError?.code;

      // Map WP error codes to user-friendly messages
      if (code === "[jwt_auth] invalid_username" || code === "[jwt_auth] invalid_email") {
        return NextResponse.json({ error: "No account found with that email" }, { status: 401 });
      }
      if (code === "[jwt_auth] incorrect_password") {
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
      }

      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const wpData: WPJwtTokenResponse = await wpRes.json();

    // Store JWT in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", wpData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      user: {
        id: 0, // JWT token response doesn't include user ID; /me endpoint will resolve it
        email: wpData.user_email,
        displayName: wpData.user_display_name,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
