/** Inicio: /es/ */
import Image from 'next/image';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PostCard from '@/components/PostCard';
import EventCard from '@/components/EventCard';
import Icon from '@/components/Icon';
import JsonLd, { organization } from '@/components/JsonLd';
import { categories, eventUrl, getEvents, getPage, getPosts, postUrl } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import { membershipHref, usefulLinks } from '@/config/site';
import cabildo from '@/assets/fotos/cabildo.jpg';

export function generateMetadata() {
  const page = getPage('inicio');
  return pageMeta({ title: page.data.title, description: page.data.description, path: '/es/' });
}

// Qué ofrecemos: textos tomados de la página "Qué ofrecemos"
const highlights = [
  {
    title: 'Capacitación',
    text: 'Cursos de formación en Derecho de Seguros, como el Diplomado que se dicta en coordinación con la Universidad Católica.',
    href: '/es/instituto/que-hacemos/#capacitacion',
  },
  {
    title: 'Charlas',
    text: 'Charlas formativas sobre diferentes temas del Derecho de Seguros.',
    href: '/es/instituto/que-hacemos/#charlas',
  },
  {
    title: 'Dictámenes',
    text: 'Dictámenes con respecto a proyectos o modificaciones de disposiciones legales que hacen a esta rama del Derecho.',
    href: '/es/instituto/que-hacemos/#dictamenes',
  },
];

export default function Inicio() {
  const page = getPage('inicio');
  const requisitos = getPage('requisitos-miembro');
  const posts = getPosts('es').slice(0, 3);
  const { upcoming, past } = getEvents('es');
  const featuredEvents = upcoming.length ? upcoming.slice(0, 2) : past.slice(0, 1);

  return (
    <>
      <JsonLd data={organization} />

      {/* ─── Portada (hero) ─── */}
      <section className="on-dark relative isolate overflow-hidden bg-azul-950 text-white">
        <Image
          src={cabildo}
          alt="Fachada del Cabildo de Asunción al atardecer"
          fill
          sizes="100vw"
          preload
          className="-z-10 object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-azul-950 via-azul-950/80 to-azul-950/25 lg:bg-gradient-to-r lg:from-azul-950/95 lg:via-azul-950/70 lg:to-transparent" />
        <div className="container-page flex min-h-[34rem] flex-col justify-end pt-28 pb-14 sm:min-h-[38rem] lg:min-h-[42rem] lg:justify-center lg:pb-24">
          <div className="max-w-3xl">
            <h1 className="text-display font-medium text-white">{page.data.title}</h1>
            <span className="filete mt-7" aria-hidden="true" />
            <p className="mt-7 max-w-2xl text-lead text-azul-100">{page.data.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/es/instituto/" variant="inverse" arrow>
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Presentación ─── */}
      <section className="container-page grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16" aria-labelledby="presentacion">
        <div className="lg:col-span-5">
          <p className="label mb-3">El Instituto</p>
          <h2 id="presentacion" className="text-h2 font-medium">
            ¿Quiénes somos?
          </h2>
          <span className="filete mt-5" aria-hidden="true" />
        </div>
        <div className="lg:col-span-7">
          <div className="prose-site">
            <Markdown entry={page} />
          </div>
          <p className="mt-8">
            <Button href="/es/instituto/" variant="link" arrow>
              Conocer más
            </Button>
          </p>
        </div>
      </section>

      {/* ─── Accesos (Capacitación, Charlas, Dictámenes) ─── */}
      <section className="border-y border-linea bg-papel-2" aria-labelledby="ofrecemos">
        <h2 id="ofrecemos" className="sr-only">
          Qué ofrecemos
        </h2>
        <ul className="container-page grid gap-px py-0 sm:grid-cols-3">
          {highlights.map((h) => (
            <li key={h.href} className="group relative py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0 sm:[&+&]:border-l sm:[&+&]:border-linea">
              <h3 className="font-serif text-h3 font-semibold text-azul-900">
                <a href={h.href} className="no-underline after:absolute after:inset-0 group-hover:underline">
                  {h.title}
                </a>
              </h3>
              <p className="mt-3 text-tinta-2">{h.text}</p>
              <Icon name="arrow-right" className="mt-5 size-5 text-celeste-600 transition-transform group-hover:translate-x-1" />
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Ser miembro ─── */}
      <section className="container-page grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16" aria-labelledby="requisitos-home">
        <div className="lg:col-span-5">
          <p className="label mb-3">Ser miembro</p>
          <h2 id="requisitos-home" className="text-h2 font-medium">
            {requisitos.data.title}
          </h2>
          <span className="filete mt-5" aria-hidden="true" />
        </div>
        <div className="lg:col-span-7">
          <div className="prose-site">
            <Markdown entry={requisitos} />
          </div>
          <p className="mt-8">
            <Button href={membershipHref} arrow>
              Quiero ser miembro
            </Button>
          </p>
        </div>
      </section>

      {/* ─── Blog (solo si hay entradas) ─── */}
      {posts.length > 0 && (
        <section className="container-page py-20 sm:py-24" aria-labelledby="blog-home">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="blog-home" eyebrow="Blog" title="Últimas entradas" />
            <p className="mb-8 sm:mb-10">
              <Button href="/es/blog/" variant="link" arrow>
                Ver todas las entradas
              </Button>
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {posts.map((p) => (
              <PostCard
                key={p.id}
                title={p.data.title}
                href={postUrl(p)}
                date={p.data.date}
                authors={p.data.authors}
                category={categories[p.data.category]}
                excerpt={p.data.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* ─── Eventos (solo si hay) ─── */}
      {featuredEvents.length > 0 && (
        <section className="border-t border-linea bg-white py-20 sm:py-24" aria-labelledby="eventos-home">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading id="eventos-home" eyebrow="Eventos" title={upcoming.length ? 'Próximos eventos' : 'Eventos anteriores'} />
              <p className="mb-8 sm:mb-10">
                <Button href="/es/eventos/" variant="link" arrow>
                  Ver eventos
                </Button>
              </p>
            </div>
            <div className="grid max-w-4xl gap-6">
              {featuredEvents.map((e) => (
                <EventCard
                  key={e.id}
                  title={e.data.title}
                  href={eventUrl(e)}
                  startDate={e.data.startDate}
                  endDate={e.data.endDate}
                  location={e.data.location}
                  modality={e.data.modality}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Enlaces de interés ─── */}
      <section className="border-t border-linea bg-white py-16 sm:py-20" aria-labelledby="enlaces">
        <div className="container-page">
          <SectionHeading id="enlaces" title="Enlaces de interés" />
          <ul className="grid gap-4 sm:grid-cols-3">
            {usefulLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  rel="noopener"
                  className="group flex h-full items-center justify-between gap-4 rounded-card border border-linea bg-papel p-5 font-semibold text-azul-900 no-underline hover:border-azul-700"
                >
                  <span className="group-hover:underline">{l.name}</span>
                  <Icon name="external" className="size-5 text-celeste-700" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
