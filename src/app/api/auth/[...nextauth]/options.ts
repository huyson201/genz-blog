import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/auth.service";
import {} from "next-auth/jwt";
import { Auth } from "@/types/type";

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
          throw new Error("Email or password invalid!");

        const res = await authService.loginWithCredential(
          credentials.email,
          credentials.password
        );
        const data = await res.json();

        if (res.ok) {
          return data;
        }

        throw new Error(data.message);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      console.log("_------fetch");
      const res = await authService.refreshToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY3MDlmMjU3YmUwOTdmZGZmNWRmMDkiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInRva2VuSWQiOiIzYjNkODljNC02NzljLTRjZGUtYTAxMi01MmMwOWNiNWE1YzciLCJyb2xlIjowLCJpYXQiOjE2OTQzNDkwOTMsImV4cCI6MTcwMjk4OTA5M30.tpupVUXQhOuqfTmGEv0jCl3tTg3e2wEF5vZi7zYK81g"
      );
      const data = await res.json();
      console.log(data);
      return {
        ...token,
        backendTokens: data,
      };
    },
    async session({ session, token }) {
      const { backendTokens, ...user } = token;
      session.user = user as Auth;
      session.backendTokens = backendTokens;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};
