import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/history(.*)',
  '/tasks(.*)',
  '/profile(.*)',
  '/api/process-log',
  '/api/settings'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // 1. Check for User ID manually
    const { userId } = await auth();

    // 2. If no user, manually redirect to sign-in
    if (!userId) {
      // Create the URL for the Clerk Sign In page
      // We assume your sign-in page is at /sign-in (Clerk's default)
      // If you are using Clerk's hosted page, we can redirect there too, 
      // but let's try the internal redirect first.
      const signInUrl = new URL('/sign-in', req.url);
      
      // Optional: Tell Clerk where to go back after login
      signInUrl.searchParams.set('redirect_url', req.url);
      
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};