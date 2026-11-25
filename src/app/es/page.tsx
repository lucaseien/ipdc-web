/** Inicio: /es/ */
import Image from 'next/image';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PostCard from '@/components/PostCard';
import EventCard from '@/components/EventCard';
import Icon, { type IconName } from '@/components/Icon';
import JsonLd, { organization } from '@/components/JsonLd';
import RotatingTagline, { type Tagline } from '@/components/RotatingTagline';
import { categories, eventUrl, getEvents, getPage, getPosts, postUrl } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import { membershipHref, site, usefulLinks } from '@/config/site';
import cabildo from '@/assets/fotos/cabildo.jpg';
import edificio from '@/assets/fotos/edificio-historico.jpg';

export function generateMetadata() {
  const page = getPage('inicio');
  return pageMeta({ title: page.data.title, description: page.data.description, path: '/es/' });
}

// Qué ofrecemos: textos tomados de la página "Qué ofrecemos"
const highlights: { title: string; text: string; href: string; icon: IconName }[] = [
  {
    title: 'Capacitación',
    text: 'Cursos de formación en Derecho de Seguros, como el Diplomado que se dicta en coordinación con la Universidad Católica.',
    href: '/es/instituto/que-hacemos/#capacitacion',
    icon: 'graduation',
  },
  {
    title: 'Charlas',
    text: 'Charlas formativas sobre diferentes temas del Derecho de Seguros.',
    href: '/es/instituto/que-hacemos/#charlas',
    icon: 'mic',
  },
  {
    title: 'Dictámenes',
    text: 'Dictámenes con respecto a proyectos o modificaciones de disposiciones legales que hacen a esta rama del Derecho.',
    href: '/es/instituto/que-hacemos/#dictamenes',
    icon: 'scale',
  },
];

const facts = [
  { value: site.foundingDate, label: 'Año de fundación' },
  { value: 'Sin fines de lucro', label: 'Entidad científica' },
  { value: site.location.city, label: site.location.country },
];

// Frases del hero (rotativas). Todas se apoyan en textos institucionales existentes.
const taglines: Tagline[] = [
  { before: 'Investigación y estudio del', accent: 'Derecho de Seguros' },
  { before: 'Formación', accent: 'especializada', after: 'para la profesión' },
  { before: 'Opinión técnica sobre la', accent: 'legislación', after: 'del seguro' },
];

// Por qué el Instituto: rasgos tomados de "Quiénes somos" y "Qué ofrecemos"
const values = [
  { title: 'Entidad científica', text: 'Nuestro fin principal es promover la investigación y el estudio del Derecho de Seguros y materias afines.' },
  { title: 'Sin fines de lucro', text: 'Trabajamos para el estudio y la difusión de la disciplina, no para generar ganancias.' },
  { title: `Trayectoria desde ${site.foundingDate}`, text: 'Surgimos de los conversatorios de un grupo de abogados dedicados al derecho de seguros.' },
  { title: 'Vínculo académico', text: 'Coordinamos con la Universidad Católica el Diplomado en Derecho de Seguros.' },
  { title: 'Red internacional', text: 'Desde nuestra fundación nos acompañan los miembros de AIDA, Capítulo Paraguay.' },
  { title: 'Aporte a la legislación', text: 'Emitimos dictámenes sobre proyectos y modificaciones de las normas del sector.' },
];

/** Sello circular "Desde 2005", guiño al sello de aniversario de la referencia. */
function Sello({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="sello-circulo" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <text fill="currentColor" fontSize="11" letterSpacing="2.4" fontFamily="var(--font-sans)" fontWeight="600">
        <textPath href="#sello-circulo">DERECHO DE SEGUROS · ASUNCIÓN · PARAGUAY ·</textPath>
      </text>
      <text x="100" y="92" textAnchor="middle" fill="currentColor" fontSize="12" letterSpacing="3" fontFamily="var(--font-sans)" fontWeight="600">
        DESDE
      </text>
      <text x="100" y="124" textAnchor="middle" fill="currentColor" fontSize="34" fontFamily="var(--font-display)">
        {site.foundingDate}
      </text>
    </svg>
  );
}

