import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCustomerOrders } from "lib/woocommerce";

const WP_URL = "https://www.genesispeptides.com";

export async function GET() {
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
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const wpUser = await wpRes.json();
  const email = wpUser.email;

  if (!email) {
    return NextResponse.json({ error: "User email not found" }, { status: 400 });
  }

  // Fetch orders from WooCommerce
  const orders = await getCustomerOrders(email);

  return NextResponse.json({ orders });
}
