import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { RegisterCredentials, AuthResponse, AuthError, WPJwtTokenResponse } from "lib/auth/types";

const WP_URL = "https://www.genesispeptides.com";

export async function POST(request: Request): Promise<NextResponse<AuthResponse | AuthError>> {
  try {
    const body: RegisterCredentials = await request.json();
    const { name, email, phone, password } = body;

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Create WooCommerce customer using WC REST API (Basic Auth)
    const wcKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const wcSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!wcKey || !wcSecret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const basicAuth = Buffer.from(`${wcKey}:${wcSecret}`).toString("base64");

    const wcRes = await fetch(`${WP_URL}/wp-json/wc/v3/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        username: email,
        password,
        billing: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        },
      }),
    });

    if (!wcRes.ok) {
      const wcError = await wcRes.json().catch(() => null);
      const code = wcError?.code;

      if (code === "registration-error-email-exists") {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: wcError?.message ?? "Registration failed" },
        { status: wcRes.status }
      );
    }

    // Auto-login: get JWT token for the new user
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const jwtRes = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!jwtRes.ok) {
      // Customer was created but auto-login failed — still a success, user can login manually
      return NextResponse.json({
        user: {
          id: 0,
          email,
          displayName: name,
          firstName,
          lastName,
          phone,
        },
      });
    }

    const jwtData: WPJwtTokenResponse = await jwtRes.json();

    // Store JWT in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", jwtData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      user: {
        id: 0,
        email: jwtData.user_email,
        displayName: jwtData.user_display_name,
        firstName,
        lastName,
        phone,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
