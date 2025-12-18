import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Hide API routes or admin sections
    },
    sitemap: 'https://www.somafit.in/sitemap.xml', // 👈 Update domain
  };
}