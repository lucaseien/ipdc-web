/**
 * Guía de estilo interna: /es/guia-de-estilo/ (noindex, excluida del sitemap).
 * Muestra el sistema de diseño con contenido real del IDSP.
 */
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import PersonCard from '@/components/PersonCard';
import PostCard from '@/components/PostCard';
import EventCard from '@/components/EventCard';
import Accordion from '@/components/Accordion';
import Callout from '@/components/Callout';
import Pagination from '@/components/Pagination';
import Newsletter from '@/components/Newsletter';
import Logo from '@/components/Logo';
import { pageMeta } from '@/lib/seo';
import panteon from '@/assets/fotos/panteon.jpg';

export const metadata = pageMeta({
  title: 'Guía de estilo',
  description: 'Sistema de diseño del sitio del IDSP.',
  path: '/es/guia-de-estilo/',
  noindex: true,
});

const colors = [
  { group: 'Azul institucional', items: [
    ['azul-950', '#001A38', 'Footer, fondos oscuros'],
    ['azul-900', '#00254D', 'Títulos'],
    ['azul-700', '#004890', 'Logo · enlaces · botones'],
    ['azul-600', '#1A5EAB', 'Foco de teclado'],
    ['azul-200', '#C5D8EE', 'Texto sobre azul oscuro'],
    ['azul-100', '#E4EEF8', 'Fondos suaves'],
    ['azul-50', '#F2F7FC', 'Notas, hover'],
  ] },
  { group: 'Celeste (acento)', items: [
    ['celeste-700', '#0A6D93', 'Rótulos pequeños'],
    ['celeste-600', '#1A9CC8', 'Logo · filetes · viñetas'],
    ['celeste-100', '#E2F3FA', 'Fondo de avisos'],
  ] },
  { group: 'Papel y tinta', items: [
    ['tinta', '#1C1E26', 'Texto principal'],
    ['tinta-2', '#4A4C55', 'Texto secundario'],
    ['tinta-3', '#62636B', 'Metadatos'],
    ['linea', '#E2DDD3', 'Bordes y divisores'],
    ['papel-2', '#F3EFE7', 'Cabeceras claras'],
    ['papel', '#FAF8F4', 'Fondo del sitio'],
  ] },
];

const contrast = [
  ['Texto principal (tinta) sobre papel', '15,7:1'],
  ['Texto secundario (tinta-2) sobre papel', '8,1:1'],
  ['Metadatos (tinta-3) sobre papel', '5,6:1'],
  ['Enlace (azul-700) sobre papel', '8,5:1'],
  ['Rótulo (celeste-700) sobre papel', '5,5:1'],
  ['Blanco sobre azul-700 (botón)', '8,9:1'],
  ['azul-200 sobre azul-950 (footer)', '12,0:1'],
];

