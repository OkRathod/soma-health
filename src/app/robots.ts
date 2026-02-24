import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 👇 CHANGE: Removed trailing slashes to ensure strict blocking
      disallow: [
        '/actions',
        '/analysis',
        "/api", 
        "/dashboard", 
        '/deadlines',
        "/feedback",
        "/history", 
        '/notes',
        "/profile",
        "/settings", 
        '/sign-in',
        '/sign-up',
        "/tasks", 
      ],
    },
    sitemap: 'https://www.somafit.in/sitemap.xml',
  };
}