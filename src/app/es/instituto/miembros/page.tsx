/** Ser miembro: /es/instituto/miembros/ */
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import { getPage } from '@/lib/content';
import { Markdown } from '@/lib/mdx';
import { pageMeta } from '@/lib/seo';
import { membershipHref } from '@/config/site';
import foto from '@/assets/fotos/catedral.jpg';

export function generateMetadata() {
  const { data } = getPage('miembros');
  return pageMeta({ title: data.title, description: data.description, path: '/es/instituto/miembros/' });
}

export default function Miembros() {
  const page = getPage('miembros');
  const requisitos = getPage('requisitos-miembro');
  return (
    <>
      <PageHeader
        eyebrow="El Instituto"
        title={page.data.title}
        lead={page.data.lead}
        image={foto}
        imageAlt="Catedral Metropolitana de Asunción reflejada en un charco tras la lluvia"
        breadcrumbs={[{ label: 'Inicio', href: '/es/' }, { label: 'El Instituto', href: '/es/instituto/' }, { label: page.data.title }]}
      />

      <div className="container-page py-16 sm:py-20">
        <div className="prose-site mb-14">
          <Markdown entry={page} />
        </div>

        <section id="requisitos" aria-labelledby="requisitos-titulo" className="scroll-mt-28 rounded-card border border-linea bg-white p-6 sm:p-10 lg:p-12">
          <SectionHeading id="requisitos-titulo" eyebrow="Cómo ser miembro" title={requisitos.data.title} />
          <div className="prose-site">
            <Markdown entry={requisitos} />
          </div>
          <p className="mt-10">
            <Button href={membershipHref} arrow>
              Quiero ser miembro
            </Button>
          </p>
        </section>
      </div>
    </>
  );
}
