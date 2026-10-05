import type { MetadataRoute } from "next";

const routes = [
  {
    path: "/",
    priority: 1,
  },
  {
    path: "/architecture",
    priority: 0.9,
  },
  {
    path: "/details",
    priority: 0.9,
  },
  {
    path: "/studio",
    priority: 0.8,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return [];
  }

  const baseUrl = siteUrl.replace(/\/$/, "");

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}