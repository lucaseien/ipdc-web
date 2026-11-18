/** Eventos: /es/eventos/ (cada evento es un .mdx en src/content/eventos/es/) */
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import EventCard from '@/components/EventCard';
import PostCard from '@/components/PostCard';
import Button from '@/components/Button';
import { eventUrl, getEvents, getPage, getPosts, postUrl } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export function generateMetadata() {
  const { data } = getPage('eventos');
  return pageMeta({ title: data.title, description: data.description, path: '/es/eventos/' });
}

export default function Eventos() {
  const page = getPage('eventos');
  const { upcoming, past } = getEvents('es');
  const news = getPosts('es', 'noticias-y-eventos').slice(0, 3);

  return (
    <>
      <PageHeader title={page.data.title} breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: page.data.title }]} />

      <div className="container-page space-y-20 py-16 sm:py-20">
        <section aria-labelledby="proximos">
          <SectionHeading id="proximos" title="Próximos eventos" />
          {upcoming.length ? (
            <ul className="grid max-w-4xl gap-6">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <EventCard
                    title={e.data.title}
                    href={eventUrl(e)}
                    startDate={e.data.startDate}
                    endDate={e.data.endDate}
                    location={e.data.location}
                    modality={e.data.modality}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-(--container-prose) rounded-card border border-dashed border-linea p-6 text-tinta-2">
              No hay eventos programados por el momento. Las próximas actividades se anuncian en el{' '}
              <a href="/es/blog/categoria/noticias-y-eventos/">blog</a> y en las redes sociales del IDSP.
            </p>
          )}
        </section>

        {past.length > 0 && (
          <section aria-labelledby="anteriores">
            <SectionHeading id="anteriores" title="Eventos anteriores" />
            <ul className="grid max-w-4xl gap-6">
              {past.map((e) => (
                <li key={e.id}>
                  <EventCard
                    title={e.data.title}
                    href={eventUrl(e)}
                    startDate={e.data.startDate}
                    endDate={e.data.endDate}
                    location={e.data.location}
                    modality={e.data.modality}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {news.length > 0 && (
          <section aria-labelledby="noticias">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading id="noticias" eyebrow="Blog" title="Noticias y eventos" />
              <p className="mb-8 sm:mb-10">
                <Button href="/es/blog/categoria/noticias-y-eventos/" variant="link" arrow>
                  Ver todas
                </Button>
              </p>
            </div>
            <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {news.map((p) => (
                <li key={p.id}>
                  <PostCard title={p.data.title} href={postUrl(p)} date={p.data.date} authors={p.data.authors} excerpt={p.data.description} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
