/** Quiénes somos: /es/instituto/ */
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import { getPage } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import foto from '@/assets/fotos/cabildo-reflejo.jpg';

export function generateMetadata() {
  const { data } = getPage('quienes-somos');
  return pageMeta({ title: data.title, description: data.description, path: '/es/instituto/' });
}

export default function QuienesSomos() {
  const page = getPage('quienes-somos');
  return (
    <>
      <PageHeader
        eyebrow="El Instituto"
        title={page.data.title}
        lead={page.data.lead}
        image={foto}
        imageAlt="El Cabildo de Asunción iluminado de noche, reflejado en un espejo de agua"
        breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: 'El Instituto' }, { label: page.data.title }]}
      />

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        {/* Índice lateral: enlaza a los <h2 id="…"> de quienes-somos.mdx */}
        <nav aria-label="En esta página" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-28 space-y-2 border-l-2 border-linea pl-4 text-small">
            <li>
              <a href="#el-instituto" className="text-tinta-2 no-underline hover:text-azul-700">
                El Instituto
              </a>
            </li>
            <li>
              <a href="#historia" className="text-tinta-2 no-underline hover:text-azul-700">
                Historia
              </a>
            </li>
          </ul>
        </nav>
        <div className="lg:col-span-9">
          <div className="prose-site [&_h2:first-child]:mt-0">
            <Markdown entry={page} />
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button href="/es/instituto/que-hacemos/" arrow>
              Qué ofrecemos
            </Button>
            <Button href="/es/instituto/autoridades/" variant="secondary">
              Consejo Directivo
            </Button>
            <Button href="/es/instituto/miembros/" variant="secondary">
              Ser miembro
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
