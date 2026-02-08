import { getProductStock } from "lib/woocommerce";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const stock = await getProductStock(id);

  return NextResponse.json(stock, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
