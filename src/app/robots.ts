import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_REGISTRY_URL || "https://blok.sitecore.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/demo/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
