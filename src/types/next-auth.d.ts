import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import { Auth, BackendToken } from "./type";

declare module "next-auth" {
  interface Session {
    user: Auth;
    backendTokens: BackendToken;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Auth {
    backendTokens: BackendToken;
  }
}
