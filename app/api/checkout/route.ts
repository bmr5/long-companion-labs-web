import { NextResponse } from "next/server";
import { createOrder, OrderAddress, OrderLineItem } from "lib/woocommerce";

type CheckoutRequest = {
  billing: OrderAddress;
  shipping: OrderAddress;
  line_items: {
    product_id: string;
    variation_id?: string;
    quantity: number;
  }[];
  customer_note?: string;
  coupon_code?: string;
};

export async function POST(request: Request) {
  try {
    const body: CheckoutRequest = await request.json();

    // Validate required fields
    if (!body.billing || !body.shipping || !body.line_items?.length) {
      return NextResponse.json(
        { error: "Missing required fields: billing, shipping, and line_items are required" },
        { status: 400 }
      );
    }

    // Validate billing address
    const requiredBillingFields = ["first_name", "last_name", "address_1", "city", "state", "postcode", "country", "email"];
    for (const field of requiredBillingFields) {
      if (!body.billing[field as keyof OrderAddress]) {
        return NextResponse.json(
          { error: `Missing required billing field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate shipping address
    const requiredShippingFields = ["first_name", "last_name", "address_1", "city", "state", "postcode", "country"];
    for (const field of requiredShippingFields) {
      if (!body.shipping[field as keyof OrderAddress]) {
        return NextResponse.json(
          { error: `Missing required shipping field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Transform line items to WooCommerce format (string IDs to numbers)
    const lineItems: OrderLineItem[] = body.line_items.map((item) => ({
      product_id: parseInt(item.product_id, 10),
      ...(item.variation_id && { variation_id: parseInt(item.variation_id, 10) }),
      quantity: item.quantity,
    }));

    // Create the order in WooCommerce
    const result = await createOrder({
      billing: body.billing,
      shipping: body.shipping,
      line_items: lineItems,
      customer_note: body.customer_note,
      coupon_lines: body.coupon_code ? [{ code: body.coupon_code }] : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.order?.id,
      orderKey: result.order?.order_key,
      paymentUrl: result.paymentUrl,
      total: result.order?.total,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
