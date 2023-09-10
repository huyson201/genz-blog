import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/services/auth.service";
import {} from "next-auth/jwt";

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

      return token;
    },
    async session({ session, token }) {
      console.log(token);
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
