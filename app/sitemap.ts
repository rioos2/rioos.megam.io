import type { MetadataRoute } from "next";
import { listAllPages, routeFor } from "@/lib/content";

const SITE_URL = "https://rios.megam.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2018-10-01");
  const pages = listAllPages().map((p) => ({
    url: `${SITE_URL}${routeFor(p.section, p.slug)}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6
  }));
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 1
    },
    ...pages
  ];
}
