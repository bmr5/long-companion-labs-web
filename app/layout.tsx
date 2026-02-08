import { GeistSans } from "geist/font/sans";
import { Playfair_Display } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Science-backed BPC-157 dog treats for joint health, mobility, and recovery. Premium peptide supplements designed for your dog's wellness.",
  openGraph: {
    title: SITE_NAME!,
    description:
      "Science-backed BPC-157 dog treats for joint health, mobility, and recovery. Premium peptide supplements designed for your dog's wellness.",
    siteName: SITE_NAME!,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME!,
    description:
      "Science-backed BPC-157 dog treats for joint health, mobility, and recovery. Premium peptide supplements designed for your dog's wellness.",
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
      <body className="bg-stone-50 text-stone-900 selection:bg-[#9CAF88]/30">
        {children}
        <Toaster closeButton />
      </body>
    </html>
  );
}
