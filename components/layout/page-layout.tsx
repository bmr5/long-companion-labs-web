import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "components/landing/footer";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-stone-50">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
