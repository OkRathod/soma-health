import { MetadataRoute } from 'next';
import { guides } from '@/lib/guides'; // Import your guides data

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.somafit.in';

  // 1. Define your static pages
  const staticRoutes = [
    '',
    '/dashboard',
    '/tasks',
    '/history',
    '/guides',
    '/sign-in',
    '/sign-up',
    '/profile',
    '/settings',
    '/feedback',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // 2. Generate dynamic URLs for your guides
  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.date), // Uses the guide's date
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Combine them
  return [...staticRoutes, ...guideRoutes];
}