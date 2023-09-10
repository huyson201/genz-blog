import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "./types/type";

export default withAuth(function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  if (
    req.nextUrl.pathname.startsWith("/publish/post") &&
    token?.role !== Role.Admin
  ) {
    return NextResponse.rewrite(new URL("/denied", req.url));
  }
});
export const config = { matcher: ["/publish/post", "/me"] };
