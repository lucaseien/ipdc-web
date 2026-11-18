/** /robots.txt */
import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/es/guia-de-estilo/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
