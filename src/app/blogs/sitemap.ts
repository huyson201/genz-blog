import postService from "@/services/post.service";
import { getSiteURL, slugify } from "@/utils";
import { MetadataRoute } from "next";

export default async function sitemap(
  props: any
): Promise<MetadataRoute.Sitemap> {
  const currentPost = await postService.getPosts({ page: 1 });

  if (!currentPost) return [];

  const posts = await Promise.all(
    Array.from({ length: currentPost.totalPages }).map((_, key) =>
      postService.getPosts({ page: key + 1 })
    )
  );

  const blogDetailSitemaps = posts
    .map((data) => {
      return data.docs.map((postData) => {
        return {
          url: `${getSiteURL()}/blogs/${slugify(postData.title)}-${
            postData._id
          }`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        };
      });
    })
    .flat(1) as MetadataRoute.Sitemap;

  const blogPageSitemaps = Array.from({
    length: currentPost.totalPages,
  }).map((_, key) => {
    return {
      url: `${getSiteURL()}/blogs/page/${key + 1}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    };
  }) as MetadataRoute.Sitemap;

  return [...blogDetailSitemaps, ...blogPageSitemaps];
}
