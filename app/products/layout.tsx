import { StoreHeader } from "components/store-header";
import { CartDrawer } from "components/woo-cart/cart-drawer";
import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <StoreHeader />
      <main>{children}</main>
      <CartDrawer />
    </div>
  );
}
