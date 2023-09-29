import tagService from "@/services/tag.service";
import { MetadataRoute } from "next";

export default async function sitemap(
  props: any
): Promise<MetadataRoute.Sitemap> {
  const result = await tagService.getTags({ page: 1 });
  if (!result) return [];
  const tagsList = await Promise.all(
    Array.from({ length: result.totalPages }).map((_, key) =>
      tagService.getTags({ page: key + 1 })
    )
  );
  const sitemapDetails = tagsList
    .map((data) => {
      return data.docs.map((tag) => {
        return {
          url: `https://genz-blog.vercel.app/tags/${tag.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        };
      });
    })
    .flat(1) as MetadataRoute.Sitemap;

  const sitemapPage = Array.from({ length: result.totalPages }).map(
    (_, key) => {
      return {
        url: `https://genz-blog.vercel.app/tags/page/${key + 1}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.64,
      };
    }
  ) as MetadataRoute.Sitemap;

  return [...sitemapDetails, ...sitemapPage];
}
