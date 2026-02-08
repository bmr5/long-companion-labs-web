import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  // Marketing pages (landing, about, etc.) have their own header/footer
  return <>{children}</>;
}
