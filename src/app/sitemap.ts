import { getSiteURL } from "@/utils";
import { MetadataRoute } from "next";

const defaultSitemapUrls = [
  {
    url: getSiteURL(),
    priority: 1,
  },
  {
    url: `${getSiteURL()}/blogs`,
    priority: 0.8,
  },
  {
    url: `${getSiteURL()}/tags`,
    priority: 0.8,
  },
  {
    url: `${getSiteURL()}/contact`,
    priority: 0.8,
  },
  {
    url: `${getSiteURL()}/about-me`,
    priority: 0.8,
  },
  {
    url: `${getSiteURL()}/login`,
    priority: 0.8,
  },
  {
    url: `${getSiteURL()}/register`,
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return defaultSitemapUrls.map((value) => {
    return {
      url: value.url,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: value.priority,
    };
  });
}
