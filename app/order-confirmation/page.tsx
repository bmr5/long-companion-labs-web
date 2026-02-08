"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  // Clear any remaining cart data on successful order
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("genesis-peptides-cart");
    }
  }, []);

  return (
    <div className="w-full max-w-md text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="text-2xl font-medium text-stone-900">
        Thank you for your order!
      </h1>

      {orderId && (
        <p className="mt-2 text-stone-600">
          Order #{orderId}
        </p>
      )}

      <p className="mt-4 text-stone-600">
        We&apos;ve received your order and will send you a confirmation email shortly.
      </p>

      <div className="mt-8 space-y-3">
        <Link
          href="/products"
          className="block w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="block w-full rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-900 hover:bg-stone-100"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4">
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
