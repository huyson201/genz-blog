import postService from "@/services/post.service";
import { slugify } from "@/utils";
import { MetadataRoute } from "next";

export default async function sitemap(
  props: any
): Promise<MetadataRoute.Sitemap> {
  const post = await postService.getPosts({ page: 1 });
  if (!post) return [];
  const posts = await Promise.all(
    Array.from({ length: post.totalPages }).map((_, key) =>
      postService.getPosts({ page: key + 1 })
    )
  );

  const results = posts
    .map((data) => {
      return data.docs.map((postData) => {
        return {
          url: `https://genz-blog.vercel.app/blogs/${slugify(postData.title)}-${
            postData._id
          }`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        };
      });
    })
    .flat(1) as MetadataRoute.Sitemap;
  const sitemapPage = Array.from({ length: post.totalPages }).map((_, key) => {
    return {
      url: `https://genz-blog.vercel.app/blogs/page/${key + 1}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.64,
    };
  }) as MetadataRoute.Sitemap;

  return [...results, ...sitemapPage];
}
