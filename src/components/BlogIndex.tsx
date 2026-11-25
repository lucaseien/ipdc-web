/** Listado paginado del blog (general o por categoría). Lo usan las 4 páginas de listado del blog. */
import PageHeader from './PageHeader';
import PostCard from './PostCard';
import Pagination from './Pagination';
import Callout from './Callout';
import { categories, getPage, getPosts, pageCount, pageSlice, postUrl, type Category } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';

const baseUrl = (category?: Category) => (category ? `/es/blog/categoria/${category}/` : '/es/blog/');

/** Título y descripción de una página del listado. */
export function blogIndexMeta(current: number, category?: Category) {
  const title = category ? `${categories[category]} — Blog` : getPage('blog').data.title;
  return pageMeta({
    title: current > 1 ? `${title} — Página ${current}` : title,
    description: category
      ? `Entradas de la categoría ${categories[category]} del Blog del Instituto de Derecho de Seguros del Paraguay.`
      : getPage('blog').data.description,
    path: current > 1 ? `${baseUrl(category)}pagina/${current}/` : baseUrl(category),
  });
}

/** Números de página a partir de la 2 (la 1 es la URL base). */
export function extraPages(category?: Category) {
  const total = pageCount(getPosts('es', category));
  return Array.from({ length: total - 1 }, (_, i) => String(i + 2));
}

export default function BlogIndex({ current, category }: { current: number; category?: Category }) {
  const all = getPosts('es', category);
  const total = pageCount(all);
  const posts = pageSlice(all, current);
  const intro = getPage('blog');
  const base = baseUrl(category);
  const tabs = [{ label: 'Todas', href: '/es/blog/', active: !category }].concat(
    (Object.keys(categories) as Category[]).map((c) => ({ label: categories[c], href: `/es/blog/categoria/${c}/`, active: c === category })),
  );

  return (
    <>
      <PageHeader
        eyebrow={category ? 'Blog' : undefined}
        title={category ? categories[category] : intro.data.title}
        breadcrumbs={[
          { label: 'Inicio', href: '/es/' },
          ...(category ? [{ label: 'Blog', href: '/es/blog/' }, { label: categories[category] }] : [{ label: 'Blog' }]),
        ]}
      >
        {!category && current === 1 && (
          <div className="mt-6 max-w-2xl text-tinta-2">
            <h2 className="sr-only">{intro.data.lead}</h2>
            <div className="text-lead [&_p]:text-pretty">
              <Markdown entry={intro} />
            </div>
          </div>
        )}
      </PageHeader>

      <div className="container-page py-12 sm:py-16">
        <nav aria-label="Categorías del blog" className="mb-12 overflow-x-auto">
          <ul className="flex gap-2">
            {tabs.map((t) => (
              <li key={t.href}>
                <a
                  href={t.href}
                  aria-current={t.active ? 'page' : undefined}
                  className="inline-flex min-h-11 items-center rounded-sm border border-linea bg-white px-4 text-small font-semibold whitespace-nowrap text-tinta no-underline hover:border-azul-700 aria-[current=page]:border-azul-950 aria-[current=page]:bg-azul-950 aria-[current=page]:text-white"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {posts.length === 0 ? (
          <p className="max-w-(--container-prose) rounded-card border border-dashed border-linea p-6 text-tinta-2">
            Todavía no hay entradas publicadas. Volvé pronto.
          </p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard
                  title={p.data.title}
                  href={postUrl(p)}
                  date={p.data.date}
                  authors={p.data.authors}
                  category={category ? undefined : categories[p.data.category]}
                  excerpt={p.data.description}
                  headingLevel="h2"
                />
              </li>
            ))}
          </ul>
        )}

        <Pagination current={current} total={total} base={base} />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Callout>
            <Markdown entry={getPage('blog-descargo')} />
          </Callout>
          <Callout tone="accent">
            <Markdown entry={getPage('blog-colaborar')} />
          </Callout>
        </div>
      </div>
    </>
  );
}
