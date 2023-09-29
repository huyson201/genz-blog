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
      next: {
        revalidate: 3600,
      },
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
  ) => {
    try {
      const query = queryStringify({ page, limit });
      const res = await fetch(
        `${apiConfig.baseUrl}/tags/${slug}/posts?${query}`,
        {
          headers: {
            ...apiConfig.headers,
          },
          method: "Get",
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        if (res.status < 500) {
          return { error: data };
        }
        throw new CustomError(res.status, data.message, data);
      }
      return { data: data as PaginateResponse<Post> };
    } catch (error) {
      throw error;
    }
  },

  getTagBySlug: async (slug: string) => {
    try {
      const res = await fetch(`${apiConfig.baseUrl}/tags/${slug}`, {
        headers: {
          ...apiConfig.headers,
        },
        method: "Get",
        next: {
          revalidate: 3600 * 24,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status < 500) {
          return { error: data };
        }
        throw new Error(data.message || "Something went wrong!");
      }
      return { data: data as HashTag };
    } catch (error) {
      throw error;
    }
  },
};

export default tagService;
