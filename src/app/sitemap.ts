/** /sitemap.xml: todas las páginas públicas (sin la guía de estilo). */
import type { MetadataRoute } from 'next';
import { categories, eventUrl, getEvents, getPosts, postUrl } from '@/lib/content';
import { extraPages } from '@/components/BlogIndex';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const { upcoming, past } = getEvents('es');
  const cats = Object.keys(categories) as (keyof typeof categories)[];
  const paths = [
    '/es/',
    '/es/instituto/',
    '/es/instituto/que-hacemos/',
    '/es/instituto/autoridades/',
    '/es/instituto/miembros/',
    '/es/eventos/',
    '/es/contacto/',
    '/es/blog/',
    ...extraPages().map((n) => `/es/blog/pagina/${n}/`),
    ...cats.flatMap((c) => [`/es/blog/categoria/${c}/`, ...extraPages(c).map((n) => `/es/blog/categoria/${c}/pagina/${n}/`)]),
    ...getPosts('es').map(postUrl),
    ...[...upcoming, ...past].map(eventUrl),
  ];
  return paths.map((p) => ({ url: new URL(p, site.url).href }));
}
