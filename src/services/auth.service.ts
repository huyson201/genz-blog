import { apiConfig } from "./Api";

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
  register: (data: RegisterData) => {
    return fetch(`${apiConfig.baseUrl}/auth/register`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "post",
      body: JSON.stringify(data),
    });
  },
  refreshToken: (refresh_token: string) => {
    return fetch(`${apiConfig.baseUrl}/auth/refresh-token`, {
      headers: {
        ...apiConfig.headers,
      },
      method: "post",
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
};

export default authService;
