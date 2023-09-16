import { Display, PaginateResponse, Post, PostFormData } from "@/types/type";
import { apiConfig } from "./Api";
import CustomError from "@/CustomError";
import { queryStringify } from "@/utils/queryStringify";

const postService = {
  createPost: async (
    url: string,
    { arg }: { arg: { post: PostFormData; token: string } }
  ): Promise<Post> => {
    const res = await fetch(`${apiConfig.baseUrl}/posts`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${arg.token}`,
      },
      method: "Post",
      body: JSON.stringify(arg.post),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  updatePost: async (
    url: string,
    { arg }: { arg: { postId: string; post: PostFormData; token: string } }
  ): Promise<Post> => {
    const res = await fetch(`${apiConfig.baseUrl}/posts/${arg.postId}`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${arg.token}`,
      },
      method: "PATCH",
      body: JSON.stringify(arg.post),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  getPostById: async (id: string): Promise<Post> => {
    const res = await fetch(`${apiConfig.baseUrl}/posts/${id}`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "Get",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  getPosts: async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<PaginateResponse<Post>> => {
    const queryString = queryStringify({ page, limit });
    const res = await fetch(`${apiConfig.baseUrl}/posts?${queryString}`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "Get",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },

  search: async (
    key: string,
    { page = 1, limit = 10 }: { page?: number; limit?: number }
  ): Promise<PaginateResponse<Post>> => {
    const queryString = queryStringify({ q: key, page, limit });
    const res = await fetch(
      `${apiConfig.baseUrl}/posts/search?${queryString}`,
      {
        headers: {
          ...apiConfig.headers,
        },
        method: "Get",
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
};

export default postService;
