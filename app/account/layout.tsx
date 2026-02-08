"use client";

import { useAuth } from "lib/auth/context";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { StoreHeader } from "components/store-header";
import { CartDrawer } from "components/woo-cart/cart-drawer";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?redirect=/account");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <StoreHeader />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-[#C4A484]" />
            <p className="mt-4 text-stone-500">Loading...</p>
          </div>
        </main>
        <CartDrawer />
      </div>
    );
  }

  // Don't render children if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <StoreHeader />
      <main>{children}</main>
      <CartDrawer />
    </div>
  );
}
