import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 👇 CHANGE: Removed trailing slashes to ensure strict blocking
      disallow: [
        "/dashboard", 
        "/settings", 
        "/history", 
        "/api", 
        "/tasks", 
        "/profile",
        "/feedback",
        '/sign-in',
        '/sign-up',
        '/deadlines',
      ],
    },
    sitemap: 'https://www.somafit.in/sitemap.xml',
  };
}