export default function GuiaDeEstilo() {
  return (
    <>
      <PageHeader
        eyebrow="Sistema de diseño"
        title="Guía de estilo del IDSP"
        lead="Colores, tipografía y componentes del nuevo sitio. Esta página es interna: no se indexa ni aparece en el menú."
        breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: 'Guía de estilo' }]}
      />

      <div className="container-page space-y-24 py-16 sm:py-20">
        {/* Marca */}
        <section aria-labelledby="marca">
          <SectionHeading id="marca" eyebrow="01" title="Marca" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex min-h-40 items-center justify-center rounded-card border border-linea bg-white p-8"><Logo /></div>
            <div className="flex min-h-40 items-center justify-center rounded-card bg-azul-950 p-8"><Logo tone="dark" /></div>
          </div>
          <p className="mt-4 max-w-(--container-prose) text-small text-tinta-2">
            Sello circular a partir del JPG de 640 px, con el fondo exterior transparente (pendiente: logo vectorial original).
            El favicon usa solo el rombo con la balanza, que se lee mejor en tamaños chicos. Colores medidos del original: azul
            <code>#004890</code> y celeste <code>#1A9CC8</code>. El filete bicolor retoma ambos.
          </p>
        </section>

        {/* Color */}
        <section aria-labelledby="color">
          <SectionHeading id="color" eyebrow="02" title="Color" />
          <div className="space-y-10">
            {
              colors.map((g) => (
                <div key={g.group}>
                  <h3 className="mb-4 font-sans text-small font-semibold text-tinta-2">{g.group}</h3>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                    {g.items.map(([name, hex, use]) => (
                      <li key={name} className="overflow-hidden rounded-card border border-linea bg-white">
                        <span className="block h-16" style={{ background: hex }} />
                        <span className="block p-3 text-label">
                          <strong className="block text-small text-tinta">{name}</strong>
                          <code className="text-tinta-3">{hex}</code>
                          <span className="mt-1 block text-tinta-2">{use}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>
          <h3 className="mt-12 mb-4 font-sans text-small font-semibold text-tinta-2">Contraste (WCAG 2.1 AA exige 4,5:1)</h3>
          <table className="w-full max-w-2xl text-small">
            <tbody>
              {
                contrast.map(([pair, ratio]) => (
                  <tr key={pair} className="border-b border-linea">
                    <td className="py-2 pr-4">{pair}</td>
                    <td className="py-2 text-right font-semibold whitespace-nowrap text-azul-700">{ratio} ✓</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>

        {/* Tipografía */}
        <section aria-labelledby="tipografia">
          <SectionHeading id="tipografia" eyebrow="03" title="Tipografía" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="label mb-2 text-tinta-3">Títulos · Geist</p>
              <p className="font-display text-display font-medium text-azul-900">Derecho de Seguros</p>
              <p className="mt-3 text-small text-tinta-2">
                Serif editorial con ejes variables de peso y tamaño óptico: se afina sola en títulos grandes y gana robustez en
                tamaños chicos. Soporta todos los acentos del español y del guaraní (ã, ẽ, ĩ, õ, ũ, ỹ, g̃).
              </p>
            </div>
            <div>
              <p className="label mb-2 text-tinta-3">Texto · Geist</p>
              <p className="text-lead text-tinta">
                Sans-serif humanista diseñada para lectura en pantalla: letras abiertas y buena legibilidad en celulares.
              </p>
              <p className="mt-3 text-small text-tinta-2">
                Ambas son de código abierto y se sirven desde el propio sitio (sin Google Fonts), con solo los subconjuntos de caracteres necesarios.
              </p>
            </div>
          </div>

          <dl className="mt-12 divide-y divide-linea border-y border-linea">
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">Display · 38–64 px</dt>
              <dd className="font-display text-display font-medium text-azul-900">Derecho de Seguros</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">H1 · 34–52 px</dt>
              <dd className="font-display text-h1 font-medium text-azul-900">Qué ofrecemos</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">H2 · 26–36 px</dt>
              <dd className="font-display text-h2 font-medium text-azul-900">Consejo Directivo 2023-2025</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">H3 · 20–24 px</dt>
              <dd className="font-display text-h3 font-semibold text-azul-900">Requisitos para ser miembro</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">Lead · 19–22 px</dt>
              <dd className="text-lead text-tinta-2">Promovemos la investigación y el estudio del Derecho de Seguros y materias afines en Paraguay.</dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">Texto · 17–18 px / 1,7</dt>
              <dd className="max-w-(--container-prose)">
                El IDSP surge institucionalmente en el año 2005 como corolario de los conversatorios e intercambio de pareceres de un grupo de amigos abogados dedicados al derecho de seguros, y viendo la necesidad de fortalecer la especialidad como campo inexplotado
por los profesionales abogados. El lanzamiento tuvo lugar en el Aula Magna de la Facultad de Ciencias Jurídicas y Diplomáticas de la Universidad Católica con presencia de reconocidos referentes del sector asegurador.
              </dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="text-label text-tinta-3">Rótulo · 13 px</dt>
              <dd><span className="label">Capacitación</span></dd>
            </div>
          </dl>
        </section>

        {/* Lectura larga */}
        <section aria-labelledby="lectura">
          <SectionHeading id="lectura" eyebrow="04" title="Texto largo" />
          <p className="mb-8 max-w-2xl text-small text-tinta-2">
            Ancho máximo de 68 caracteres por línea (entre 60 y 75 es lo recomendado para lectura continua), interlineado 1,7 y títulos serif.
          </p>
          <div className="prose-site">
            <p>
                El IDSP surge institucionalmente en el año 2005 como corolario de los conversatorios e intercambio de pareceres de un
                grupo de amigos abogados dedicados al derecho de seguros, en acto solemne realizado en el Aula Magna de la Facultad de
              Ciencias Jurídicas y Diplomáticas de la Universidad Católica.
            </p>
            <h2>Requisitos</h2>
            <ol>
              <li>Título de abogado o título equivalente (Art. 7º).</li>
              <li>Ser propuesto por 2 miembros del Consejo Directivo.</li>
            </ol>
            <blockquote>
              <p>Somos una entidad científica, sin fines de lucro.</p>
            </blockquote>
            <p>Para más información, <a href="/es/contacto/">contactanos</a>.</p>
          </div>
        </section>

        {/* Botones */}
        <section aria-labelledby="botones">
          <SectionHeading id="botones" eyebrow="05" title="Botones y enlaces" />
          <div className="flex flex-wrap items-center gap-4">
            <Button href="#botones">Quiero ser miembro</Button>
            <Button href="#botones" variant="secondary">Consejo Directivo</Button>
            <Button href="#botones" variant="link" arrow>Conocer más</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card bg-azul-950 p-6 on-dark">
            <Button href="#botones" variant="inverse">Sobre fondo oscuro</Button>
          </div>
          <p className="mt-4 text-small text-tinta-2">Área táctil mínima de 44–48 px. Probá con la tecla Tab: el foco siempre es visible.</p>
        </section>

        {/* Personas */}
        <section aria-labelledby="personas">
          <SectionHeading id="personas" eyebrow="06" title="Consejo Directivo" />
          <p className="mb-6 max-w-2xl text-small text-tinta-2">
            La foto es opcional. Sin foto se muestran las iniciales (sin contar títulos como Dr. o Abg.).
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            <PersonCard name="Dr. Mario Módica Lucente" role="Presidente" />
            <PersonCard name="Abg. Miguel Angel Berni" role="Vicepresidente" />
            <PersonCard name="Abg. Zunilda Benavente" role="Miembro titular" />
            <PersonCard name="Abg. Juan Francisco Perez Saldivar" role="Comisión Revisora de Cuentas" />
          </div>
        </section>

        {/* Blog y eventos */}
        <section aria-labelledby="tarjetas">
          <SectionHeading id="tarjetas" eyebrow="07" title="Blog y eventos" />
          <p className="mb-6 max-w-2xl text-small text-tinta-2">Contenido de ejemplo: el blog y los eventos del IDSP todavía no tienen entradas.</p>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <PostCard
              title="Título de una entrada de opinión"
              href="#tarjetas"
              date={new Date('2026-11-01')}
              authors={['Nombre del autor']}
              category="Opinión"
              excerpt="Resumen breve de la entrada, de unos 150 caracteres, que se muestra en las tarjetas y en los buscadores."
            />
            <PostCard
              title="Charla formativa sobre Derecho de Seguros"
              href="#tarjetas"
              date={new Date('2026-10-15')}
              category="Noticias y eventos"
              excerpt="Ejemplo de noticia sin autor."
            />
          </div>
          <div className="mt-12 max-w-2xl">
            <EventCard
              title="Diplomado en Derecho de Seguros"
              href="#tarjetas"
              startDate={new Date('2027-03-01')}
              location="Asunción"
              modality="Presencial"
            />
          </div>
        </section>

        {/* Acordeón y avisos */}
        <section aria-labelledby="acordeon">
          <SectionHeading id="acordeon" eyebrow="08" title="Acordeón y avisos" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="border-t border-linea">
              <Accordion title="Capacitación" open>
                <p>Cursos (Diplomado) de formación en Derecho de Seguros.</p>
              </Accordion>
              <Accordion title="Charlas">
                <p>Charlas formativas sobre diferentes temas del Derecho de Seguros.</p>
              </Accordion>
              <Accordion title="Dictámenes">
                <p>Dictámenes con respecto a proyectos o modificaciones de disposiciones legales que hacen a esta rama del Derecho.</p>
              </Accordion>
            </div>
            <Callout className="self-start">
              <p>
                <strong>
                  Las opiniones y puntos de vista expresados en este blog son exclusivamente responsabilidad de los autores y no
                  representan de ninguna manera la posición oficial del Instituto de Derecho de Seguros del Paraguay, ni la de su
                  Consejo Directivo.
                </strong>
              </p>
            </Callout>
          </div>
        </section>

        {/* Navegación */}
        <section aria-labelledby="navegacion">
          <SectionHeading id="navegacion" eyebrow="09" title="Paginación y newsletter" />
          <Pagination current={2} total={3} base="#" />
          <div className="mt-14 max-w-2xl rounded-card border border-linea bg-white p-6 sm:p-8">
            <Newsletter id="demo-newsletter" />
          </div>
        </section>
      </div>

      {/* Cabecera con foto */}
      <section aria-label="Cabecera con fotografía">
        <PageHeader
          eyebrow="El Instituto"
          title="Qué ofrecemos"
          lead="Somos una entidad científica, sin fines de lucro, con el fin principal de promover la investigación y el estudio del Derecho de Seguros y materias afines."
          image={panteon}
          imageAlt="Cúpula del Panteón Nacional de los Héroes, en Asunción, al anochecer"
        />
      </section>
    </>
  );
}
