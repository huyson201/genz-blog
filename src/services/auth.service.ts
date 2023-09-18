import { Post, RegisterData } from "@/types/type";
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
  refreshToken: (refresh_token: string) => {
    return fetch(`${apiConfig.baseUrl}/auth/refresh-token`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "POST",
      body: JSON.stringify({ refresh_token }),
    });
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
};

export default authService;