export default function Inicio() {
  const page = getPage('inicio');
  const requisitos = getPage('requisitos-miembro');
  const posts = getPosts('es').slice(0, 3);
  const { upcoming, past } = getEvents('es');
  const featuredEvents = upcoming.length ? upcoming.slice(0, 2) : past.slice(0, 1);

  return (
    <>
      <JsonLd data={organization} />

      {/* ─── Portada (hero) a todo el ancho ─── */}
      <section className="on-dark relative isolate overflow-hidden bg-azul-950 text-white">
        <Image
          src={cabildo}
          alt="Fachada del Cabildo de Asunción al atardecer"
          fill
          sizes="100vw"
          preload
          className="-z-20 object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-azul-950 via-azul-950/85 to-azul-950/40 lg:bg-gradient-to-r lg:from-azul-950 lg:via-azul-950/80 lg:to-azul-950/20" />

        <div className="container-page grid min-h-[min(calc(100svh-5rem),54rem)] grid-rows-[1fr_auto] pt-20 pb-8 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="animate-aparecer lg:col-span-9">
              <h1 className="eyebrow mb-8">{page.data.title}</h1>
              <RotatingTagline items={taglines} />
              <p className="mt-8 max-w-xl text-lead text-azul-100">{page.data.lead}.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/es/instituto/" variant="inverse" arrow>
                  Conocer el Instituto
                </Button>
                <Button href="/es/instituto/que-hacemos/" variant="ghost">
                  Qué ofrecemos
                </Button>
              </div>
            </div>
            <div className="hidden justify-end lg:col-span-3 lg:flex">
              <Sello className="size-48 text-white/90 xl:size-56" />
            </div>
          </div>

          <a href="#presentacion" className="mx-auto mt-12 flex flex-col items-center gap-3 text-label font-semibold tracking-[0.22em] text-azul-200 uppercase no-underline hover:text-white">
            Scroll
            <span className="scroll-linea" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ─── Presentación ─── */}
      <section className="border-b border-linea bg-white" aria-labelledby="presentacion">
        <div className="container-page grid gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">El Instituto</p>
            <h2 id="presentacion" className="titulo-filete text-h1">
              ¿Quiénes <span className="acento text-azul-700">somos</span>?
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="prose-site text-lead [&_p:first-child]:font-display [&_p:first-child]:text-[1.5rem] [&_p:first-child]:leading-snug [&_p:first-child]:text-azul-950">
              <Markdown entry={page} />
            </div>
            <dl className="mt-12 grid grid-cols-1 divide-y divide-linea border-y border-linea sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse gap-1 py-5 sm:px-6 sm:first:pl-0">
                  <dt className="label text-tinta-3">{f.label}</dt>
                  <dd className="font-display text-[1.5rem] leading-tight text-azul-950">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10">
              <Button href="/es/instituto/" variant="secondary" arrow>
                Nuestra historia
              </Button>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Qué ofrecemos (como "áreas de práctica") ─── */}
      <section className="py-24 sm:py-32" aria-labelledby="ofrecemos">
        <div className="container-page">
          <SectionHeading id="ofrecemos" eyebrow="Actividades" title="Qué ofrecemos" />
          <ul className="grid border-t border-l border-linea md:grid-cols-3">
            {highlights.map((h, i) => (
              <li key={h.href} className="group relative flex flex-col border-r border-b border-linea bg-white p-8 transition-colors hover:bg-azul-950 sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[3rem] leading-none text-azul-200 transition-colors group-hover:text-celeste-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon name={h.icon} className="size-7 text-celeste-700 transition-colors group-hover:text-celeste-300" />
                </div>
                <h3 className="mt-12 text-h3 transition-colors group-hover:text-white">
                  <a href={h.href} className="text-inherit no-underline after:absolute after:inset-0 hover:text-inherit">
                    {h.title}
                  </a>
                </h3>
                <p className="mt-3 text-tinta-2 transition-colors group-hover:text-azul-100">{h.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-10 text-label font-semibold tracking-[0.14em] text-azul-700 uppercase transition-colors group-hover:text-white">
                  Ver más
                  <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Por qué el Instituto (bloques de valores) ─── */}
      <section className="on-dark relative isolate overflow-hidden bg-azul-950 py-24 text-white sm:py-32" aria-labelledby="por-que">
        <Image src={edificio} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-15" />
        <div className="container-page">
          <SectionHeading id="por-que" eyebrow="Por qué el IDSP" title={<>Una referencia en <span className="acento text-celeste-300">Derecho de Seguros</span></>} tone="dark" />
          <ul className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="bg-azul-950/90 p-8 sm:p-10">
                <span className="block h-0.5 w-10 bg-celeste-600" aria-hidden="true" />
                <h3 className="mt-6 text-h3 text-white">{v.title}</h3>
                <p className="mt-3 text-azul-100">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Ser miembro ─── */}
      <section className="py-24 sm:py-32" aria-labelledby="requisitos-home">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Ser miembro</p>
            <h2 id="requisitos-home" className="titulo-filete text-h2">
              Sumate al <span className="acento text-azul-700">Instituto</span>
            </h2>
            <p className="mt-8 max-w-md text-lead text-tinta-2">{requisitos.data.description}</p>
            <p className="mt-10">
              <Button href={membershipHref} arrow>
                Quiero ser miembro
              </Button>
            </p>
          </div>
          <div className="pasos-claro lg:col-span-7">
            <Markdown entry={requisitos} />
          </div>
        </div>
      </section>

      {/* ─── Blog (solo si hay entradas) ─── */}
      {posts.length > 0 && (
        <section className="container-page pb-24 sm:pb-32" aria-labelledby="blog-home">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="blog-home" eyebrow="Blog" title="Publicaciones" />
            <p className="mb-10 sm:mb-14">
              <Button href="/es/blog/" variant="secondary" arrow>
                Ver todas
              </Button>
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <section className="container-page pb-24 sm:pb-32" aria-labelledby="eventos-home">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="eventos-home" eyebrow="Eventos" title={upcoming.length ? 'Próximos eventos' : 'Eventos anteriores'} />
            <p className="mb-10 sm:mb-14">
              <Button href="/es/eventos/" variant="secondary" arrow>
                Ver eventos
              </Button>
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
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
        </section>
      )}

      {/* ─── Enlaces de interés ─── */}
      <section className="container-page border-t border-linea py-24 sm:py-32" aria-labelledby="enlaces">
        <SectionHeading id="enlaces" eyebrow="Recursos" title="Enlaces de interés" />
        <ul className="grid gap-4 sm:grid-cols-3">
          {usefulLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                rel="noopener"
                className="card card-hover group flex h-full flex-col justify-between gap-8 p-6 font-semibold tracking-[-0.01em] text-azul-950 no-underline hover:text-azul-950"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-azul-50 transition-colors group-hover:bg-azul-950">
                  <Icon name="external" className="size-4 text-azul-700 transition-colors group-hover:text-white" />
                </span>
                <span className="text-[1.0625rem] leading-snug">{l.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
