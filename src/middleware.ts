// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher([
//   '/dashboard(.*)',
//   '/settings(.*)',
//   '/history(.*)',
//   '/tasks(.*)',
//   '/profile(.*)',
//   '/api/process-log',
//   '/api/settings'
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) {
//     // 1. Check for User ID manually
//     const { userId } = await auth();

//     // 2. If no user, manually redirect to sign-in
//     if (!userId) {
//       // Create the URL for the Clerk Sign In page
//       // We assume your sign-in page is at /sign-in (Clerk's default)
//       // If you are using Clerk's hosted page, we can redirect there too, 
//       // but let's try the internal redirect first.
//       const signInUrl = new URL('/sign-in', req.url);
      
//       // Optional: Tell Clerk where to go back after login
//       signInUrl.searchParams.set('redirect_url', req.url);
      
//       return NextResponse.redirect(signInUrl);
//     }
//   }
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define Public Routes (The "Safe List")
// These are the ONLY pages a guest can see.
const isPublicRoute = createRouteMatcher([
  "/",                  // Landing Page
  "/sign-in(.*)",       // Auth
  "/sign-up(.*)",       // Auth
  "/api/uploadthing(.*)", // Public APIs (add others if needed)
  "/manifest.json",     // 👈 PWA Critical
  "/sw.js",             // 👈 PWA Critical
  "/icons(.*)"          // 👈 PWA Assets
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = req.nextUrl.pathname;

  // 2. SCENARIO: User IS Logged In
  if (userId) {
    // If they try to go to the Landing Page or Sign In page,
    // bounce them straight to the Dashboard. This gives the "App" feel.
    if (url === "/" || url.startsWith("/sign-in") || url.startsWith("/sign-up")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // 3. SCENARIO: User is NOT Logged In
  if (!userId) {
    // If they try to access a route that is NOT in our Public List...
    if (!isPublicRoute(req)) {
      // Redirect them to Sign In (NOT home, to prevent loops)
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Default: Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};