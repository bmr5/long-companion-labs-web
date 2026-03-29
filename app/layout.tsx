import { GeistSans } from "geist/font/sans";
import { Playfair_Display } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";
import { PostHogProvider } from "components/posthog-provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Long Companion Labs — Science-Backed Pet Longevity",
    template: "%s | Long Companion Labs",
  },
  description:
    "Helping senior dogs live longer, better lives through veterinary telehealth and compounded peptide therapy.",
  openGraph: {
    title: "Long Companion Labs — Science-Backed Pet Longevity",
    description:
      "Helping senior dogs live longer, better lives through veterinary telehealth and compounded peptide therapy.",
    siteName: "Long Companion Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long Companion Labs — Science-Backed Pet Longevity",
    description:
      "Helping senior dogs live longer, better lives through veterinary telehealth and compounded peptide therapy.",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-900 selection:bg-[#0D7377]/20">
        <PostHogProvider>
          {children}
          <Toaster closeButton />
        </PostHogProvider>
      </body>
    </html>
  );
}
