import { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://longcompanionlabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return [
    { url: baseUrl, lastModified: now },
    { url: `${baseUrl}/science`, lastModified: now },
    { url: `${baseUrl}/how-it-works`, lastModified: now },
    { url: `${baseUrl}/about`, lastModified: now },
    { url: `${baseUrl}/faq`, lastModified: now },
    { url: `${baseUrl}/learn`, lastModified: now },
  ];
}
