import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",                  // Landing Page
  "/sign-in(.*)",       // Auth
  "/sign-up(.*)",       // Auth
  "/api/uploadthing(.*)", // Public APIs (add others if needed)
  "/manifest.json",     // 👈 PWA Critical
  "/sw.js",             // 👈 PWA Critical
  "/icons(.*)",         // 👈 PWA Assets
  "/sitemap.xml",       // 👈 CRITICAL FIX FOR GOOGLE
  "/robots.txt",         // 👈 CRITICAL FIX FOR GOOGLE
  "/guides(.*)",        // Public Guides
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.pathname;

  if (userId) {
    if (url === "/" || url.startsWith("/sign-in") || url.startsWith("/sign-up")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (!userId) {
    if (!isPublicRoute(req)) {
      const signInUrl = new URL('/', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};