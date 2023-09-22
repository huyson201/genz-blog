import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/auth.service";
import { Auth } from "@/types/type";
import GoogleProvider from "next-auth/providers/google";
import CustomError from "@/CustomError";

let isRefreshToken: Promise<Response> | null = null;
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
      if (trigger === "update") {
        return {
          backendTokens: session.backendTokens,
          ...session.user,
        };
      }

      if (user && account && account.provider === "google") {
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
      console.log(new Date().getTime());
      console.log(token.backendTokens.expiresIn);

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      console.log("____refresh_____");

      try {
        const { error, data } = await authService.refreshToken(
          token.backendTokens.refresh_token
        );

        console.log(data);
        console.log(error);

        if (data) {
          token.backendTokens = data;
          return token;
        }

        token.error = error;
        return token;
      } catch (error) {
        throw error;
      }
    },
    async session({ session, token }) {
      const { backendTokens, error, ...user } = token;
      if (error) {
        session.error = String(error) || undefined;
        return session;
      }
      session.user = user as Auth;
      session.backendTokens = backendTokens;
      session.error = undefined;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};
