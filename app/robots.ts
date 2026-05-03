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
    sitemap: "https://docs.rioos.megam.io/sitemap.xml",
    host: "https://docs.rioos.megam.io"
  };
}
