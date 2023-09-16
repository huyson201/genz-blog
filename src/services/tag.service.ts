import { queryStringify } from "@/utils/queryStringify";
import { apiConfig } from "./Api";
import CustomError from "@/CustomError";
import { HashTag, PaginateResponse, Post } from "@/types/type";
const tagService = {
  getTags: async ({
    page = 1,
    limit = 32,
  }: {
    page?: number;
    limit?: number;
  }): Promise<PaginateResponse<HashTag>> => {
    const query = queryStringify({ page, limit });
    const res = await fetch(`${apiConfig.baseUrl}/tags?${query}`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "Get",
      cache: "no-cache",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  getPostsBySlug: async (
    slug: string,
    {
      page = 1,
      limit = 10,
    }: {
      page?: number;
      limit?: number;
    }
  ): Promise<PaginateResponse<Post>> => {
    const query = queryStringify({ page, limit });
    const res = await fetch(
      `${apiConfig.baseUrl}/tags/${slug}/posts?${query}`,
      {
        headers: {
          ...apiConfig.headers,
        },
        method: "Get",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
};

export default tagService;
