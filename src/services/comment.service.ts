import CustomError from "@/CustomError";
import { apiConfig } from "./Api";
import { queryStringify } from "@/utils";
import { Comment, PaginateResponse } from "@/types/type";
const commentService = {
  createComment: async (
    token: string,
    dataBody: { content: string; post: string; parent?: string }
  ) => {
    const res = await fetch(`${apiConfig.baseUrl}/comments`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "Post",
      body: JSON.stringify(dataBody),
    });
    const data = await res.json();
    if (res.ok) {
      return { data };
    }

    if (res.status === 500) {
      throw new CustomError(res.status, data.message, data);
    }

    return { error: data };
  },
  getComments: async (
    postId: string,
    {
      page = 1,
      limit = 10,
      signal,
    }: { page?: number; limit?: number; signal?: AbortSignal }
  ) => {
    const queryParam = queryStringify({ page, limit });
    const fetchUrl = `${apiConfig.baseUrl}/posts/${postId}/comments?${queryParam}`;

    const res = await fetch(fetchUrl, {
      method: "Get",
      headers: {
        ...apiConfig.headers,
      },
      signal: signal,
    });

    const data = await res.json();
    if (res.ok) {
      return data as PaginateResponse<Comment>;
    }

    throw new CustomError(res.status, data.message, data);
  },
  getReplyComments: async (postId: string, parent: string) => {
    const queryParam = queryStringify({ parent });
    const fetchUrl = `${apiConfig.baseUrl}/posts/${postId}/comments?${queryParam}`;
    const res = await fetch(fetchUrl, {
      method: "Get",
      headers: {
        ...apiConfig.headers,
      },
    });

    const data = await res.json();
    if (res.ok) {
      return data as Comment[];
    }

    throw new CustomError(res.status, data.message, data);
  },
  getLastComments: async () => {
    const fetchUrl = `${apiConfig.baseUrl}/comments/last`;
    const res = await fetch(fetchUrl, {
      method: "Get",
      headers: {
        ...apiConfig.headers,
      },
      next: {
        revalidate: 60 * 5,
      },
    });

    const data = await res.json();
    if (res.ok) {
      return data as Comment[];
    }

    throw new CustomError(res.status, data.message, data);
  },
};

export default commentService;
