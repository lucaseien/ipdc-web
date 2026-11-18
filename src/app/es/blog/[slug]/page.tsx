/** Plantilla de cada entrada: /es/blog/<archivo>/ (un .md por entrada en src/content/blog/es/) */
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Callout from '@/components/Callout';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import { formatDate } from '@/lib/format';
import { categories, getPage, getPosts, postUrl } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import { site } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

const findPost = async (params: Props['params']) => {
  const { slug } = await params;
  const posts = getPosts('es');
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  return { post: posts[i], newer: posts[i - 1], older: posts[i + 1] };
};

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts('es').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { post } = await findPost(params);
  const d = post.data;
  return pageMeta({ title: d.title, description: d.description, path: postUrl(post), image: d.cover?.src, publishedTime: d.date });
}

export default async function Entrada({ params }: Props) {
  const { post, newer, older } = await findPost(params);
  const d = post.data;
  const minutes = Math.max(1, Math.round(post.body.split(/\s+/).length / 220));
  const isoDate = d.date.toISOString().slice(0, 10);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: d.title,
          description: d.description,
          datePublished: isoDate,
          inLanguage: 'es',
          author: d.authors.length ? d.authors.map((name) => ({ '@type': 'Person', name })) : { '@id': `${site.url}/#organization` },
          publisher: { '@id': `${site.url}/#organization` },
          mainEntityOfPage: new URL(postUrl(post), site.url).href,
        }}
      />

      <article>
        <header className="border-b border-linea bg-papel-2">
          <div className="container-page pt-8 pb-10 sm:pt-12 sm:pb-14">
            <Breadcrumbs items={[{ label: 'Inicio', href: '/es/' }, { label: 'Blog', href: '/es/blog/' }, { label: d.title }]} />
            <div className="mx-auto mt-10 max-w-(--container-prose)">
              <p className="label">
                <a href={`/es/blog/categoria/${d.category}/`} className="text-celeste-700 no-underline hover:underline">
                  {categories[d.category]}
                </a>
              </p>
              <h1 className="mt-3 text-h1 font-medium">{d.title}</h1>
              <span className="filete mt-6" aria-hidden="true" />
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-small text-tinta-2">
                {d.authorPhoto && (
                  <Image
                    src={d.authorPhoto.src}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-full bg-white object-cover object-top ring-2 ring-white"
                  />
                )}
                <div>
                  {d.authors.length > 0 && (
                    <p>
                      Por <span className="font-semibold text-tinta">{d.authors.join(' y ')}</span>
                    </p>
                  )}
                  <p>
                    <time dateTime={isoDate}>{formatDate(d.date)}</time>
                    <span aria-hidden="true"> · </span>
                    {minutes} min de lectura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page py-12 sm:py-16">
          <div className="prose-site mx-auto [&_.footnotes]:mt-14 [&_.footnotes]:border-t [&_.footnotes]:border-linea [&_.footnotes]:pt-6 [&_.footnotes]:text-small">
            <Markdown entry={post} />
          </div>
          <div className="mx-auto mt-14 max-w-(--container-prose)">
            <Callout>
              <Markdown entry={getPage('blog-descargo')} />
            </Callout>
          </div>
        </div>
      </article>

      <nav aria-label="Más entradas" className="container-page pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-(--container-prose) gap-4 border-t border-linea pt-8 sm:grid-cols-2">
          {older ? (
            <a href={postUrl(older)} className="group rounded-card p-3 no-underline hover:bg-white">
              <span className="flex items-center gap-2 text-small text-tinta-3">
                <Icon name="arrow-left" className="size-4" /> Anterior
              </span>
              <span className="mt-1 block font-serif text-[1.125rem] leading-snug font-semibold text-azul-900 group-hover:underline">
                {older.data.title}
              </span>
            </a>
          ) : (
            <span />
          )}
          {newer && (
            <a href={postUrl(newer)} className="group rounded-card p-3 text-right no-underline hover:bg-white">
              <span className="flex items-center justify-end gap-2 text-small text-tinta-3">
                Siguiente <Icon name="arrow-right" className="size-4" />
              </span>
              <span className="mt-1 block font-serif text-[1.125rem] leading-snug font-semibold text-azul-900 group-hover:underline">
                {newer.data.title}
              </span>
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
