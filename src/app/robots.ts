import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/profil", "/logga-in", "/registrera", "/~offline"],
      },
    ],
    sitemap: "https://aihubben.se/sitemap.xml",
  };
}
