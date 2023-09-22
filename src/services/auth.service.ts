import { Auth, ChangePasswordData, UpdateProfileData } from "./../types/type";
import { queryStringify } from "./../utils/queryStringify";
import {
  ImageType,
  PaginateResponse,
  Post,
  RegisterData,
  SaveOptions,
} from "@/types/type";
import { apiConfig } from "./Api";
import CustomError from "@/CustomError";

const authService = {
  loginWithCredential: async (email: string, password: string) => {
    return fetch(`${apiConfig.baseUrl}/auth/login`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "post",
      body: JSON.stringify({ email, password }),
    });
  },
  register: (url: string, { arg }: { arg: RegisterData }) => {
    console.log(arg);
    return fetch(`${apiConfig.baseUrl}/auth/register`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "POST",
      body: JSON.stringify(arg),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) return data;
      throw new CustomError(
        res.status || 500,
        data.message || "Server internal error!",
        data
      );
    });
  },
  refreshToken: async (refresh_token: string) => {
    try {
      const res = await fetch(`${apiConfig.baseUrl}/auth/refresh-token`, {
        headers: {
          ...apiConfig.headers,
        },
        method: "POST",
        body: JSON.stringify({ refresh_token }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: "RefreshAccessTokenError" };
      }
      return { data };
    } catch (error) {
      throw error;
    }
  },
  logout: (token: string) => {
    return fetch(apiConfig.baseUrl + "/auth/logout", {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "Post",
    });
  },
  getPostById: async (id: string, token: string): Promise<Post> => {
    const res = await fetch(`${apiConfig.baseUrl}/auth/posts/${id}`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "Get",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  googleLogin: async (idToken: string) => {
    return fetch(`${apiConfig.baseUrl}/auth/login/google`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "post",
      body: JSON.stringify({ idToken }),
    });
  },
  uploadImage: async (img: File, token: string): Promise<ImageType> => {
    const form = new FormData();
    form.set("image", img);
    const res = await fetch(`${apiConfig.baseUrl}/file`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "Post",
      body: form,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  gallery: async (token: string): Promise<ImageType[]> => {
    const res = await fetch(`${apiConfig.baseUrl}/auth/gallery`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "Get",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  deleteImage: async (publicId: string, token: string) => {
    const res = await fetch(`${apiConfig.baseUrl}/file`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "Delete",
      body: JSON.stringify({ publicId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  getPosts: async (
    token: string,
    {
      display,
      page = 1,
      limit = 10,
      q,
    }: { display: SaveOptions; page?: number; limit?: number; q?: string }
  ): Promise<PaginateResponse<Post>> => {
    const query = queryStringify({ display, page, limit, q });
    const res = await fetch(`${apiConfig.baseUrl}/auth/posts?${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "Get",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  deletePost: async (token: string, postId: string) => {
    const res = await fetch(`${apiConfig.baseUrl}/posts/${postId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "Delete",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  changePassword: async (token: string, dataChange: ChangePasswordData) => {
    const res = await fetch(`${apiConfig.baseUrl}/auth/change-password`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(dataChange),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  updateProfile: async (
    token: string,
    dataChange: UpdateProfileData
  ): Promise<Auth> => {
    const res = await fetch(`${apiConfig.baseUrl}/auth/profile`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(dataChange),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
  getProfile: async (token: string): Promise<Auth> => {
    const res = await fetch(`${apiConfig.baseUrl}/auth/profile`, {
      headers: {
        ...apiConfig.headers,
        authorization: `Bearer ${token}`,
      },
      method: "Get",
      next: { revalidate: 0 },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new CustomError(res.status, data.message, data);
    }
    return data;
  },
};

export default authService;
