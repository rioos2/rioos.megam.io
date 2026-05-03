import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: []
      }
    ],
    sitemap: "https://rios.megam.io/sitemap.xml",
    host: "https://rios.megam.io"
  };
}
