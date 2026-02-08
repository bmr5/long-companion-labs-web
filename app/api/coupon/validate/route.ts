import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_STORE_URL || "",
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
  version: "wc/v3",
});

export type CouponValidationResponse = {
  valid: boolean;
  coupon?: {
    code: string;
    discountType: "percent" | "fixed_cart" | "fixed_product";
    amount: string;
    description: string;
    minimumAmount?: string;
    maximumAmount?: string;
    freeShipping: boolean;
  };
  error?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, error: "Coupon code is required" },
        { status: 400 }
      );
    }

    // Fetch coupon from WooCommerce
    const response = await api.get("coupons", {
      code: code.toLowerCase().trim(),
    });

    const coupons = response.data;
    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        { valid: false, error: "Invalid coupon code" },
        { status: 200 }
      );
    }

    const coupon = coupons[0];

    // Check if coupon is active
    if (coupon.status !== "publish") {
      return NextResponse.json(
        { valid: false, error: "This coupon is no longer active" },
        { status: 200 }
      );
    }

    // Check expiry date
    if (coupon.date_expires) {
      const expiryDate = new Date(coupon.date_expires);
      if (expiryDate < new Date()) {
        return NextResponse.json(
          { valid: false, error: "This coupon has expired" },
          { status: 200 }
        );
      }
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json(
        { valid: false, error: "This coupon has reached its usage limit" },
        { status: 200 }
      );
    }

    // Check minimum amount
    if (coupon.minimum_amount && cartTotal) {
      const minAmount = parseFloat(coupon.minimum_amount);
      if (cartTotal < minAmount) {
        return NextResponse.json(
          { valid: false, error: `Minimum order amount of $${minAmount.toFixed(2)} required` },
          { status: 200 }
        );
      }
    }

    // Check maximum amount
    if (coupon.maximum_amount && cartTotal) {
      const maxAmount = parseFloat(coupon.maximum_amount);
      if (cartTotal > maxAmount) {
        return NextResponse.json(
          { valid: false, error: `Maximum order amount of $${maxAmount.toFixed(2)} exceeded` },
          { status: 200 }
        );
      }
    }

    // Coupon is valid
    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discount_type,
        amount: coupon.amount,
        description: coupon.description || "",
        minimumAmount: coupon.minimum_amount || undefined,
        maximumAmount: coupon.maximum_amount || undefined,
        freeShipping: coupon.free_shipping,
      },
    } as CouponValidationResponse);
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
