import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/mdx";
import { siteConfig } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllProjectSlugs();

  const projectEntries = slugs.map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const mainEntries = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...mainEntries, ...projectEntries];
}
