/** Plantilla de cada evento: /es/eventos/<archivo>/ (un .mdx por evento en src/content/eventos/es/) */
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import YouTube from '@/components/YouTube';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import { formatDate } from '@/lib/format';
import { eventUrl, getEvents } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import { site } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

const allEvents = () => {
  const { upcoming, past } = getEvents('es');
  return [...upcoming, ...past];
};
const findEvent = async (params: Props['params']) => {
  const { slug } = await params;
  return allEvents().find((e) => e.slug === slug) ?? notFound();
};

export const dynamicParams = false;
export function generateStaticParams() {
  return allEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const event = await findEvent(params);
  return pageMeta({ title: event.data.title, description: event.data.description, path: eventUrl(event), image: event.data.cover?.src });
}

export default async function Evento({ params }: Props) {
  const event = await findEvent(params);
  const d = event.data;
  const sameMonth =
    d.endDate && d.endDate.getUTCMonth() === d.startDate.getUTCMonth() && d.endDate.getUTCFullYear() === d.startDate.getUTCFullYear();
  const when = !d.endDate
    ? formatDate(d.startDate)
    : sameMonth
      ? `${d.startDate.getUTCDate()} y ${formatDate(d.endDate)}`
      : `${formatDate(d.startDate)} – ${formatDate(d.endDate)}`;
  const groups = [...new Set(d.partners.map((p) => p.group))];
  const isPast = (d.endDate ?? d.startDate).valueOf() < Date.now();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: d.title,
          description: d.description,
          startDate: d.startDate.toISOString().slice(0, 10),
          endDate: (d.endDate ?? d.startDate).toISOString().slice(0, 10),
          eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: { '@type': 'Place', name: d.location, address: d.address ?? d.location },
          organizer: { '@id': `${site.url}/#organization` },
        }}
      />
      <PageHeader
        eyebrow={isPast ? 'Evento realizado' : 'Próximo evento'}
        title={d.title}
        breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: 'Eventos', href: '/es/eventos/' }, { label: d.title }]}
      />

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="prose-site [&_h2:first-child]:mt-0">
            <Markdown entry={event} />
          </div>
        </div>
        <aside className="lg:col-span-5">
          <dl className="space-y-5 rounded-card border border-linea bg-white p-6 shadow-card">
            <div>
              <dt className="label flex items-center gap-3 text-tinta-3">
                <Icon name="calendar" className="size-5 text-celeste-600" />
                Fecha
              </dt>
              <dd className="mt-1 pl-8 font-semibold">{when}</dd>
            </div>
            {d.location && (
              <div>
                <dt className="label flex items-center gap-3 text-tinta-3">
                  <Icon name="pin" className="size-5 text-celeste-600" />
                  Lugar
                </dt>
                <dd className="mt-1 pl-8 font-semibold">{d.location}</dd>
                {d.address && <dd className="pl-8 text-small text-tinta-2">{d.address}</dd>}
              </div>
            )}
            {d.modality && (
              <div>
                <dt className="label flex items-center gap-3 text-tinta-3">
                  <Icon name="screen" className="size-5 text-celeste-600" />
                  Modalidad
                </dt>
                <dd className="mt-1 pl-8 font-semibold">{d.modality}</dd>
              </div>
            )}
          </dl>
          {d.registrationUrl && !isPast && (
            <p className="mt-6">
              <Button href={d.registrationUrl} arrow>
                Inscribirme
              </Button>
            </p>
          )}
          {d.cover && (
            <Image
              src={d.cover.src}
              width={d.cover.width}
              height={d.cover.height}
              alt={d.coverAlt ?? ''}
              sizes="(min-width: 1024px) 460px, 100vw"
              className="mt-8 h-auto w-full rounded-card shadow-card"
            />
          )}
        </aside>
      </div>

      {d.videos.length > 0 && (
        <section className="border-y border-linea bg-white py-16 sm:py-20" aria-labelledby="videos">
          <div className="container-page">
            <SectionHeading id="videos" title="Videos" />
            <ul className="grid gap-10 md:grid-cols-2">
              {d.videos.map((v) => (
                <li key={v.youtubeId}>
                  <YouTube id={v.youtubeId} title={v.title} poster={v.poster} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {groups.length > 0 && (
        <section className="container-page py-16 sm:py-20" aria-labelledby="aliados">
          <SectionHeading id="aliados" eyebrow="Nuestros aliados" title="Organizan y apoyan" />
          <div className="space-y-12">
            {groups.map((g) => (
              <div key={g}>
                <h3 className="label mb-5 text-tinta-3">{g}</h3>
                <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
                  {d.partners
                    .filter((p) => p.group === g)
                    .map((p) => {
                      const logo = (
                        <Image
                          src={p.logo.src}
                          alt={p.name}
                          height={64}
                          width={Math.round((p.logo.width / p.logo.height) * 64)}
                          className="h-14 w-auto object-contain sm:h-16"
                        />
                      );
                      return (
                        <li key={p.name}>
                          {p.url ? (
                            <a href={p.url} rel="noopener" className="block">
                              {logo}
                            </a>
                          ) : (
                            logo
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
