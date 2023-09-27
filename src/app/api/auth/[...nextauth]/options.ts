import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/auth.service";
import { Auth, BackendToken } from "@/types/type";
import GoogleProvider from "next-auth/providers/google";
import CustomError from "@/CustomError";

let isRefresh: Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: any;
      error?: undefined;
    }
> | null = null;
let backendTokens: BackendToken | null = null;

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password)
          throw new CustomError(400, "Email or password invalid!");

        const res = await authService.loginWithCredential(
          credentials.email,
          credentials.password
        );
        const data = await res.json();

        if (res.ok) {
          return data;
        }
        console.log(data);
        throw new CustomError(res.status, data.message, data);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update" && session) {
        console.log("update");
        if (session.user) {
          token = {
            ...session.user,
            backendTokens: token.backendTokens,
            error: undefined,
          };
        }
        if (session.refreshProfile) {
          const profile = await authService.getProfile(
            token.backendTokens.access_token
          );
          console.log(profile);
          token = {
            ...profile,
            backendTokens: token.backendTokens,
            error: undefined,
          };
        }
      }

      if (account && account.provider === "google") {
        const id_token = account.id_token;
        const res = await authService.googleLogin(id_token || "");
        const data = await res.json();
        return {
          ...token,
          ...data,
        };
      }

      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      token.backendTokens = backendTokens ? backendTokens : token.backendTokens;
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      try {
        isRefresh ??= authService.refreshToken(
          token.backendTokens.refresh_token
        );

        const { data, error } = await isRefresh;

        if (data) {
          isRefresh = null;
          backendTokens = data;
          return {
            ...token,
            backendTokens: data,
          };
        }
        token.error = error;
        isRefresh = null;
        backendTokens = null;
        return token;
      } catch (error) {
        throw error;
      }
    },

    async session({ session, token }) {
      if (token) {
        const { backendTokens, error, ...user } = token;
        session.error = String(error) || undefined;
        session.user = user as Auth;
        session.backendTokens = backendTokens;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request",
  },
  debug: process.env.NODE_ENV === "development",
};
