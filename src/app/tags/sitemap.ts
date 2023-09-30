import tagService from "@/services/tag.service";
import { getSiteURL } from "@/utils";
import { MetadataRoute } from "next";

export default async function sitemap(
  props: any
): Promise<MetadataRoute.Sitemap> {
  const result = await tagService.getTags({ page: 1 });
  if (!result) return [];

  const tags = await Promise.all(
    Array.from({ length: result.totalPages }).map((_, key) =>
      tagService.getTags({ page: key + 1 })
    )
  );

  const tagDetailSitemaps = tags
    .map((data) => {
      return data.docs.map((tag) => {
        return {
          url: `${getSiteURL()}/tags/${tag.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        };
      });
    })
    .flat(1) as MetadataRoute.Sitemap;

  const tagPageSitemaps = Array.from({ length: result.totalPages }).map(
    (_, key) => {
      return {
        url: `${getSiteURL()}/tags/page/${key + 1}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.64,
      };
    }
  ) as MetadataRoute.Sitemap;

  return [...tagDetailSitemaps, ...tagPageSitemaps];
}
