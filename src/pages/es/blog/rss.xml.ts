import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '@/lib/content';
import { site } from '@/config/site';

export async function GET(context: APIContext) {
  const posts = await getPosts('es');
  return rss({
    title: `Blog del ${site.shortName}`,
    description: 'Noticias, opiniones y análisis sobre Derecho de Seguros.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postUrl(p),
      author: p.data.authors.join(', ') || undefined,
    })),
    customData: '<language>es-PY</language>',
  });
}
