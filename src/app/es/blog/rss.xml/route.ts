/** Feed RSS del blog: /es/blog/rss.xml */
import { getPosts, postUrl } from '@/lib/content';
import { site } from '@/config/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = getPosts('es')
    .map((p) => {
      const link = new URL(postUrl(p), site.url).href;
      const author = p.data.authors.join(', ');
      return `<item><title>${esc(p.data.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><description>${esc(p.data.description)}</description><pubDate>${p.data.date.toUTCString()}</pubDate>${author ? `<author>${esc(author)}</author>` : ''}</item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog del ${site.shortName}</title><description>Noticias, opiniones y análisis sobre Derecho de Seguros.</description><link>${site.url}/</link><language>es-PY</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
