import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  console.log(token);
  const { pathname } = request.nextUrl;

  // Define paths that require authentication
  const restrictedPaths = [
    "/feed",
    "/feed/:path*",
    "/channel",
    "/channel/private/:path*",
    "/upload",
    "/notifications",
    "/subscriptions",
    "/trending",
  ];
  const publicPaths = ["/register", "/"];

  // If no session cookie and accessing restricted paths, redirect to /register
  if (!token && restrictedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  // If session cookie exists and accessing public paths, redirect to /feed
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next(); // Allow the request to continue if no conditions are met
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/upload",
    "/channel",
    "/channel/private/:path*",
    "/notifications",
    "/subscriptions",
    "/trending",
    "/register",
    "/",
  ],
};
