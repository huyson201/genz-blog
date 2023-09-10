import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: Auth;
    backendTokens: BackendToken;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Auth {
    backendTokens: BackendToken;
  }
}
